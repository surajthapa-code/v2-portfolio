import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface LogoItem {
  src: string;
  alt?: string;
  /** Width of this specific logo in pixels (e.g., 40) */
  width: number;
  /** Height of this specific logo in pixels (e.g., 40) */
  height: number;
}

interface FallingLogosProps {
  logos: LogoItem[];
  trigger?: "auto" | "scroll" | "click" | "hover";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
}

const FallingLogos: React.FC<FallingLogosProps> = ({
  logos = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementsContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  // Trigger Logic
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // MatterJS Engine & Physics Logic
  useEffect(() => {
    if (!effectStarted || logos.length === 0) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current || !elementsContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    // Invisible boundaries
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const logoElements = elementsContainerRef.current.querySelectorAll(".falling-logo-item");
    
    const logoBodies = [...logoElements].map((elem, index) => {
      const config = logos[index];
      const htmlElem = elem as HTMLElement;
      
      // Calculate a staggered initial position across the top area of the container
      const padding = 60;
      const spreadX = (width - padding * 2) / (logos.length || 1);
      const x = padding + spreadX * index + (Math.random() - 0.5) * 20;
      const y = padding + (Math.random() - 0.5) * 30; // Slight staggered height drop

      // Create physical bounding boxes matching the custom sizes specified in props
      const body = Bodies.rectangle(x, y, config.width, config.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.7, // Slightly reduced bounce for heavier feel
        frictionAir: 0.015,
        friction: 0.1,
      });

      // Inject small push forces at spawn
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 2,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

      return { elem: htmlElem, body };
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...logoBodies.map((lb) => lb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let animationFrameId: number;

    const updateLoop = () => {
      logoBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        // FIX: Replaced top/left mutations with translate3d to offload rendering to the GPU
        elem.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      // FIX: Removed Matter.Engine.update(engine) to prevent double-ticking the physics loop
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, logos, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      {/* Logos Layer */}
      <div ref={elementsContainerRef} className="absolute inset-0 z-10 pointer-events-none">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt || `Logo ${index}`}
            // FIX: Replaced absolute classes with top-0 left-0, added will-change-transform for native hardware optimization
            className="falling-logo-item absolute top-0 left-0 select-none origin-center opacity-0 transition-opacity duration-300 will-change-transform"
            style={{
              width: `${logo.width}px`,
              height: `${logo.height}px`,
              opacity: effectStarted ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* MatterJS Canvas Rendering Container */}
      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingLogos;
