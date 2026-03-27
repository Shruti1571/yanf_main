import { motion } from "framer-motion";

const events = [
  { icon: "🌍", title: "MUNs", desc: "Step into the shoes of world diplomats. Research global issues, debate with nations, and draft resolutions that echo real UN deliberations.", path: "/events/muns" },
  { icon: "🎙️", title: "Debates", desc: "Master the Asian Parliamentary and British Parliamentary formats — where logic, rhetoric, and conviction win the floor.", path: "/events/debates" },
  { icon: "🏛️", title: "Youth Parliament", desc: "Simulate Lok Sabha, Rajya Sabha, AIPPM, NITI Aayog & more. Build constitutional awareness and democratic responsibility.", path: "/events/youth-parliament" },
  { icon: "💡", title: "Innovation Assembly", desc: "Students pitch bold ideas as Innovators and evaluate opportunities as Investors — living both sides of the table, competing for Best Entrepreneur & Best Investor.", path: "/events/innovation-assembly" },
];

const EventsSection = () => (
  <section id="events" className="section-padding"
    style={{ background: "hsl(var(--navy2))", borderTop: "1px solid hsl(var(--border))" }}
  >
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-[1200px] mx-auto mb-14"
    >
      <div className="section-label">What We Offer</div>
      <h2 className="section-title">Our <span>Events</span></h2>
      <div className="gold-line" />
    </motion.div>

    <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event, i) => (
        <motion.div
          key={event.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{
            background: "hsl(var(--navy-light))",
            border: "1px solid hsl(var(--border))",
            padding: "2rem 1.5rem",
          }}
        >
          {/* Top bar animation */}
          <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
            style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))" }}
          />
          <div className="text-4xl mb-5">{event.icon}</div>
          <div className="font-display text-[0.85rem] font-bold tracking-[0.1em] uppercase text-primary mb-3">{event.title}</div>
          <p className="font-serif text-[0.95rem] leading-[1.7] text-muted-foreground flex-1">{event.desc}</p>
          <a href={event.path} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-primary opacity-70 group-hover:opacity-100 transition-opacity font-body"
          >
            Learn More →
          </a>
        </motion.div>
      ))}
    </div>
  </section>
);

export default EventsSection;
