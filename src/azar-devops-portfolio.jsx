import { useState, useEffect, useRef } from "react";

const cn = (...cls) => cls.filter(Boolean).join(" ");

function useTypewriter(texts, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);
  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const IcoAws = () => (
  <svg viewBox="0 0 40 40" fill="none" style={{width:32,height:32}}>
    <path d="M12 22c-3 1.5-5 4-5 7h26c0-3-2-5.5-5-7" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 8 C14 8 10 13 10 18C10 23 14 26 20 26C26 26 30 23 30 18C30 13 26 8 20 8Z" stroke="#FF9900" strokeWidth="1.5"/>
    <path d="M4 30 Q10 26 16 28 Q20 30 24 28 Q30 26 36 30" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="20" cy="18" r="3" fill="#FF9900" opacity="0.8"/>
  </svg>
);
const IcoK8s = () => (
  <svg viewBox="0 0 40 40" fill="none" style={{width:32,height:32}}>
    <circle cx="20" cy="20" r="14" stroke="#326CE5" strokeWidth="1.5"/>
    <path d="M20 6 L20 34 M6 20 L34 20 M9 9 L31 31 M31 9 L9 31" stroke="#326CE5" strokeWidth="1" opacity="0.5"/>
    <circle cx="20" cy="6" r="2.5" fill="#326CE5"/>
    <circle cx="20" cy="34" r="2.5" fill="#326CE5"/>
    <circle cx="6" cy="20" r="2.5" fill="#326CE5"/>
    <circle cx="34" cy="20" r="2.5" fill="#326CE5"/>
    <circle cx="20" cy="20" r="4" fill="#326CE5" opacity="0.6"/>
  </svg>
);
const IcoTf = () => (
  <svg viewBox="0 0 40 40" fill="none" style={{width:32,height:32}}>
    <path d="M20 5 L8 12 L8 26 L20 33 L32 26 L32 12 Z" stroke="#7B42BC" strokeWidth="1.5"/>
    <path d="M20 5 L20 33" stroke="#7B42BC" strokeWidth="1" opacity="0.5"/>
    <path d="M8 12 L32 12" stroke="#7B42BC" strokeWidth="1" opacity="0.5"/>
    <path d="M14 8.5 L14 22 L20 25.5" stroke="#7B42BC" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M26 8.5 L26 22 L20 25.5" stroke="#7B42BC" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IcoTerminal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:32,height:32}}>
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);
const IcoGithub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const IcoLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IcoEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IcoPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.61 19.79 19.79 0 01.07 2C.07.9.91.01 2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IcoPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcoCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:14,height:14}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IcoArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcoMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}>
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IcoClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcoDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IcoCert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:40,height:40}}>
    <circle cx="12" cy="8" r="6"/>
    <path d="M9 21l3-3 3 3V14.5A6.5 6.5 0 015.5 8"/>
    <path d="M15 8a3 3 0 10-6 0"/>
  </svg>
);
const IcoTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:32,height:32}}>
    <path d="M6 9H4a2 2 0 01-2-2V5h4"/>
    <path d="M18 9h2a2 2 0 002-2V5h-4"/>
    <path d="M8 21h8M12 17v4"/>
    <path d="M4 5h16v5a8 8 0 01-8 8 8 8 0 01-8-8V5z"/>
  </svg>
);
const IcoServer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:32,height:32}}>
    <rect x="2" y="2" width="20" height="8" rx="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);
const IcoZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:32,height:32}}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IcoShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:32,height:32}}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

function AnimatedBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.5 ? "#00D4FF" : "#7B2FFF",
    }));
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(0,212,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
      });
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "99";
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }} />;
}

function GlassCard({ children, className = "", hover = true, glow }) {
  return (
    <div className={cn(
      "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md",
      hover && "transition-all duration-300 hover:border-cyan-400/30 hover:shadow-xl hover:-translate-y-1",
      glow && "shadow-lg",
      className
    )} style={glow ? { boxShadow:"0 0 30px rgba(0,212,255,0.08)" } : {}}>
      {children}
    </div>
  );
}

