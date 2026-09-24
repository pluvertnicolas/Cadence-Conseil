"use client";

import { useState, useEffect, useRef } from "react";

const PHOTO_SRC = "/nicolas-pluvert.jpg";

const SECTIONS = ["accueil", "apropos", "offres", "realisations", "ecosysteme", "parcours", "contact"];
const NAV_LABELS = { accueil: "Accueil", apropos: "À propos", offres: "Offres", ecosysteme: "Écosystème", parcours: "Parcours", realisations: "Réalisations", contact: "Contact" };

const PACKAGES = [
  { id: "audit", n: "01", title: "Audit & Stratégie Média", sub: "Point de départ", desc: "Diagnostic complet de votre écosystème média. Mix canal, performances, outils, organisation. Livrable : recommandation stratégique actionnable avec plan d'action priorisé.", deliverables: ["Audit de l'existant (mix média, KPIs, outils)", "Benchmark sectoriel", "Recommandation stratégique", "Plan d'action priorisé"], ideal: "Agences, régies et ad tech qui veulent un regard extérieur senior avant d'engager des budgets ou de revoir leur organisation.", format: "Mission courte, 2 à 4 semaines" },
  { id: "pilotage", n: "02", title: "Pilotage & Performance", sub: "Exécution maîtrisée", desc: "Coordination de vos dispositifs multicanaux, display, vidéo, CTV, DOOH, social. J'élabore les plans, j'anime les équipes trading et assure le suivi des KPIs de bout en bout.", deliverables: ["Plan média multicanaux", "Coordination des équipes trading", "Suivi de performance en continu", "Reporting et recommandations d'optimisation"], ideal: "Agences et ad tech avec des campagnes actives qui manquent de bande passante.", format: "Temps partagé, 2 à 3 jours par semaine" },
  { id: "relation", n: "03", title: "Relation Client & Satisfaction", sub: "Avantage structurel", desc: "Structuration de vos process de suivi client : rituels, indicateurs de satisfaction, formation des équipes. Transformer la relation client en levier de rétention.", deliverables: ["Audit des process CSM existants", "Rituels clients (kick-off, bilans, post-mortem)", "Indicateurs NPS et NRR", "Formation et coaching des équipes"], ideal: "Agences et ad tech qui veulent réduire le churn et augmenter la valeur client.", format: "Mission de 1 à 3 mois" },
  { id: "conseil", n: "04", title: "Conseil & Développement d'Offre", sub: "Croissance structurée", desc: "Accompagnement stratégique sur votre positionnement, l'évolution de vos offres et l'identification de partenariats à valeur. Une perspective externe senior, nourrie de 10 ans de terrain en agence et ad tech.", deliverables: ["Analyse de positionnement", "Stratégie d'évolution d'offre", "Identification de partenariats stratégiques", "Business plan et roadmap"], ideal: "Agences ou ad tech en phase de structuration ou de pivot stratégique.", format: "Accompagnement mensuel" },
  { id: "ops", n: "05", title: "Process & Automatisation IA", sub: "Opérations augmentées", desc: "Audit de vos process sales, supply, opérations et CSM, puis mise en place d'outils agentiques dans chaque pôle et entre les pôles. Objectif : harmoniser les process et libérer du temps pour les équipes commerciales et opérations.", deliverables: ["Audit des process et irritants par pôle", "Cartographie des tâches automatisables", "Workflows IA déployés et documentés", "Adoption et formation des équipes"], ideal: "Ad tech, régies et agences dont les équipes passent trop de temps sur des tâches répétitives.", format: "Audit puis déploiement, 1 à 3 mois" },
];

