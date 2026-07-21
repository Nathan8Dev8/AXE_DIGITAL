import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AppImage from "../image/AppImage";
import { openWhatsApp, WHATSAPP_MESSAGES } from "../utils/whatsapp";

/* ── Floater component ── */
function Floater({ children, y = 12, dur = 4, delay = 0, rotate = 0, style, className }: {
  children: React.ReactNode;
  y?: number;
  dur?: number;
  delay?: number;
  rotate?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      animate={{ y: [0, -y, 0], rotate: [rotate, rotate + 2, rotate] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Typewriter ── */
function useTypewriter(text: string, speed = 38) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() =>
      setN(p => { if (p >= text.length) { clearInterval(id); return p; } return p + 1; }), speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return n;
}

function TypewriterTitle({ n, total }: { n: number; total: number }) {
  const full = "L'Intelligence Artificielle\nau service de votre croissance\nen Afrique";
  // I=2, A=15, croissance=48-58, Afrique=62-69
  const HL = [{ s:2,e:3 },{ s:15,e:16 },{ s:48,e:58 },{ s:62,e:69 }];
  const visible = full.slice(0, n);
  const lines = visible.split("\n");
  const parts: React.ReactNode[] = [];
  let ci = 0;

  lines.forEach((lineText, li) => {
    if (li > 0) parts.push(<br key={`br${li}`} />);
    const lineChars: React.ReactNode[] = [];
    [...lineText].forEach(ch => {
      const abs = ci;
      const hi = HL.some(h => abs >= h.s && abs < h.e);
      lineChars.push(hi ? <span key={ci} className="text-[#0238d6] font-bold">{ch}</span> : <React.Fragment key={ci}>{ch}</React.Fragment>);
      ci++;
    });
    ci++;
    parts.push(
      <span key={`line${li}`} className="inline-block whitespace-nowrap">
        {lineChars}
      </span>
    );
  });

  if (n < total) parts.push(<span key="cur" style={{ color:"#0238d6", animation:"blink .8s step-end infinite", fontWeight:300 }}>|</span>);
  return <>{parts}</>;
}

/* ── Blue bubbles ── */
const BUBBLES = [
  { id:1, sz:13, x:"15%", y:"13%", d:0,   dur:4.1 },
  { id:2, sz:9,  x:"83%", y:"9%",  d:.5,  dur:3.7 },
  { id:3, sz:18, x:"4%",  y:"50%", d:1.0, dur:5.0 },
  { id:4, sz:10, x:"91%", y:"46%", d:.3,  dur:4.4 },
  { id:5, sz:7,  x:"27%", y:"83%", d:1.4, dur:3.5 },
  { id:6, sz:15, x:"69%", y:"80%", d:.8,  dur:4.7 },
  { id:7, sz:6,  x:"50%", y:"6%",  d:1.7, dur:3.3 },
  { id:8, sz:5,  x:"60%", y:"86%", d:2.1, dur:3.2 },
  { id:9, sz:11, x:"38%", y:"89%", d:.6,  dur:4.5 },
];

const ModelViewer = "model-viewer" as any;

/* ── Main Hero Component ── */
const Hero: React.FC = () => {
  const full = "L'Intelligence Artificielle\nau service de votre croissance\nen Afrique";
  const n = useTypewriter(full, 38);

  return (
    <section style={{ position:"relative", minHeight:"100vh", overflow:"hidden" }}
      className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#0238d6]/10 via-[#0238d6]/5 to-white">

      {/* BG blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-[#0238d6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-[#0238d6]/3 rounded-full blur-3xl pointer-events-none" />

      {/* Existing shape */}
      <div className="border-shape-wrapper">
        <img src="https://cdn.prod.website-files.com/68f591d26620d8104ef1dae4/68f591d46620d8104ef1dba6_Graph%20(2).png"
          loading="lazy" alt="" className="shape-image" />
      </div>

      {/* ── Blue bubbles ── */}
      {BUBBLES.map(b => (
        <motion.div key={b.id} style={{
          width:b.sz, height:b.sz, position:"absolute", left:b.x, top:b.y, zIndex:2,
          borderRadius:"50%", pointerEvents:"none",
          background:"radial-gradient(circle at 35% 35%,#5fa8ff,#0238d6)",
          boxShadow:"0 0 10px rgba(2,56,214,.4)",
        }}
          animate={{ y:[0,-12,0], scale:[1,1.1,1], opacity:[.6,1,.6] }}
          transition={{ duration:b.dur, delay:b.d, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
          
          {/* Title Wrapper — Garantie absolue de 3 lignes grâce à inline-block & whitespace-nowrap */}
          <div className="relative block w-full max-w-5xl mx-auto mb-14">
            
            {/* ══ ROBOT 1 — Haut gauche ══ */}
            <Floater y={8} dur={4.0} delay={0} rotate={0} style={{ top: "-60px", left: "-180px", width: "170px", height: "170px", zIndex: 8 }} className="hero-robot-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                style={{ width: "100%", height: "100%" }}
              >
                <ModelViewer
                  src="/assets/agents/robot1.glb"
                  alt="Robot IA Volant 3D"
                  autoplay
                  camera-orbit="-45deg 65deg auto"
                  field-of-view="35deg"
                  shadow-intensity="1"
                  shadow-softness="1"
                  exposure="1.1"
                  style={{ width: "100%", height: "100%", backgroundColor: "transparent", pointerEvents: "none" }}
                />
              </motion.div>
            </Floater>

            {/* ══ ROBOT 2 — Haut droite ══ */}
            <Floater y={8} dur={4.4} delay={0.6} rotate={0} style={{ top: "-20px", right: "-180px", width: "160px", height: "160px", zIndex: 8 }} className="hero-robot-right">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.8, type: "spring" }}
                style={{ width: "100%", height: "100%" }}
              >
                <ModelViewer
                  src="/assets/agents/robot2.glb"
                  alt="Robot IA avec Tablette 3D"
                  autoplay
                  camera-orbit="45deg 70deg auto"
                  field-of-view="35deg"
                  shadow-intensity="1"
                  shadow-softness="1"
                  exposure="1.1"
                  style={{ width: "100%", height: "100%", backgroundColor: "transparent", pointerEvents: "none" }}
                />
              </motion.div>
            </Floater>

            {/* ══ ROBOT 3 — Bas centré (Même taille 170px que Robot 1, reculé à bottom: -130px) ══ */}
            <Floater y={4} dur={3.6} delay={0.3} rotate={0} style={{ bottom: "-130px", left: "50%", transform: "translateX(-50%)", width: "170px", height: "170px", zIndex: 8 }} className="hero-robot-bottom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
                style={{ width: "100%", height: "100%" }}
              >
                <ModelViewer
                  src="/assets/agents/robot3.glb"
                  alt="Robot IA Écrivain 3D"
                  autoplay
                  camera-orbit="0deg 75deg auto"
                  field-of-view="35deg"
                  shadow-intensity="1"
                  shadow-softness="1"
                  exposure="1.1"
                  style={{ width: "100%", height: "100%", backgroundColor: "transparent", pointerEvents: "none" }}
                />
              </motion.div>
            </Floater>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight leading-[1.15] text-gray-900">
              <TypewriterTitle n={n} total={full.length} />
            </h1>
          </div>

          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed relative z-10 pt-2">
            Nous concevons des agents IA, applications métiers et solutions
            numériques sur-mesure pour propulser votre organisation dans l'ère du digital.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 md:mb-20 relative z-10">
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}
              onClick={() => document.getElementById('nous-contacter')?.scrollIntoView({ behavior:'smooth' })}
              className="bg-brand-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              Demandez votre audit IA gratuit <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.appel)}
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
              Passez un appel découverte
            </motion.button>
          </div>
        </motion.div>

        {/* Logos */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4, duration:.8 }} className="w-full overflow-hidden">
          <h3 className="font-bold text-base sm:text-lg mb-6 sm:mb-8">Ils nous font <span className="text-brand-blue">confiance</span>{" "}</h3>
          <div className="relative flex overflow-hidden">
            <motion.div className="flex items-center gap-8 sm:gap-12 md:gap-20 whitespace-nowrap"
              animate={{ x:["-50%","0%"] }} transition={{ x:{ repeat:Infinity, repeatType:"loop", duration:20, ease:"linear" } }}>
              {[AppImage.partenaireCodecCm, AppImage.partenaireLyxera, AppImage.partenaireSkynesys,
                AppImage.partenaireSymphoniSocial, AppImage.partenaireZenaeBrand, AppImage.partenaire4,
                AppImage.partenaireCodecCm, AppImage.partenaireLyxera, AppImage.partenaireSkynesys,
                AppImage.partenaireSymphoniSocial, AppImage.partenaireZenaeBrand, AppImage.partenaire4,
              ].map((src, i) => <img key={i} src={src} alt="" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />)}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .border-shape-wrapper{z-index:1;pointer-events:none;display:flex;justify-content:flex-end;align-items:center;max-width:430px;position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;height:100%;width:100%;max-height:100vh;}
        .shape-image{max-width:100%;height:auto;position:absolute;right:0;top:50%;transform:translateY(-50%);object-fit:contain;}
        @media(max-width:768px){.border-shape-wrapper{max-width:280px;opacity:.7;}}
        @media(max-width:480px){.border-shape-wrapper{max-width:200px;opacity:.5;}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

        /* Responsive adaptation for 3D robots */
        @media(max-width:1200px){
          :global(.hero-robot-left){
            left: -110px !important;
            width: 140px !important;
            height: 140px !important;
          }
          :global(.hero-robot-right){
            right: -110px !important;
            width: 140px !important;
            height: 140px !important;
          }
        }
        @media(max-width:960px){
          :global(.hero-robot-left), :global(.hero-robot-right){
            display: none !important;
          }
        }
        @media(max-width:640px){
          :global(.hero-robot-bottom){
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