function Section({ id, children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={cn(
      "relative py-20 px-4 transition-all duration-700",
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      className
    )}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function SkillBar({ name, level, colorClass }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-slate-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", colorClass)}
          style={{ width: inView ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function Terminal({ lines }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 font-mono text-sm">
      <div style={{background:"#1a1a2e"}} className="px-4 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500"/>
        <div className="w-3 h-3 rounded-full bg-yellow-500"/>
        <div className="w-3 h-3 rounded-full bg-green-500"/>
        <span className="text-slate-500 text-xs ml-2">terminal — bash</span>
      </div>
      <div style={{background:"#0d0d1a"}} className="p-4 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={cn("text-xs",
            line.startsWith("$") ? "text-cyan-400" : line.startsWith("#") ? "text-slate-500" : "text-green-400"
          )}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function StatCounter({ value, label, suffix = "", colorClass }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  const numVal = parseFloat(value);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = numVal / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= numVal) { setCount(numVal); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, numVal]);
  const display = Number.isInteger(numVal) ? Math.round(count) : count.toFixed(2);
  return (
    <div ref={ref} className="text-center">
      <div className={cn("text-4xl md:text-5xl font-black font-mono", colorClass)}>{display}{suffix}</div>
      <div className="text-slate-400 text-sm mt-1">{label}</div>
    </div>
  );
}

function ProjectCard({ title, desc, tech, achievements, arch, gradientStyle, github }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <GlassCard className="p-6 group cursor-pointer" hover>
      <div className="w-full h-1 rounded-full mb-5" style={gradientStyle} />
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{desc}</p>
      <div className="text-xs font-mono text-slate-500 mb-3 p-3 rounded-lg leading-relaxed" style={{background:"rgba(0,0,0,0.2)"}}>{arch}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-md text-cyan-400 text-xs font-mono border border-cyan-400/20" style={{background:"rgba(0,212,255,0.08)"}}>{t}</span>
        ))}
      </div>
      <button onClick={() => setExpanded(!expanded)} className="text-xs text-cyan-400 hover:text-cyan-300 font-mono mb-3 block">
        {expanded ? "▲ Hide achievements" : "▼ View achievements"}
      </button>
      {expanded && (
        <ul className="space-y-1.5 mb-4">
          {achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-cyan-400 mt-0.5 shrink-0"><IcoCheck /></span>{a}
            </li>
          ))}
        </ul>
      )}
      <a href={github || "https://github.com"} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 text-xs border border-white/10 transition-all hover:border-white/20" style={{background:"rgba(255,255,255,0.05)"}}>
        <IcoGithub /> GitHub
      </a>
    </GlassCard>
  );
}

