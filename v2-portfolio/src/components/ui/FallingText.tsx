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
  gravity = 0.8, // Slightly dropped from 1 for a more natural, fluid float fall feel
  mouseConstraintStiffness = 0.08, // Lower stiffness creates a realistic rubber-band smooth drag lag
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
        { threshold: 0.1 },
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // MatterJS Engine & Physics Logic
  useEffect(() => {
    if (!effectStarted || logos.length === 0) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

    if (
      !containerRef.current ||
      !canvasContainerRef.current ||
      !elementsContainerRef.current
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    // Smooth Optimization 1: Configure high-accuracy collision solvers
    const engine = Engine.create({
      positionIterations: 10, // Default is 6. Prevents clipping and stutter overlaps.
      velocityIterations: 10, // Default is 4. Smoothes fast physics updates.
    });
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
    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      boundaryOptions,
    );
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height,
      boundaryOptions,
    );
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height,
      boundaryOptions,
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -25,
      width,
      50,
      boundaryOptions,
    );

    const logoElements =
      elementsContainerRef.current.querySelectorAll(".falling-logo-item");

    const logoBodies = [...logoElements].map((elem, index) => {
      const config = logos[index];
      const htmlElem = elem as HTMLElement;

      const padding = 60;
      const spreadX = (width - padding * 2) / (logos.length || 1);
      const x = padding + spreadX * index + (Math.random() - 0.5) * 20;
      const y = padding + (Math.random() - 0.5) * 30;

      // Smooth Optimization 2: Tuned micro friction and dampening properties
      const body = Bodies.rectangle(x, y, config.width, config.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.55,    // Reduced sharp bounce for fluid weight settle
        frictionAir: 0.035,   // Smooth Optimization 3: High air resistance cushions falls
        friction: 0.15,       // Smooth sliding contact over other items
        slop: 0.05,           // Extra room for physical container boundaries
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 1.5,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);

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

    // Kickstart the renderer visual canvas layer
    Render.run(render);

    let animationFrameId: number;
    let lastTime = performance.now();

    // Smooth Optimization 4: High-Precision Custom Update Loop
    // Rather than using Matter.Runner, we update engine steps manually alongside screen refresh states.
    const updateLoop = (currentTime: number) => {
      // Limit delta jumps to avoid lag explosions on background tabs
      const deltaTime = Math.min(currentTime - lastTime, 30);
      lastTime = currentTime;

      // Update physics accurately across 16.66ms slices (60Hz base step simulation)
      Engine.update(engine, deltaTime);

      logoBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        // Uses sub-pixel rendering mechanics natively supported by GPU transforms
        elem.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) rotate(${body.angle}rad)`;
      });

      animationFrameId = requestAnimationFrame(updateLoop);
    };
    
    // Begin the animation engine frame pass
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      Render.stop(render);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    logos,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center"
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      {/* Centered Modern Instruction Tag */}
      <div className="absolute pointer-events-none select-none z-20 text-center px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/40 backdrop-blur-md transition-all duration-700 opacity-60 mix-blend-screen transform translate-y-12">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
          ✦ Drag & Toss Icons ✦
        </p>
      </div>

      {/* Logos Layer */}
      <div
        ref={elementsContainerRef}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt || `Logo ${index}`}
            // added pointer-events-none to prevent native HTML drag triggers from blocking mouse constraint paths
            className="falling-logo-item absolute top-0 left-0 select-none pointer-events-none origin-center opacity-0 transition-opacity duration-500 will-change-transform drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] object-contain filter brightness-105"
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
