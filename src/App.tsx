import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Shield, Users, Calendar, Camera, Bus, TrainFront,
  UserCircle2, Headphones, Euro, Mail, Phone, MapPin, ArrowRight, Menu, X, CheckCircle2,
} from "lucide-react";
import heroImgUrl from "@/assets/img/hero-buses.jpg";
import logoUrl from "@/assets/img/logo.png";
import sevImgUrl from "@/assets/img/ersatzverkehr-sev.png";
const heroImg = { url: heroImgUrl };
const logoAsset = { url: logoUrl };
const sevImg = { url: sevImgUrl };

/* ---------- Scroll reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Logo ---------- */
function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 group" aria-label="City Bus Transit GmbH">
      <img
        src={logoAsset.url}
        alt="City Bus Transit GmbH Logo"
        width={160}
        height={48}
        className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        loading="eager"
      />
    </a>
  );
}

/* ---------- Navbar ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#leistungen", label: "Leistungen" },
    { href: "#warum", label: "Warum wir" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(11,30,63,0.15)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between py-3 sm:py-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-navy/80 hover:text-brand transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-brand hover:after:w-full after:transition-all">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#kontakt" className="hidden sm:inline-flex btn-primary text-sm !py-2.5 !px-5">Anfrage</a>
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-fade-up">
          <div className="container-x flex flex-col py-3 gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-navy font-semibold border-b border-slate-100">
                {l.label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)} className="btn-primary justify-center mt-3">Anfrage</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pt-16 sm:pt-20 md:min-h-[100svh] md:flex md:items-center md:pt-24"
    >
      <img
        src={heroImg.url}
        alt="City Bus Transit Busse"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="relative z-0 block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/55 via-white/35 to-transparent md:from-white/95 md:via-white/70 md:to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-white/50 via-transparent to-transparent md:hidden" />

      <div className="absolute inset-0 z-10 flex items-center pt-16 sm:pt-20 md:static md:pt-0">
        <div className="container-x relative w-full py-5 sm:py-8 md:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-brand mb-3 sm:mb-6 animate-fade-up">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Premium Bus-Charter aus Garbsen
            </div>
            <h1 className="animate-fade-up text-3xl sm:text-5xl lg:text-6xl font-black text-navy leading-[1.05] tracking-tight">
              Ihr zuverlässiger
              <br />
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Partner für Busreisen
              </span>
            </h1>
            <p className="mt-3 sm:mt-6 text-sm sm:text-lg text-navy/70 max-w-lg animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Sicher, komfortabel und pünktlich – wir bringen Sie ans Ziel.
            </p>
            <div className="mt-4 sm:mt-8 flex flex-nowrap items-center gap-2 sm:gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <a href="#leistungen" className="btn-primary shrink-0 !text-sm !py-2 !px-3.5 sm:!text-base sm:!py-3.5 sm:!px-6 gap-1.5 sm:gap-2">
                Mehr erfahren <ArrowRight className="size-4 sm:size-[18px]" />
              </a>
              <a href="#kontakt" className="inline-flex items-center shrink-0 px-3 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold text-navy hover:text-brand transition-colors whitespace-nowrap">
                Angebot anfragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
type Service = { icon: ReactNode; title: string; desc: string };
const services: Service[] = [
  { icon: <div className="text-2xl">⚽</div>, title: "Vereinsfahrten", desc: "Gemeinsam unterwegs für Ihren Verein." },
  { icon: <Bus size={28} />, title: "Shuttle-Service", desc: "Zuverlässiger Shuttle für Events und Unternehmen." },
  { icon: <Users size={28} />, title: "Gruppenfahrten", desc: "Für Gruppen jeder Größe die passende Lösung." },
  { icon: <Calendar size={28} />, title: "Eventfahrten", desc: "Sicher zu Konzerten, Messen und Events." },
  { icon: <Camera size={28} />, title: "Tagesfahrten", desc: "Entdecken Sie neue Orte mit unseren Tagesfahrten." },
];

function Services() {
  return (
    <section id="leistungen" className="py-20 sm:py-28 bg-surface">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <div className="text-xs font-bold tracking-[0.25em] text-brand mb-3">UNSERE LEISTUNGEN</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy leading-tight">
            Massgeschneiderte Fahrten für jeden Anlass
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-5">
          {services.map((s, i) => {
            const isLast = i === services.length - 1;
            return (
              <div
                key={s.title}
                className={[
                  "reveal hover-lift group bg-card rounded-2xl p-6 border border-slate-100",
                  isLast
                    ? "col-span-2 lg:col-span-1 flex flex-row lg:flex-col items-center text-left lg:text-center gap-4 lg:gap-0"
                    : "flex flex-col items-center text-center",
                ].join(" ")}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center text-brand group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {s.icon}
                </div>
                <div className={isLast ? "min-w-0 lg:mt-5" : undefined}>
                  <h3 className={`text-sm font-bold tracking-wider text-navy uppercase ${isLast ? "" : "mt-5"}`}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy/60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-10 sm:mt-14 flex justify-center">
          <img
            src={sevImg.url}
            alt="Ersatzverkehr (SEV) – Notverkehr: freundliches Verhalten, pünktlich & zuverlässig, sicher unterwegs"
            className="w-full max-w-2xl lg:w-3/5 lg:max-w-none h-auto rounded-2xl shadow-sm"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Why us ---------- */
