import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const JoinUsForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
  };

  const inputClass = "w-full py-3 px-4 font-body text-[0.85rem] text-foreground outline-none transition-all border focus:shadow-[0_0_0_3px_hsl(var(--gold)/0.07)]"
    + " placeholder:text-muted-foreground/60";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center p-8"
          style={{ background: "rgba(6,8,16,0.92)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto relative"
            style={{ background: "hsl(var(--navy2))", border: "1px solid hsl(var(--border))" }}
          >
            {/* Top gradient bar */}
            <div className="h-[3px]"
              style={{ background: "linear-gradient(90deg, hsl(var(--crimson)), hsl(var(--gold)), hsl(var(--gold-light)))" }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-10 py-8 pb-6" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <div className="font-display text-base font-bold text-primary tracking-[0.15em] uppercase">Join YANF</div>
              <button
                onClick={onClose}
                className="w-[34px] h-[34px] flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-10 py-8 pb-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="font-display text-xl font-bold text-primary tracking-[0.1em] mb-3">✓ Application Submitted!</div>
                  <p className="font-serif text-base text-cream-soft opacity-70">We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">First Name *</label>
                      <input type="text" required placeholder="Arjun" className={inputClass}
                        style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                      />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">Last Name *</label>
                      <input type="text" required placeholder="Sharma" className={inputClass}
                        style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">Email *</label>
                      <input type="email" required placeholder="arjun@example.com" className={inputClass}
                        style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                      />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">Phone</label>
                      <input type="tel" placeholder="+91 9876543210" className={inputClass}
                        style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">City</label>
                      <input type="text" placeholder="New Delhi" className={inputClass}
                        style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                      />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">Age</label>
                      <input type="number" placeholder="17" min={13} max={30} className={inputClass}
                        style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">Area of Interest</label>
                    <select className={inputClass}
                      style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                    >
                      <option value="">Select your interest</option>
                      <option>MUNs — Model United Nations</option>
                      <option>Debates & Public Speaking</option>
                      <option>Youth Parliament</option>
                      <option>Innovation Assembly</option>
                      <option>Leadership & Diplomacy</option>
                      <option>All of the above</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5 font-body">Why do you want to join YANF?</label>
                    <textarea placeholder="Tell us your motivation..." rows={4} className={inputClass + " resize-y min-h-[100px]"}
                      style={{ background: "rgba(6,8,16,0.6)", border: "1px solid hsl(var(--gold) / 0.2)", borderRadius: 0 }}
                    />
                  </div>
                  <button type="submit"
                    className="w-full py-4 font-display text-[0.8rem] font-bold tracking-[0.15em] uppercase border-none cursor-pointer transition-all hover:shadow-[0_8px_30px_hsl(var(--gold)/0.4)] hover:-translate-y-0.5 mt-2"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                      color: "hsl(var(--navy))",
                    }}
                  >
                    Submit Application →
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinUsForm;