const REALISATIONS = [
  {
    title: "Harmonisation des process média",
    ctx: "Olyzon · 2026",
    result: "<3 mois",
    resultLabel: "PROCESS MÉDIA AUTOMATISÉS",
    desc: "Mission Supply & Operations pour Olyzon, plateforme de decisioning CTV (US et Europe). Mise en place d'outils agentiques pour harmoniser et automatiser les process : génération des médiaplans et inclusion lists, suivi des briefs, relances et statuts. Objectif : fluidifier la création des plans média pour les équipes commerciales et opérations."
  },
  {
    title: "Lancement NOVO19",
    ctx: "Olyn Group · 2025",
    result: "1,45M€",
    resultLabel: "BUDGET PRÉVISIONNEL",
    desc: "En charge de la stratégie média globale pour l'appel d'offre de lancement de NOVO19, nouvelle chaîne TNT nationale. Élaboration des media outlines, construction du mix média, adaptation budgétaire par diffuseur et estimation des reach par phase. Stratégie en 4 temps, 6 leviers, 62M de reach cumulé. Appel d'offre remporté."
  },
  {
    title: "Commission européenne",
    ctx: "Mozoo · 2023·2025",
    result: "3,05M€",
    resultLabel: "BUDGET GÉRÉ",
    desc: "Élaboration et supervision du plan média dans les 27 pays de l'UE. Mix canaux, sélection éditeurs, partenariats tech pour la visibilité et la brand safety, brand lift survey. Budget passé de 450K€ en 2023 à 1,4M€ en 2025 grâce à la qualité opérationnelle et la relation client."
  },
  {
    title: "Offre attention garantie",
    ctx: "Mozoo · 2023·2025",
    result: "40%",
    resultLabel: "CPM ATTENTIF EN MOINS",
    desc: "Co-construction d'une offre pionnière avec DoubleVerify. Pilotage sur des indicateurs d'attention et de qualité média (viewability, brand safety, ad fraud) permettant une baisse significative du CPM attentif. Facturation sur impressions authentiques uniquement."
  },
  {
    title: "Offre CTV",
    ctx: "Mozoo · 2023·2025",
    result: "0→1",
    resultLabel: "OFFRE CONSTRUITE",
    desc: "Lancement d'une offre CTV inédite pour Mozoo sur un marché en pleine structuration, représentant 49% du display vidéo en France. Construction des partenariats diffuseurs (SVOD, IPTV, OTT), élaboration des plans média et adaptation de l'offre aux usages du digital vidéo."
  },
  {
    title: "Lancement offre vidéo",
    ctx: "Mozoo · 2022·2024",
    result: "+50%",
    resultLabel: "CA MÉDIA",
    desc: "Conception et déploiement d'une offre vidéo complète avec partenariats éditeurs premium (StampTV, M6+, MyCanal), structuration du pricing et go-to-market. Devenu le 1er levier de croissance de l'agence."
  },
  {
    title: "Automatisation plan média",
    ctx: "Mozoo · 2024·2025",
    result: "IA",
    resultLabel: "BRIEF→PM",
    desc: "Conception d'un workflow automatisé via Trello et intégration d'un LLM (ChatGPT) pour transformer un brief client en recommandations de ciblage, insights audience et première version de plan média. Rédaction des prompts, coordination technique, déploiement auprès des équipes. Personnalisation accrue et standardisation de la qualité à l'échelle."
  },
];

const MILESTONES = [
  { year: "2026", role: "Consultant Supply & Operations", co: "Olyzon · Mission freelance", desc: "Plateforme de decisioning CTV. Harmonisation et automatisation des process média via des outils agentiques, pour fluidifier la création des plans média des équipes commerciales et opérations.", current: true },
  { year: "2025", role: "Fondateur", co: "Cadence Conseil", desc: "Lancement de Cadence Conseil. Accompagnement d'agences, d'annonceurs et d'acteurs ad tech sur la stratégie média et la relation client.", current: true },
  { year: "2024", role: "Directeur du Planning et de la Stratégie Média", co: "Olyn Group · Mozoo", desc: "+5M€ budget, 250+ campagnes/an, 8 pers." },
  { year: "2023", role: "Directeur des Opérations", co: "Mozoo", desc: "Partenariats ad tech, lancement offre vidéo." },
  { year: "2019", role: "Directeur de Projets CSM", co: "Mozoo", desc: "+10% CA annuel, NRR >110%." },
  { year: "2017", role: "Key Account Manager", co: "Mozoo", desc: "Portefeuilles clients agences et annonceurs." },
];

const CLIENTS = { "Big 6": ["Havas","Publicis","GroupM WPP","Dentsu","Omnicom","IPG"], "Agences indép.": ["Artefact","Space","Mazarine Digitale"], "Annonceurs": ["Deezer","Chanel","Cdiscount","Commission européenne","ALL Accor"], "Ad tech": ["Olyzon"] };
const PARTNERSHIPS = { "Tech": ["XPLN","DoubleVerify","Greenbids","Celtra","Supplyfinder","Adform","Hawk","Adsquare"], "Data": ["LiveRamp","Implicit","Zeotap","Sirdata","First ID"], "Supply": ["Condé Nast","CMI","Prisma Media","Régie Le Figaro","StampTV","Olyzon","366"], "RSE": ["Scope3","AdForGood"] };

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const v = entries.filter(e => e.isIntersecting);
      if (v.length) setActive(v[0].target.id);
    }, { threshold: 0.15, rootMargin: "-60px 0px -40% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(16px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
    }}>{children}</div>
  );
}