function ExperienceCard({ company, role, period, location, bullets, index, borderColor, dotColor }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={cn(
      "relative pl-8 transition-all duration-700",
      inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
    )} style={{ transitionDelay: `${index * 150}ms` }}>
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2" style={{ background: dotColor, borderColor:"#0a0a1a" }} />
      {index < 2 && <div className="absolute w-px bg-white/10" style={{ left:"5px", top:"20px", bottom:"-24px" }} />}
      <div className={cn("p-6 mb-6 rounded-2xl border-l-2 backdrop-blur-md border border-white/10")} style={{ borderLeftColor: borderColor, background:"rgba(255,255,255,0.03)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
          <h3 className="text-lg font-bold text-white">{company}</h3>
          <span className="text-xs font-mono text-slate-500 mt-1 sm:mt-0">{period}</span>
        </div>
        <p className="text-cyan-400 text-sm font-medium mb-1">{role}</p>
        <p className="text-slate-500 text-xs mb-4 flex items-center gap-1"><IcoPin /> {location}</p>
        <ul className="space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-cyan-400 mt-0.5 shrink-0"><IcoArrow /></span>{b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "8718bc37-022e-42e1-a332-aaecac6e0080", // 🔑 Replace with your key from web3forms.com
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: "Portfolio Contact Form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name:"", email:"", subject:"", message:"" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)" };
  const inputClass = "w-full px-4 py-2.5 rounded-xl text-white text-sm focus:outline-none transition-colors";

  if (status === "success") return (
    <div className="text-center py-10">
      <div className="text-4xl mb-3">✅</div>
      <p className="text-white font-bold text-lg mb-1">Message Sent!</p>
      <p className="text-slate-400 text-sm mb-6">I'll get back to you within 24 hours.</p>
      <button onClick={() => setStatus("idle")} className="px-6 py-2 rounded-xl text-sm text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 transition-all">
        Send Another
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label:"Your Name",     name:"name",    placeholder:"John Doe",                    type:"text"  },
        { label:"Email Address", name:"email",   placeholder:"john@company.com",            type:"email" },
        { label:"Subject",       name:"subject", placeholder:"DevOps Engineer Opportunity", type:"text"  },
      ].map(f => (
        <div key={f.name}>
          <label className="text-slate-400 text-xs font-medium mb-1.5 block">{f.label}</label>
          <input required type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
            placeholder={f.placeholder} className={inputClass} style={inputStyle} />
        </div>
      ))}
      <div>
        <label className="text-slate-400 text-xs font-medium mb-1.5 block">Message</label>
        <textarea required rows={4} name="message" value={form.message} onChange={handleChange}
          placeholder="Tell me about the opportunity..."
          className={`${inputClass} resize-none`} style={inputStyle} />
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs">Something went wrong. Please try again or email directly.</p>
      )}
      <button type="submit" disabled={status === "sending"}
        className="w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background:"linear-gradient(to right,#06b6d4,#2563eb)", border:"none", cursor:"pointer" }}>
        {status === "sending" ? "Sending…" : <><span>Send Message</span><IcoArrow /></>}
      </button>
    </form>
  );
}

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typed = useTypewriter(["DevSecOps Engineer","AWS Cloud Engineer","Kubernetes Engineer","CI/CD Engineer","Infrastructure Automation Engineer","DevOps Engineer"], 90, 2200);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id:"about", label:"About" },{ id:"skills", label:"Skills" },{ id:"experience", label:"Experience" },
    { id:"projects", label:"Projects" },{ id:"achievements", label:"Achievements" },
    { id:"certifications", label:"Certifications" },{ id:"contact", label:"Contact" },
  ];

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setNavOpen(false); };

  const skillGroups = [
    { title:"Cloud — AWS", colorClass:"bg-gradient-to-r from-orange-400 to-yellow-500", icon:<IcoAws />,
      skills:[{name:"EC2 / VPC / IAM",level:92},{name:"S3 / CloudFront",level:90},{name:"EKS / Lambda",level:85},{name:"RDS / DynamoDB",level:80},{name:"CloudWatch / SNS",level:88}]},
    { title:"CI/CD & Automation", colorClass:"bg-gradient-to-r from-cyan-400 to-blue-500", icon:<IcoTerminal />,
      skills:[{name:"GitHub Actions",level:92},{name:"Jenkins",level:82},{name:"Python Scripting",level:80},{name:"Bash / Shell",level:85}]},
    { title:"Containers & K8s", colorClass:"bg-gradient-to-r from-purple-400 to-pink-500", icon:<IcoK8s />,
      skills:[{name:"Docker",level:90},{name:"Kubernetes",level:85},{name:"Helm Charts",level:80},{name:"EKS",level:82}]},
    { title:"IaC & Monitoring", colorClass:"bg-gradient-to-r from-green-400 to-teal-500", icon:<IcoTf />,
      skills:[{name:"Terraform",level:85},{name:"Linux / Networking",level:90},{name:"Prometheus + Grafana",level:82},{name:"Trivy / SonarQube",level:78}]},
  ];

  const experiences = [
    { company:"SPM Global Technologies (DealDox CPQ)", role:"DevOps Engineer", period:"2024 – Present", location:"Bengaluru, India",
      borderColor:"#22d3ee", dotColor:"#22d3ee", index:0,
      bullets:["Architected and automated end-to-end CI/CD pipelines, cutting deployment cycle by 35%.","Managed and maintained 50+ EC2 servers with 99.99% uptime SLA adherence.","Configured CloudWatch dashboards and alarms for proactive production monitoring.","Built Lambda-based event-driven automation for routine operational tasks.","Designed comprehensive backup & DR strategy using S3 + lifecycle policies.","Wrote Python scripts for infrastructure automation and reporting."]},
    { company:"Simtekway Solutions", role:"DevOps / Cloud Engineer", period:"2024 – 2024", location:"Bengaluru, India",
      borderColor:"#a855f7", dotColor:"#a855f7", index:1,
      bullets:["Built GitHub Actions workflows for multi-environment deployments with approval gates.","Integrated Trivy container scanning into pipelines for zero-vulnerability releases.","Deployed Lambda functions for automated cost-optimization and alerting.","Managed AWS infrastructure (EC2, S3, VPC, IAM) and enforced least-privilege access."]},
    { company:"Corefront Technologies", role:"Junior DevOps Engineer", period:"2023 – 2023", location:"Bengaluru, India",
      borderColor:"#f97316", dotColor:"#f97316", index:2,
      bullets:["Provided AWS infrastructure support for staging and production environments.","Implemented CI/CD workflows reducing manual deployment errors.","Integrated SonarQube for code quality gates in build pipelines.","Automated routine tasks using Python and Bash scripting."]},
  ];

  const projects = [
    { title:"3-Tier Application on AWS",
      github:"https://github.com/AzarCodes/MongoDB-Production-Backup-to-AWS-S3",
      desc:"Production-grade 3-tier web application with auto-scaling, load balancing, and RDS multi-AZ deployment.",
      arch:"Internet → ALB → EC2 ASG (App Layer) → RDS Multi-AZ\nS3 (Static) | CloudFront CDN | Route53 DNS | WAF",
      tech:["EC2","ALB","Auto Scaling","RDS","S3","CloudFront","Route53","Terraform"],
      gradientStyle:{ background:"linear-gradient(to right, #22d3ee, #2563eb)" },
      achievements:["99.99% uptime with multi-AZ and auto-scaling","CloudFront CDN reduced latency by 40%","Terraform IaC enables reproducible provisioning","WAF blocked OWASP Top 10 attack vectors"]},
    { title:"Scalable Microservices on EKS",
      github:"https://github.com/AzarCodes/MongoDB-Production-Backup-to-AWS-S3",
      desc:"Kubernetes-native microservices on AWS EKS with Helm, HPA, and Prometheus/Grafana observability.",
      arch:"Ingress Controller → K8s Services → Pods (HPA)\nHelm | Prometheus + Grafana | ECR | EKS Cluster",
      tech:["EKS","Kubernetes","Helm","Docker","Prometheus","Grafana","ECR","IAM IRSA"],
      gradientStyle:{ background:"linear-gradient(to right, #a855f7, #ec4899)" },
      achievements:["15+ microservices with zero-downtime rolling updates","HPA scales pods 3x–10x automatically under load","Grafana dashboards for real-time visibility","Trivy blocked 3 critical CVEs before production"]},
    { title:"Serverless Automation — Lambda + EventBridge",
      github:"https://github.com/AzarCodes/MongoDB-Production-Backup-to-AWS-S3",
      desc:"Event-driven serverless automation for scheduled maintenance, alerts, and cross-service orchestration.",
      arch:"EventBridge Rules → Lambda → SNS/SES/S3\nCloudWatch Logs | IAM Roles | Parameter Store | DLQ",
      tech:["Lambda","EventBridge","SNS","SES","Python","CloudWatch","IAM","SQS"],
      gradientStyle:{ background:"linear-gradient(to right, #f97316, #dc2626)" },
      achievements:["Automated 20+ manual tasks saving 8+ hours/week","Cost Lambda reduced AWS bill by ~18%","DLQ ensures 100% event processing reliability","Real-time Slack/email alerts for infra events"]},
    { title:"MongoDB Production Backup to AWS S3",
      github:"https://github.com/AzarCodes/MongoDB-Production-Backup-to-AWS-S3",
      desc:"Production-grade MongoDB backup system — streams daily dumps directly to S3 with zero local disk usage, AES-256 encryption, versioning, and automated lifecycle tiering.",
      arch:"MongoDB → mongodump --archive --gzip\n→ aws s3 cp (stream, no disk) → S3 (Versioned + AES-256)\nLifecycle: 30d → STANDARD_IA | 90d → GLACIER | 180d → DEEP_ARCHIVE\nCron: 03:00 AM daily | Restore: mongorestore --archive --gzip",
      tech:["AWS S3","MongoDB","Bash","AWS CLI","S3 Lifecycle","AES-256","Versioning","Cron","Ubuntu VPS"],
      gradientStyle:{ background:"linear-gradient(to right, #4ade80, #14b8a6)" },
      achievements:[
        "Zero local disk usage — mongodump streams directly to S3 via pipe, no temp files",
        "AES-256 server-side encryption + S3 versioning enabled on production backup bucket",
        "Automated lifecycle policy: STANDARD_IA (30d) → GLACIER (90d) → DEEP_ARCHIVE (180d), reducing storage costs by ~60%",
        "Daily 3 AM cron job with full logging — zero manual intervention since deployment",
        "Restore tested and validated — full DB recovery via mongorestore --archive --gzip in under 30 minutes",
        "Separate backup pipelines for PROD and DEV/UAT environments with isolated S3 buckets",
      ]},
  ];

  const achievements = [
    { icon:<IcoTrophy />, stat:"99.99", suffix:"%", label:"Uptime Achieved", colorClass:"text-cyan-400", desc:"Production SLA across 50+ EC2 servers with zero unplanned outages." },
    { icon:<IcoZap />, stat:"35", suffix:"%", label:"Faster Deployments", colorClass:"text-purple-400", desc:"CI/CD optimization reduced deployment cycle from hours to minutes." },
    { icon:<IcoServer />, stat:"50", suffix:"+", label:"Servers Managed", colorClass:"text-orange-400", desc:"Centrally managed production EC2 fleet with IaC and monitoring." },
    { icon:<IcoShield />, stat:"30", suffix:"%", label:"Downtime Reduced", colorClass:"text-green-400", desc:"Proactive alerting and auto-healing reduced operational downtime." },
  ];

  const certifications = [
    { title:"AWS Certified Solutions Architect", level:"Associate", provider:"Amazon Web Services", gradient:"linear-gradient(135deg,#f97316,#eab308)", status:"In Progress" },
    { title:"AWS Certified DevOps Engineer", level:"Professional", provider:"Amazon Web Services", gradient:"linear-gradient(135deg,#22d3ee,#2563eb)", status:"Planned" },
    { title:"Certified Kubernetes Administrator", level:"CKA", provider:"CNCF", gradient:"linear-gradient(135deg,#a855f7,#ec4899)", status:"Planned" },
    { title:"HashiCorp Terraform Associate", level:"Associate", provider:"HashiCorp", gradient:"linear-gradient(135deg,#8b5cf6,#7c3aed)", status:"Planned" },
  ];

  return (
    <div className="min-h-screen text-white relative" style={{ background:"#060612", fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #060612 !important; margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a1e; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
        @keyframes floatY { from { transform: translateY(0px); } to { transform: translateY(-18px); } }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 20px rgba(0,212,255,0.3); } 50% { box-shadow: 0 0 40px rgba(0,212,255,0.6); } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinSlowRev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes gradientShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
        .pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
        .spin-slow { animation: spinSlow 20s linear infinite; }
        .spin-slow-rev { animation: spinSlowRev 35s linear infinite; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #00D4FF, #7B2FFF, #FF6B6B);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }
        .hover-lift { transition: transform 0.3s, box-shadow 0.3s; }
        .hover-lift:hover { transform: translateY(-4px); }
      `}</style>

      <AnimatedBg />

      {/* Floating icons */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
        {[
          { icon:"⚙️", left:"8%", top:"20%", delay:"0s", dur:"6s" },
          { icon:"☁️", left:"88%", top:"15%", delay:"1s", dur:"8s" },
          { icon:"🐳", left:"5%", top:"65%", delay:"2s", dur:"7s" },
          { icon:"🔧", left:"92%", top:"55%", delay:"0.5s", dur:"9s" },
          { icon:"🛡️", left:"15%", top:"85%", delay:"1.5s", dur:"6s" },
          { icon:"⚡", left:"82%", top:"80%", delay:"3s", dur:"7s" },
        ].map((item, i) => (
          <div key={i} style={{ position:"absolute", left:item.left, top:item.top, fontSize:24, opacity:0.08, animation:`floatY ${item.dur} ${item.delay} ease-in-out infinite alternate` }}>
            {item.icon}
          </div>
        ))}
      </div>

      {/* NAV */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50,
        transition:"all 0.3s",
        ...(scrolled ? { background:"rgba(6,6,18,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"12px 0" } : { padding:"20px 0" })
      }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-black text-xl tracking-tight" style={{ background:"none", border:"none", cursor:"pointer" }}>
            <span className="text-white">azar</span><span className="text-cyan-400">.</span><span className="text-slate-400 font-mono text-sm">devops</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium rounded-lg"
                style={{ background:"none", border:"none", cursor:"pointer" }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")}
              className="ml-2 px-4 py-1.5 rounded-lg text-cyan-400 text-sm font-semibold transition-all"
              style={{ background:"rgba(0,212,255,0.08)", border:"1px solid rgba(0,212,255,0.3)", cursor:"pointer" }}>
              Hire Me
            </button>
          </div>
          <button className="md:hidden text-slate-300" onClick={() => setNavOpen(!navOpen)} style={{ background:"none", border:"none", cursor:"pointer" }}>
            {navOpen ? <IcoClose /> : <IcoMenu />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden px-4 py-4 space-y-1" style={{ background:"rgba(10,10,30,0.97)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="block w-full text-left px-4 py-2.5 text-slate-300 hover:text-cyan-400 rounded-lg text-sm font-medium transition-all"
                style={{ background:"none", border:"none", cursor:"pointer" }}>
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        style={{ background:"radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)" }}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
          <div className="spin-slow" style={{ width:600, height:600, borderRadius:"50%", border:"1px solid rgba(0,212,255,0.05)", position:"absolute" }} />
          <div className="spin-slow-rev" style={{ width:800, height:800, borderRadius:"50%", border:"1px solid rgba(123,47,255,0.04)", position:"absolute" }} />
        </div>
        <div className="relative text-center max-w-4xl mx-auto" style={{ zIndex:2 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ border:"1px solid rgba(0,212,255,0.3)", background:"rgba(0,212,255,0.05)" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono tracking-wider">AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-4">
            <span className="block text-white mb-1">Hi, I'm</span>
            <span className="gradient-text">Azar S</span>
          </h1>
          <div className="text-xl md:text-2xl font-mono text-slate-300 mb-3 h-8">
            <span className="text-cyan-400">&gt; </span>{typed}
            <span className="cursor-blink text-cyan-400 ml-0.5">_</span>
          </div>
          <p className="text-sm font-semibold tracking-widest text-slate-500 uppercase mb-6">
            DevOps Engineer · AWS · Kubernetes · CI/CD · Terraform
          </p>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Experienced DevOps Engineer with <span className="text-cyan-400 font-semibold">3.2+ years</span> of expertise in AWS cloud infrastructure, CI/CD automation, Kubernetes, monitoring, and production systems at scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => scrollTo("projects")}
              className="pulse-glow px-6 py-3 rounded-xl text-white font-bold flex items-center gap-2 transition-all hover:opacity-90"
              style={{ background:"linear-gradient(to right,#06b6d4,#2563eb)", border:"none", cursor:"pointer" }}>
              View Projects <IcoArrow />
            </button>
            <button className="px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 transition-all"
              style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer" }}>
              <IcoDownload /> Download Resume
            </button>
            <button onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-xl text-purple-300 font-semibold transition-all"
              style={{ background:"rgba(168,85,247,0.05)", border:"1px solid rgba(168,85,247,0.3)", cursor:"pointer" }}>
              Contact Me
            </button>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{n:"3.2+",l:"Years Exp."},{n:"50+",l:"Servers Managed"},{n:"99.99%",l:"Uptime"},{n:"35%",l:"Faster Deploys"}].map(s => (
              <div key={s.l} className="p-4 text-center rounded-2xl" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-2xl font-black text-cyan-400">{s.n}</div>
                <div className="text-slate-500 text-xs mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">About Me</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Building Infrastructure<br/><span className="gradient-text">That Never Sleeps</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>I'm a <span className="text-white font-semibold">DevOps Engineer</span> with over <span className="text-cyan-400 font-semibold">3.2 years</span> of hands-on experience architecting and managing cloud infrastructure on AWS.</p>
              <p>I manage a fleet of <span className="text-cyan-400 font-semibold">50+ EC2 servers</span>, have achieved <span className="text-cyan-400 font-semibold">99.99% uptime</span> across production environments, and consistently drive improvements through automation — from CI/CD pipelines with GitHub Actions to infrastructure-as-code with Terraform.</p>
              <p>My passion lies in turning manual operational pain into elegant automation, scaling cloud systems from zero to production-ready with security, observability, and disaster recovery baked in from day one.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["AWS","Docker","Kubernetes","Terraform","GitHub Actions","Python","Linux","Prometheus"].map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-slate-300 text-xs font-medium" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)" }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Terminal lines={[
              "# System Status Check",
              "$ kubectl get nodes --all-namespaces",
              "NAME         STATUS   ROLES    AGE    VERSION",
              "prod-node-1  Ready    master   365d   v1.28.0",
              "prod-node-2  Ready    worker   365d   v1.28.0",
              "prod-node-3  Ready    worker   365d   v1.28.0",
              "",
              "$ terraform plan -out=prod.tfplan",
              "Plan: 0 to add, 2 to change, 0 to destroy.",
              "",
              "$ aws ec2 describe-instance-status",
              "✓ 52 instances running | 0 degraded",
            ]} />
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background:"rgba(74,222,128,0.05)", border:"1px solid rgba(74,222,128,0.2)" }}>
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse shrink-0" />
              <span className="text-green-400 text-sm font-mono">All systems operational · 99.99% uptime</span>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills">
        <SectionTitle eyebrow="Technical Arsenal" title="Skills & Expertise" subtitle="Deep expertise across the modern DevOps & cloud-native stack" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillGroups.map((group) => (
            <GlassCard key={group.title} className="p-6" glow>
              <div className="mb-4">{group.icon}</div>
              <h3 className="text-white font-bold text-sm mb-5 tracking-wide">{group.title}</h3>
              {group.skills.map(s => (
                <SkillBar key={s.name} name={s.name} level={s.level} colorClass={group.colorClass} />
              ))}
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8" hover={false}>
          <p className="text-center text-slate-500 text-xs font-mono uppercase tracking-widest mb-6">Full Technology Stack</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["AWS EC2","AWS S3","AWS IAM","AWS VPC","AWS RDS","AWS Lambda","AWS CloudWatch","AWS EKS","GitHub Actions","Jenkins","Docker","Kubernetes","Helm","Terraform","Prometheus","Grafana","Trivy","SonarQube","Python","Bash","PostgreSQL","MongoDB Atlas","Linux","Route53","ALB","Auto Scaling","CloudFront","KMS","SNS","SES","EventBridge","Parameter Store"].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-lg text-slate-400 text-xs font-mono transition-all cursor-default hover:text-cyan-400" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>{t}</span>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <SectionTitle eyebrow="Career Journey" title="Work Experience" subtitle="3.2+ years building and scaling cloud infrastructure in production" />
        <div className="relative">
          {experiences.map((exp, i) => <ExperienceCard key={i} {...exp} />)}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <SectionTitle eyebrow="Portfolio" title="Featured Projects" subtitle="Production-grade infrastructure and automation projects" />
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section id="achievements">
        <SectionTitle eyebrow="Impact" title="Key Achievements" subtitle="Measurable results from real production environments" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {achievements.map((a, i) => (
            <GlassCard key={i} className="p-6 text-center" glow>
              <div className={cn("flex justify-center mb-4", a.colorClass)}>{a.icon}</div>
              <StatCounter value={a.stat} suffix={a.suffix} label={a.label} colorClass={a.colorClass} />
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">{a.desc}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8" hover={false}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title:"Production Infrastructure", items:["50+ EC2 servers in active use","Multi-AZ RDS deployments","CloudFront CDN for 3 applications","VPC with private subnets + NAT GW"] },
              { title:"Automation Wins", items:["100% automated backup pipelines","20+ manual tasks eliminated via Lambda","Zero-downtime deployments with K8s","Auto-scaling policies on all app tiers"] },
              { title:"Security & Compliance", items:["Trivy scanning — 0 CVEs in prod","Least-privilege IAM across all services","SSL/TLS for all endpoints via ACM","SonarQube quality gates in pipelines"] },
            ].map(block => (
              <div key={block.title}>
                <h4 className="font-bold text-sm mb-3 text-cyan-400">{block.title}</h4>
                <ul className="space-y-2">
                  {block.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-cyan-400 mt-0.5 shrink-0"><IcoCheck /></span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications">
        <SectionTitle eyebrow="Credentials" title="Certifications" subtitle="Current and upcoming professional certifications" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((c, i) => (
            <GlassCard key={i} className="p-6 text-center group hover-lift" hover={false}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white" style={{ background:c.gradient }}>
                <IcoCert />
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-3 inline-block"
                style={c.status === "In Progress"
                  ? { background:"rgba(250,204,21,0.1)", color:"#facc15", border:"1px solid rgba(250,204,21,0.2)" }
                  : { background:"rgba(148,163,184,0.1)", color:"#94a3b8", border:"1px solid rgba(148,163,184,0.2)" }}>
                {c.status}
              </span>
              <h3 className="text-white font-bold text-sm mb-1 leading-snug">{c.title}</h3>
              <p className="text-slate-500 text-xs">{c.level}</p>
              <p className="text-slate-600 text-xs mt-1">{c.provider}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <SectionTitle eyebrow="Get In Touch" title="Let's Build Together" subtitle="Open to DevOps, Cloud, and SRE opportunities" />
        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="p-8" hover={false} glow>
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              {[
                { icon:<IcoEmail />, label:"Email", value:"azar.sameeulla@outlook.com", href:"mailto:azar.sameeulla@outlook.com" },
                { icon:<IcoPhone />, label:"Phone", value:"+91 78990 35306", href:null },
                { icon:<IcoPin />, label:"Location", value:"Bengaluru, Karnataka, India", href:null },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl transition-all" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-cyan-400">{c.icon}</div>
                  <div>
                    <div className="text-slate-500 text-xs">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-white text-sm font-medium hover:text-cyan-400 transition-colors">{c.value}</a>
                    ) : (
                      <span className="text-white text-sm font-medium">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-slate-500 text-xs mb-4">Find me on</p>
              <div className="flex gap-3">
                {[
                  { icon:<IcoGithub />, label:"GitHub", href:"https://github.com/AzarCodes" },
                  { icon:<IcoLinkedin />, label:"LinkedIn", href:"https://www.linkedin.com/in/azar-devops/" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 text-sm font-medium transition-all hover:text-cyan-400"
                    style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-8" hover={false}>
            <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-slate-500 text-sm mb-6">I typically respond within 24 hours.</p>
            <ContactForm />
          </GlassCard>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative py-10 px-4 text-center" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-2xl font-black mb-2">
            <span className="text-white">azar</span><span className="text-cyan-400">.</span><span className="text-slate-400 font-mono text-sm">devops</span>
          </div>
          <p className="text-slate-600 text-sm mb-4">DevOps Engineer · AWS · Kubernetes · Terraform · CI/CD</p>
          <p className="text-slate-600 text-xs mb-6">Bengaluru, India</p>
          <div className="flex justify-center gap-4 mb-6">
            {[
              { icon:<IcoGithub />, href:"https://github.com/AzarCodes" },
              { icon:<IcoLinkedin />, href:"https://www.linkedin.com/in/azar-devops" },
              { icon:<IcoEmail />, href:"mailto:azar.sameeulla@outlook.com" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-slate-700 text-xs">© 2026 Azar S. Built with React + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}