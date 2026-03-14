import { motion } from "framer-motion";
import { useState, useRef } from "react";

const testimonials = [
  { initial: "A", name: "Ambassador Rajiv Nair", role: "Former Diplomat, Ministry of External Affairs", quote: "YANF represents exactly the kind of youth initiative India needs. Their MUN conferences produced some of the most articulate young delegates I have ever had the privilege of witnessing." },
  { initial: "P", name: "Prof. Meera Chandrashekhar", role: "Dean of Political Science, Delhi University", quote: "The depth of preparation and intellectual rigour that YANF brings to their debates is remarkable. These students demonstrate a level of geopolitical awareness that rivals university graduates." },
  { initial: "S", name: "Siddharth Agarwal", role: "CEO, StartupIndia Foundation", quote: "We partnered with YANF for the Innovation Assembly and were astounded by the quality of solutions presented. This organisation is building India's future problem-solvers." },
  { initial: "N", name: "Nandita Rao", role: "Principal, Springfields International School", quote: "YANF's Youth Parliament gave our students an experience no classroom could replicate. The confidence and clarity they developed in just one event was transformational." },
];

const FeedbackSection = () => {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const slide = (dir: number) => {
    const max = Math.max(0, testimonials.length - 3);
    setIdx((prev) => Math.max(0, Math.min(prev + dir, max)));
  };

  return (
    <section id="testimonials" className="section-padding"
      style={{ background: "hsl(var(--navy))", borderTop: "1px solid hsl(var(--border))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto mb-14"
      >
        <div className="section-label">What Leaders Say</div>
        <h2 className="section-title">Voices of <span>Authority</span></h2>
        <div className="gold-line" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto relative overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${idx * (100 / 3 + 1.5)}%)`,
            transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative flex-shrink-0 mr-6 p-10"
              style={{
                minWidth: "calc(33.33% - 1rem)",
                background: "hsl(var(--navy-light))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-6 font-serif text-[5rem] leading-none pointer-events-none" style={{ color: "hsl(var(--gold) / 0.12)" }}>
                &ldquo;
              </div>
              {/* Avatar */}
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-display text-lg font-bold mb-5"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--crimson)))",
                  color: "hsl(var(--navy))",
                  border: "2px solid hsl(var(--gold) / 0.3)",
                }}
              >
                {t.initial}
              </div>
              <p className="font-serif text-base italic leading-[1.8] text-cream-soft opacity-85 mb-6">
                {t.quote}
              </p>
              <div className="font-display text-[0.78rem] font-semibold text-primary tracking-[0.1em]">{t.name}</div>
              <div className="text-[0.7rem] text-muted-foreground tracking-[0.08em] mt-1 font-body">{t.role}</div>
            </div>
          ))}
        </div>

        {/* Slider controls */}
        <div className="flex gap-3 mt-8 justify-center">
          <button
            onClick={() => slide(-1)}
            className="w-[42px] h-[42px] flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-background transition-all cursor-pointer text-base"
          >
            ←
          </button>
          <button
            onClick={() => slide(1)}
            className="w-[42px] h-[42px] flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-background transition-all cursor-pointer text-base"
          >
            →
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default FeedbackSection;
