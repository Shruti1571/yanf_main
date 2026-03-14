import { useEffect, useRef, useState } from "react";

const FLAG_COLORS = [
  '#FF9933', '#138808', '#000080', '#FFFFFF',
  '#FF0000', '#FFFFFF', '#0000FF',
  '#FF0000', '#000000', '#FFCC00',
  '#FF0000', '#FFFFFF',
  '#003893', '#FF0000', '#FFFFFF',
  '#007A3D', '#FFFFFF', '#EF3340',
];

const CounterCard = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const step = target / 80;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { setCount(target); clearInterval(interval); }
          else setCount(Math.floor(current));
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = target >= 1000
    ? (count / 1000).toFixed(count >= target ? 0 : 1) + "k+"
    : count + "+";

  return (
    <div ref={ref} className="flex-1 text-center py-7 px-6 relative overflow-hidden"
      style={{
        background: "rgba(13,18,36,0.8)",
        border: "1px solid hsl(var(--border))",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }}
      />
      <div className="font-display text-4xl font-bold text-primary leading-none mb-1.5">
        {display}
      </div>
      <div className="text-[0.72rem] font-medium tracking-[0.15em] uppercase text-muted-foreground leading-snug font-body"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
};

const HeroSection = ({ onJoinClick }: { onJoinClick: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W: number, H: number;

    const particles: { phi: number; theta: number; r: number; speed: number; size: number; color: string; opacity: number }[] = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      const r = Math.min(W, H) * 0.28;
      for (let i = 0; i < 220; i++) {
        particles.push({
          phi: Math.random() * Math.PI * 2,
          theta: Math.random() * Math.PI,
          r,
          speed: (Math.random() * 0.002 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * 2 + 0.5,
          color: FLAG_COLORS[Math.floor(Math.random() * FLAG_COLORS.length)],
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawGlobe = () => {
      const cx = W / 2, cy = H / 2;
      const r = Math.min(W, H) * 0.28;
      ctx.strokeStyle = "rgba(201,168,76,0.06)";
      ctx.lineWidth = 0.5;

      for (let lat = -80; lat <= 80; lat += 20) {
        const yr = r * Math.sin((lat * Math.PI) / 180);
        const xr = r * Math.cos((lat * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(cx, cy + yr * 0.5, xr, xr * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * Math.abs(Math.cos(angle)), r * 0.5, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      drawGlobe();

      const cx = W / 2, cy = H / 2;
      for (const p of particles) {
        p.phi += 0.003;
        const x = cx + p.r * Math.sin(p.theta) * Math.cos(p.phi);
        const y = cy + p.r * Math.sin(p.theta) * Math.sin(p.phi) * 0.5;
        const z = p.r * Math.cos(p.theta);
        const scale = (z + p.r) / (2 * p.r);

        ctx.beginPath();
        ctx.arc(x, y, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * scale;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Globe canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.75) 60%, rgba(10,14,26,0.97) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-[2] text-center px-8 max-w-[900px] animate-hero-fade-in">
        <div className="font-display text-[0.7rem] font-normal tracking-[0.35em] uppercase text-primary mb-6 opacity-85">
          Est. 2026 &nbsp;·&nbsp; Empowering India's Youth
        </div>
        <h1 className="font-display font-black leading-[0.95] text-white mb-2"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.01em" }}
        >
          <span className="text-primary">Y</span>OUTH <span className="text-primary">A</span>S<br />
          <span className="text-primary">N</span>ATION'S <span className="text-primary">F</span>RONT
        </h1>
        <p className="font-serif italic text-cream-soft tracking-[0.05em] mb-10 opacity-85"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontWeight: 300 }}
        >
          Shaping tomorrow's diplomats, leaders &amp; changemakers
        </p>
        <p className="font-body text-[0.8rem] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-10">
          MUNs · Debates · Youth Parliament · Innovation Assembly
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={onJoinClick} className="btn-primary-yanf">Join the Movement</button>
          <button onClick={scrollToAbout} className="btn-outline-yanf">Discover YANF</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="relative z-[2] w-full max-w-[900px] px-8 mt-16 mb-8 flex gap-[1px]"
        style={{ animation: "heroFadeIn 1.8s ease forwards" }}
      >
        <CounterCard target={100} label="Events Conducted<br/>& Growing" />
        <CounterCard target={10000} label="Students Who<br/>Participated" />
        <CounterCard target={50} label="Highly Qualified<br/>Chairs" />
      </div>
    </section>
  );
};

export default HeroSection;