const reasons = [
  { icon: <Shield size={22} />, title: "Sichere Fahrt", desc: "Höchste Sicherheitsstandards für Ihre sorgenfreie Reise." },
  { icon: <UserCircle2 size={22} />, title: "Professionelle Fahrer", desc: "Geschult, erfahren und mit höchster Verantwortung." },
  { icon: <Euro size={22} />, title: "Faire Preise", desc: "Transparente Preise ohne versteckte Kosten." },
  { icon: <Headphones size={22} />, title: "Persönlicher Service", desc: "Wir sind für Sie da – vor, während und nach der Fahrt." },
];

function WhyUs() {
  return (
    <section id="warum" className="py-20 sm:py-28 bg-white">
      <div className="container-x">
        <div className="reveal text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-[0.25em] text-brand mb-3">WARUM CITY BUS TRANSIT?</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy leading-tight">
            Zuverlässige Mobilität – jederzeit einsatzbereit.
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-center">
          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.slice(0, 2).map((r, i) => (
              <ReasonCard key={r.title} {...r} delay={i * 100} />
            ))}
            {reasons.slice(2).map((r, i) => (
              <ReasonCard key={r.title} {...r} delay={(i + 2) * 100} />
            ))}
          </div>

          <div className="reveal hidden lg:flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-accent to-[#ff6d00] flex items-center justify-center shadow-[0_20px_50px_-15px_rgba(255,152,0,0.6)] animate-float">
              <TrainFront size={68} className="text-white" />
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-accent/40 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div className="mt-6 text-center">
              <div className="text-xs font-black tracking-[0.2em] text-navy">SCHIENEN</div>
              <div className="text-xs font-black tracking-[0.2em] text-navy">ERSATZ VERKEHR</div>
            </div>
          </div>

          <div className="reveal bg-gradient-to-br from-navy to-navy-deep rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-brand/20 blur-3xl" />
            <div className="relative">
              <h3 className="text-2xl font-black">Ihre Reise beginnt hier</h3>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                Ob kurz oder lang, klein oder groß – wir planen jede Fahrt individuell für Sie.
              </p>
              <ul className="mt-6 space-y-3">
                {["Individuelle Beratung", "Moderne Flotte", "Bundesweit unterwegs"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={18} className="text-brand" /> {t}
                  </li>
                ))}
              </ul>
              <a href="#kontakt" className="mt-8 inline-flex items-center gap-2 text-brand font-bold group">
                Jetzt anfragen <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ icon, title, desc, delay }: { icon: ReactNode; title: string; desc: string; delay: number }) {
  return (
    <div className="reveal flex gap-4" style={{ transitionDelay: `${delay}ms` }}>
      <div className="shrink-0 w-12 h-12 rounded-full border-2 border-brand/20 text-brand flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-navy">{title}</h3>
        <p className="mt-1 text-sm text-navy/60 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  return (
    <section id="kontakt" className="py-20 sm:py-28 bg-gradient-to-b from-surface to-white">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="reveal">
            <div className="text-xs font-bold tracking-[0.25em] text-brand mb-3">KONTAKT</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy leading-tight">
              Planen Sie Ihre nächste Fahrt mit uns!
            </h2>
            <p className="mt-4 text-navy/70 max-w-lg">
              Wir beraten Sie gerne und erstellen Ihnen ein individuelles Angebot.
            </p>

            <div className="mt-8 space-y-4">
              <InfoLine icon={<Mail size={18} />} label="E-Mail" value="info@citybustransit.de" href="mailto:info@citybustransit.de" />
              <InfoLine icon={<Phone size={18} />} label="Telefon" value="+49 511 900 800 00" href="tel:+495119008000" />
              <InfoLine icon={<MapPin size={18} />} label="Adresse" value="Bremer Str 29a, 30827 Garbsen" />
            </div>
          </div>

          <form
            className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-[0_30px_60px_-30px_rgba(11,30,63,0.25)] border border-slate-100"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("sent");
              setTimeout(() => setStatus("idle"), 4000);
              (e.target as HTMLFormElement).reset();
            }}
          >
            <h3 className="text-xl font-black text-navy">Kontaktieren Sie uns</h3>
            <p className="text-sm text-navy/60 mt-1">Antwort innerhalb von 24 Stunden.</p>

            <div className="mt-6 space-y-4">
              <Field label="Name" name="name" required />
              <Field label="E-Mail" name="email" type="email" required />
              <Field label="Telefonnummer" name="phone" type="tel" />
              <Field label="Nachricht" name="message" required textarea />

              <button type="submit" className="btn-accent w-full">
                {status === "sent" ? (
                  <>
                    <CheckCircle2 size={18} /> Nachricht gesendet
                  </>
                ) : (
                  "Senden"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoLine({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const Wrap: any = href ? "a" : "div";
  return (
    <Wrap href={href} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover-lift">
      <div className="w-11 h-11 rounded-full bg-brand text-white flex items-center justify-center shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold tracking-widest text-navy/50 uppercase">{label}</div>
        <div className="font-semibold text-navy truncate">{value}</div>
      </div>
    </Wrap>
  );
}

function Field({
  label, name, type = "text", required, textarea,
}: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean }) {
  const cls =
    "peer w-full rounded-xl border border-slate-200 bg-white px-4 pt-5 pb-2 text-navy placeholder-transparent focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition";
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={name} name={name} required={required} rows={4} placeholder={label} className={cls} />
      ) : (
        <input id={name} name={name} type={type} required={required} placeholder={label} className={cls} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-1.5 text-[11px] font-semibold tracking-wide text-navy/50 uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wide peer-focus:text-brand"
      >
        {label}{required && " *"}
      </label>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x py-12 grid gap-8 md:grid-cols-3">
        <FooterItem icon={<Mail size={20} />} label="info@citybustransit.de" href="mailto:info@citybustransit.de" />
        <FooterItem icon={<Phone size={20} />} label="+49 511 900 800 00" href="tel:+495119008000" />
        <FooterItem icon={<MapPin size={20} />} label={<>Bremer Str 29a<br />30827 Garbsen</>} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} City Bus Transit GmbH. Alle Rechte vorbehalten.</div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center">
            <span>Entwickelt von:</span>
            <a
              href="https://wa.me/93766669569"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 hover:text-brand transition-colors"
              aria-label="Fazilyar über WhatsApp kontaktieren"
            >
              Fazilyar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ icon, label, href }: { icon: ReactNode; label: ReactNode; href?: string }) {
  const Wrap: any = href ? "a" : "div";
  return (
    <Wrap href={href} className="flex items-center gap-4 group">
      <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-sm font-medium text-white/90">{label}</div>
    </Wrap>
  );
}

/* ---------- App ---------- */
export default function App() {
  useReveal();
  const scrollRef = useRef(false);
  useEffect(() => {
    if (scrollRef.current) return;
    scrollRef.current = true;
  }, []);
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}