export default function NPConsultingV6() {
  const active = useScrollSpy(SECTIONS);
  const [expPkg, setExpPkg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "'Barlow Condensed', 'Helvetica Neue', sans-serif", background: "#EEECE8", color: "#111", minHeight: "100vh", overflowX: "hidden" }}>

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        ::selection { background:#3D6B5E; color:#EEECE8; }

        .nav {
          position:fixed; top:0; left:0; right:0; z-index:100;
          padding:20px 0; transition:all 0.4s;
          mix-blend-mode: normal;
        }
        .nav.sc { background:rgba(238,236,232,0.97); backdrop-filter:blur(12px); border-bottom:1px solid rgba(17,17,17,0.08); padding:14px 0; }
        .ni { max-width:1400px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding:0 48px; }
        .logo {
          font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800;
          letter-spacing:4px; text-transform:uppercase; cursor:pointer; color:#111;
          line-height:1;
        }
        .nl { display:flex; gap:28px; align-items:center; }
        .nlink {
          font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700;
          letter-spacing:2.5px; text-transform:uppercase; color:rgba(17,17,17,0.45);
          cursor:pointer; border:none; background:none; padding:4px 0;
          transition:color 0.2s; position:relative;
        }
        .nlink:hover,.nlink.act { color:#111; }
        .nlink.act::after { content:''; position:absolute; bottom:-3px; left:0; width:100%; height:2px; background:#3D6B5E; }
        .hbg { display:none; background:none; border:none; cursor:pointer; flex-direction:column; gap:5px; }
        .hbg span { display:block; width:24px; height:2px; background:#131411; }
        .mm { display:none; position:fixed; inset:0; background:#EEECE8; padding:100px 48px; flex-direction:column; gap:20px; z-index:99; }
        .mm.open { display:flex; }

        @media (max-width:900px) {
          .nl { display:none !important; }
          .hbg { display:flex; }
          .w { padding-left:24px !important; padding-right:24px !important; }
          .hero-h1 { font-size:clamp(64px,16vw,120px) !important; }
          .ab-grid { grid-template-columns:1fr !important; }
          .pkg-grid { grid-template-columns:1fr !important; }
          .eco-grid { grid-template-columns:1fr !important; }
          .real-grid { grid-template-columns:1fr !important; }
          .stats-r { grid-template-columns:repeat(2,1fr) !important; }
        }

        .w { max-width:1400px; margin:0 auto; padding:0 48px; }

        /* MARQUEE */
        .marquee-wrap { overflow:hidden; white-space:nowrap; border-top:2px solid #111; border-bottom:2px solid #111; padding:12px 0; background:#3D6B5E; }
        .marquee-track { display:inline-flex; gap:0; animation: marquee 18s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .marquee-item { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:800; letter-spacing:4px; text-transform:uppercase; color:#EEECE8; padding:0 40px; }
        .marquee-dot { color:rgba(238,236,232,0.4); padding:0; }

        .tag { font-family:'Barlow Condensed',sans-serif; font-size:11px; letter-spacing:5px; text-transform:uppercase; font-weight:700; color:#3D6B5E; margin-bottom:16px; }
        .h2 {
          font-family:'Barlow Condensed',sans-serif;
          font-size:clamp(56px,7vw,96px); font-weight:800;
          line-height:0.9; letter-spacing:-1px; margin-bottom:24px;
          text-transform:uppercase; color:#111;
        }
        .body-text { font-family:'Barlow',sans-serif; font-size:15px; line-height:1.75; color:rgba(17,17,17,0.6); }

        .btn {
          display:inline-flex; align-items:center; gap:12px;
          padding:14px 32px; background:#131411; color:#EEECE8;
          border:none; font-family:'Barlow Condensed',sans-serif; font-size:13px;
          font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; transition:all 0.25s; text-decoration:none;
        }
        .btn:hover { background:#3D6B5E; }
        .btn-ghost {
          display:inline-flex; align-items:center; gap:12px;
          padding:12px 32px; background:transparent; color:#111;
          border:2px solid #111; font-family:'Barlow Condensed',sans-serif; font-size:13px;
          font-weight:700; letter-spacing:3px; text-transform:uppercase;
          cursor:pointer; transition:all 0.25s;
        }
        .btn-ghost:hover { background:#131411; color:#EEECE8; }

        /* BIG NUMBER display */
        .big-num {
          font-family:'Barlow Condensed',sans-serif;
          font-size:clamp(80px,12vw,160px);
          font-weight:900; line-height:0.85; letter-spacing:-3px;
          color:#3D6B5E; display:block;
        }

        .pkg-item {
          border-top:2px solid #111; padding:28px 0; cursor:pointer;
          transition:background 0.2s;
        }
        .pkg-item:last-child { border-bottom:2px solid #111; }
        .pkg-item:hover { background:rgba(61,107,94,0.05); }
        .pkg-item.open { background:rgba(61,107,94,0.04); }

        .pill {
          display:inline-block; padding:5px 14px;
          border:1.5px solid rgba(17,17,17,0.15);
          font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:600;
          letter-spacing:1px; text-transform:uppercase; color:rgba(17,17,17,0.55);
          transition:all 0.2s;
        }
        .pill:hover { border-color:#3D6B5E; color:#3D6B5E; }

        .tl-row {
          display:flex; gap:40px; padding:24px 0;
          border-top:1px solid rgba(17,17,17,0.1);
        }
        .tl-row:last-child { border-bottom:1px solid rgba(17,17,17,0.1); }

        .real-card {
          border:2px solid #111; padding:40px; background:#fff;
          transition:all 0.3s; position:relative;
          display:flex; flex-direction:column; height:100%;
        }
        .real-span { grid-column:1 / -1; }
        .real-card:hover { background:#131411; color:#EEECE8; }
        .real-card:hover .real-label { color:rgba(238,236,232,0.4); }
        .real-card:hover .real-num { color:#3D6B5E; }
        .real-card:hover .real-title { color:#EEECE8; }
        .real-card:hover .real-desc { color:rgba(238,236,232,0.55); }
        .real-card:hover .real-ctx { color:rgba(238,236,232,0.3); }

        .footer { border-top:2px solid #111; padding:40px 0; background:#EEECE8; }
        .footer a { color:rgba(17,17,17,0.5); text-decoration:none; transition:color 0.2s; }
        .footer a:hover { color:#3D6B5E; }

        .section-dark { background:#131411; color:#EEECE8; }
        .section-dark .tag { color:#3D6B5E; }
        .section-dark .h2 { color:#EEECE8; }
        .section-dark .body-text { color:rgba(238,236,232,0.5); }
        .section-dark .tl-row { border-color:rgba(238,236,232,0.1); }
        .section-dark .pill { border-color:rgba(238,236,232,0.15); color:rgba(238,236,232,0.45); }
        .section-dark .pill:hover { border-color:#3D6B5E; color:#3D6B5E; }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "sc" : ""}`}>
        <div className="ni">
          <div className="logo" onClick={() => go("accueil")}>CADENCE</div>
          <div className="nl">
            {SECTIONS.map(s => (
              <button key={s} className={`nlink ${active === s ? "act" : ""}`} onClick={() => go(s)}>{NAV_LABELS[s]}</button>
            ))}
          </div>
          <button className="hbg" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
        <div className={`mm ${menuOpen ? "open" : ""}`}>
          {SECTIONS.map(s => (
            <button key={s} className="nlink" onClick={() => go(s)} style={{ fontSize:20, textAlign:"left" }}>{NAV_LABELS[s]}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="accueil" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", paddingBottom:0, paddingTop:80 }}>
        <div className="w" style={{ paddingBottom:48 }}>
          <Reveal>
            <div className="tag">Consultant indépendant · Bordeaux</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="hero-h1" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(80px,14vw,176px)", fontWeight:900, lineHeight:0.88, letterSpacing:"-3px", marginBottom:0, textTransform:"uppercase", color:"#111", maxWidth:1200 }}>
              STRATÉGIE<br />
              <span style={{ color:"#3D6B5E", fontStyle:"italic" }}>MÉDIA</span><br />
              & OPÉRATIONS
            </h1>
          </Reveal>
        </div>

        {/* MARQUEE */}
        <Reveal delay={0.15}>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {Array(2).fill(["Stratégie média","Performance","Relation client","Pilotage multicanaux","Supply CTV","Process & IA","Cadence Conseil","Bordeaux · Paris","10 ans d'expérience","Display · Vidéo · CTV · DOOH"]).flat().map((item, i) => (
                <span key={i} className="marquee-item">{item} <span className="marquee-dot">·</span></span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="w" style={{ paddingTop:48, paddingBottom:64 }}>
          <Reveal delay={0.2}>
            <div style={{ display:"flex", gap:64, alignItems:"flex-start", flexWrap:"wrap" }}>
              <p className="body-text" style={{ maxWidth:440 }}>
                10 ans en agence digitale parisienne, à piloter des stratégies média multicanaux et des équipes opérationnelles. +5M€ de budget média géré par an, +250 campagnes coordonnées, des clients qui restent et une croissance qui se mesure.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", paddingTop:2 }}>
                <button className="btn" onClick={() => go("contact")}>Discutons →</button>
                <button className="btn-ghost" onClick={() => go("offres")}>Offres</button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="stats-r" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, marginTop:80, paddingTop:40, borderTop:"2px solid #111" }}>
              {[
                { v:"10+", l:"Années" },
                { v:"5M€+", l:"Budget / an" },
                { v:"250+", l:"Campagnes / an" },
                { v:">110%", l:"NRR" },
              ].map((s, i) => (
                <div key={i} style={{ padding:"0 0 0 40px", borderLeft: i === 0 ? "none" : "1px solid rgba(17,17,17,0.1)" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(40px,5vw,64px)", fontWeight:900, lineHeight:1, color:"#111", letterSpacing:"-1px" }}>{s.v}</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, color:"rgba(17,17,17,0.45)", letterSpacing:3, textTransform:"uppercase", fontWeight:700, marginTop:4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="apropos" style={{ padding:"120px 0", background:"#111", color:"#EEECE8" }}>
        <div className="w">
          <div className="ab-grid" style={{ display:"grid", gridTemplateColumns:"400px 1fr", gap:80, alignItems:"start" }}>
            <Reveal>
              <div style={{ position:"sticky", top:100 }}>
                <div style={{ position:"relative", overflow:"hidden" }}>
                  <img
                    src={PHOTO_SRC}
                    alt="Nicolas Pluvert"
                    style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", objectPosition:"center top", display:"block", filter:"grayscale(100%) contrast(1.1)" }}
                  />
                  {/* Overlay with name */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"24px", background:"linear-gradient(to top, rgba(17,17,17,0.95), transparent)" }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:4, textTransform:"uppercase", color:"#3D6B5E", fontWeight:700, marginBottom:4 }}>Fondateur</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:800, letterSpacing:1, textTransform:"uppercase", color:"#EEECE8" }}>Nicolas Pluvert</div>
                  </div>
                </div>
                <div style={{ marginTop:24, display:"flex", flexWrap:"wrap", gap:6 }}>
                  {["SKEMA Business School","Bucks New University","IUT Paul Sabatier"].map((f, i) => (
                    <span key={i} className="pill" style={{ borderColor:"rgba(238,236,232,0.15)", color:"rgba(238,236,232,0.4)" }}>{f}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <div className="tag">À propos</div>
                <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(48px,6vw,80px)", fontWeight:900, lineHeight:0.9, letterSpacing:"-1px", textTransform:"uppercase", color:"#EEECE8", marginBottom:32 }}>
                  CONSULTANT<br />
                  <span style={{ color:"#3D6B5E", fontStyle:"italic" }}>MÉDIA & OPS</span>
                </h2>
                <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:400, fontStyle:"italic", lineHeight:1.4, color:"rgba(238,236,232,0.6)", marginBottom:28, maxWidth:500 }}>
                  Ex directeur de la stratégie média, j'interviens sur l'ensemble du dispositif : de la recommandation au pilotage, jusqu'à l'organisation des équipes qui l'exécutent.
                </p>
                <p className="body-text" style={{ color:"rgba(238,236,232,0.5)", marginBottom:20 }}>
                  D'account manager à directeur de la stratégie média et des opérations, j'ai construit mon expertise autour de la relation client, de la connaissance accrue de l'écosystème média, du pilotage de budget média et de la structuration d'équipe.
                </p>
                <p className="body-text" style={{ color:"rgba(238,236,232,0.5)", marginBottom:40 }}>
                  Entre Bordeaux et Paris, j'accompagne acteurs ad tech, régies et agences, avec un objectif commun : gagner en efficacité sur les dispositifs média, les opérations et la relation client.
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["Stratégie média","Pilotage multicanaux","Relation client CSM","Performance reporting","Développement d'offre","Partenariats ad tech","Supply CTV","Automatisation IA","Management d'équipe","Recrutement","Gouvernance & board"].map((c, i) => (
                    <span key={i} className="pill" style={{ borderColor:"rgba(238,236,232,0.15)", color:"rgba(238,236,232,0.4)" }}>{c}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" style={{ padding:"120px 0" }}>
        <div className="w">
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:24, marginBottom:48 }}>
              <div>
                <div className="tag">Services</div>
                <h2 className="h2">OFFRES</h2>
              </div>
              <p className="body-text" style={{ maxWidth:360, textAlign:"right" }}>
                5 offres modulables. Chaque mission commence par un échange de cadrage sans engagement.
              </p>
            </div>
          </Reveal>
          <div>
            {PACKAGES.map((pkg, i) => {
              const isOpen = expPkg === pkg.id;
              return (
                <Reveal key={pkg.id} delay={i * 0.04}>
                  <div className={`pkg-item ${isOpen ? "open" : ""}`} onClick={() => setExpPkg(isOpen ? null : pkg.id)}>
                    <div style={{ display:"flex", gap:32, alignItems:"flex-start" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:800, letterSpacing:2, color: isOpen ? "#3D6B5E" : "rgba(17,17,17,0.2)", minWidth:48, paddingTop:8, transition:"color 0.3s" }}>{pkg.n}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                          <div>
                            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"rgba(17,17,17,0.4)", marginBottom:4 }}>{pkg.sub}</div>
                            <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(28px,4vw,40px)", fontWeight:800, textTransform:"uppercase", letterSpacing:"-0.5px", lineHeight:1 }}>{pkg.title}</h3>
                          </div>
                          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, letterSpacing:3, fontWeight:700, color: isOpen ? "#3D6B5E" : "rgba(17,17,17,0.3)", transition:"color 0.3s", paddingTop:8, textTransform:"uppercase" }}>
                            {isOpen ? "FERMER ↑" : "VOIR →"}
                          </div>
                        </div>
                        <div style={{ maxHeight: isOpen ? 800 : 0, overflow:"hidden", transition:"max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s", opacity: isOpen ? 1 : 0 }}>
                          <p className="body-text" style={{ marginTop:20, marginBottom:20 }}>{pkg.desc}</p>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:8, marginBottom:16 }}>
                            {pkg.deliverables.map((d, j) => (
                              <div key={j} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                                <span style={{ color:"#3D6B5E", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:14, marginTop:1, flexShrink:0 }}>→</span>
                                <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, lineHeight:1.6, color:"rgba(17,17,17,0.6)" }}>{d}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:"rgba(17,17,17,0.45)", fontStyle:"italic", paddingTop:16, borderTop:"1px solid rgba(17,17,17,0.08)" }}>
                            Pour qui : {pkg.ideal}
                          </div>
                          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#3D6B5E", paddingTop:10 }}>
                            Format : {pkg.format}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section id="realisations" style={{ padding:"120px 0", background:"#111", color:"#EEECE8" }}>
        <div className="w">
          <Reveal>
            <div className="tag">Portfolio</div>
            <h2 className="h2" style={{ color:"#EEECE8" }}>RÉALISATIONS</h2>
          </Reveal>
          <div className="real-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:1, background:"rgba(238,236,232,0.08)", marginTop:48, alignItems:"stretch" }}>
            {REALISATIONS.map((r, i) => (
              <Reveal key={i} delay={i * 0.08} className={REALISATIONS.length % 2 && i === REALISATIONS.length - 1 ? "real-span" : ""}>
                <div className="real-card" style={{ background:"#111", borderColor:"rgba(238,236,232,0.1)" }}>
                  <div className="real-ctx" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"rgba(238,236,232,0.3)", marginBottom:24, transition:"color 0.3s" }}>{r.ctx}</div>
                  <div className="real-num" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(64px,8vw,96px)", fontWeight:900, color:"#3D6B5E", lineHeight:0.85, letterSpacing:"-2px", marginBottom:4, transition:"color 0.3s" }}>{r.result}</div>
                  <div className="real-label" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:4, textTransform:"uppercase", color:"rgba(238,236,232,0.4)", marginBottom:24, fontWeight:700, transition:"color 0.3s" }}>{r.resultLabel}</div>
                  <h4 className="real-title" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:26, fontWeight:800, textTransform:"uppercase", letterSpacing:"-0.3px", color:"#EEECE8", marginBottom:12, transition:"color 0.3s" }}>{r.title}</h4>
                  <p className="real-desc body-text" style={{ fontSize:13, color:"rgba(238,236,232,0.5)", transition:"color 0.3s" }}>{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ÉCOSYSTÈME */}
      <section id="ecosysteme" style={{ padding:"120px 0" }}>
        <div className="w">
          <Reveal>
            <div className="tag">Écosystème</div>
            <h2 className="h2">CLIENTS &<br />PARTENARIATS</h2>
          </Reveal>
          <div className="eco-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, marginTop:48 }}>
            <Reveal>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:800, letterSpacing:4, textTransform:"uppercase", borderBottom:"2px solid #111", paddingBottom:12, marginBottom:32 }}>Clients accompagnés</div>
                {Object.entries(CLIENTS).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom:28 }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#3D6B5E", fontWeight:700, marginBottom:10 }}>{cat}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {items.map((it, j) => <span key={j} className="pill">{it}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:800, letterSpacing:4, textTransform:"uppercase", borderBottom:"2px solid #111", paddingBottom:12, marginBottom:32 }}>Partenariats développés</div>
                {Object.entries(PARTNERSHIPS).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom:28 }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#3D6B5E", fontWeight:700, marginBottom:10 }}>{cat}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {items.map((it, j) => <span key={j} className="pill">{it}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section id="parcours" style={{ padding:"120px 0", background:"#111", color:"#EEECE8" }}>
        <div className="w">
          <Reveal>
            <div className="tag">Expérience</div>
            <h2 className="h2" style={{ color:"#EEECE8" }}>PARCOURS</h2>
          </Reveal>
          <div style={{ maxWidth:800, marginTop:48 }}>
            {MILESTONES.map((m, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="tl-row" style={{ borderColor:"rgba(238,236,232,0.08)" }}>
                  <div style={{ minWidth:72 }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:26, fontWeight:900, color: m.current ? "#3D6B5E" : "rgba(238,236,232,0.2)", letterSpacing:"-0.5px" }}>{m.year}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.3px", color:"#EEECE8", marginBottom:2 }}>{m.role}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, color:"#3D6B5E", letterSpacing:3, textTransform:"uppercase", marginBottom:8, fontWeight:700 }}>{m.co}</div>
                    <div className="body-text" style={{ fontSize:13, color:"rgba(238,236,232,0.45)" }}>{m.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"120px 0" }}>
        <div className="w">
          <Reveal>
            <div className="tag">Contact</div>
            <h2 className="h2" style={{ fontSize:"clamp(64px,10vw,140px)" }}>
              TRAVAILLONS<br />
              <span style={{ color:"#3D6B5E", fontStyle:"italic" }}>ENSEMBLE.</span>
            </h2>
            <p className="body-text" style={{ maxWidth:440, marginBottom:48 }}>
              Premier appel de cadrage sans engagement. Je reviens sous 24h.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
              <a href="mailto:pluvertnicolas@gmail.com" className="btn" style={{ textDecoration:"none" }}>
                pluvertnicolas@gmail.com →
              </a>
            </div>
            <div style={{ display:"flex", gap:32, flexWrap:"wrap", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:"rgba(17,17,17,0.4)" }}>
              <span>+33 6 69 66 70 34</span>
              <a href="https://www.linkedin.com/in/nicolas-pluvert" target="_blank" rel="noopener" style={{ color:"rgba(17,17,17,0.4)", textDecoration:"none", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color="#3D6B5E"} onMouseLeave={e=>e.target.style.color="rgba(17,17,17,0.4)"}>LinkedIn →</a>
              <span>Bordeaux, France</span>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="w" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900, letterSpacing:4, textTransform:"uppercase" }}>CADENCE</div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, color:"rgba(17,17,17,0.4)", letterSpacing:2, textTransform:"uppercase" }}>© {new Date().getFullYear()} Nicolas Pluvert</div>
        </div>
      </footer>
    </div>
  );
}
