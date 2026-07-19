import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  BarChart3,
  Globe,
  Zap,
  Layers,
} from "lucide-react";
import AppImage from "../image/AppImage";
import { openWhatsApp, WHATSAPP_MESSAGES } from "../utils/whatsapp";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0238d6]/10 via-[#0238d6]/5 to-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-[#0238d6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-[#0238d6]/3 rounded-full blur-3xl pointer-events-none" />

      {/* Nouvel élément graphique ajouté - CORRIGÉ */}
      <div className="border-shape-wrapper">
        <img
          src="https://cdn.prod.website-files.com/68f591d26620d8104ef1dae4/68f591d46620d8104ef1dba6_Graph%20(2).png"
          loading="lazy"
          alt="Shape Image"
          className="shape-image"
        />
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-gray-900 mb-8">
            L'<span className="text-brand-blue">I</span>ntelligence artificielle<br />
            au service de votre <span className="text-brand-blue">croissance</span><br />
            en <span className="text-brand-blue">Afrique</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
            Nous concevons des agents IA, applications métiers et solutions
            numériques sur-mesure pour propulser votre organisation
            dans l'ère du digital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 md:mb-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('nous-contacter');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-brand-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Demandez votre audit IA gratuit <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.appel)}
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Passez un appel découverte
            </motion.button>
          </div>
        </motion.div>

        {/* Client Logos / Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full overflow-hidden"
        >
          <h3 className="font-bold text-base sm:text-lg mb-6 sm:mb-8">
            Ils nous font <span className="text-brand-blue">confiance</span>{" "}
          </h3>
          <div className="relative flex overflow-hidden">
            <motion.div
              className="flex items-center gap-8 sm:gap-12 md:gap-20 whitespace-nowrap"
              animate={{
                x: ["-50%", "0%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Premier groupe de logos */}
              <img
                src={AppImage.partenaireCodecCm}
                alt="CODEC"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireLyxera}
                alt="Lyxera"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireSkynesys}
                alt="Skynesys"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireSymphoniSocial}
                alt="Symphoni Social"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireZenaeBrand}
                alt="Zenae Brand"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaire4}
                alt="Stream Area"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />

              {/* Deuxième groupe de logos (copie pour l'effet infini) */}
              <img
                src={AppImage.partenaireCodecCm}
                alt="CODEC"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireLyxera}
                alt="Lyxera"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireSkynesys}
                alt="Skynesys"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireSymphoniSocial}
                alt="Symphoni Social"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaireZenaeBrand}
                alt="Zenae Brand"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={AppImage.partenaire4}
                alt="Stream Area"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Styles CSS pour le nouvel élément - CORRIGÉ */}
      <style jsx>{`
        .border-shape-wrapper {
          z-index: 1;
          pointer-events: none;
          justify-content: flex-end;
          align-items: center;
          max-width: 430px;
          display: flex;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          height: 100%;
          width: 100%;
          max-height: 100vh;
        }

        .shape-image {
          max-width: 100%;
          height: auto;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .border-shape-wrapper {
            max-width: 280px;
            opacity: 0.7;
          }
        }

        @media (max-width: 480px) {
          .border-shape-wrapper {
            max-width: 200px;
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
