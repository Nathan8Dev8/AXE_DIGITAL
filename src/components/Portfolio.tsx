import React from "react";
import { motion } from "framer-motion";
import AppImage from "../image/AppImage";

const projects = [
  {
    name: "Zenae",
    category: "Identité Visuelle",
    image: AppImage.portfolioLyxera,
    color: "bg-green-600",
  },
  {
    name: "Lyxera",
    category: "Branding & Formation",
    image: AppImage.portfolioImage5,
    color: "bg-orange-500",
  },
  {
    name: "Mapa Sarl",
    category: "Supports de Communication",
    image: AppImage.portfolioImage2,
    color: "bg-[#d02e51]",
  },
  {
    name: "Skynesys",
    category: "Support Visuel",
    image: AppImage.portfolioSkynesys,
    color: "bg-[#400fa1]",
  },
  {
    name: "Stream Area",
    category: "Social Media",
    image: AppImage.portfolioImage4,
    color: "bg-[#32c4c5]",
  },
    {
    name: "La Grande Royale",
    category: "Création de Contenu Digital",
    image: AppImage.portfolioLaGrandeRoyale,
    color: "bg-[#3d1a07]",
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="nos-realisations" className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Nos <span className="text-brand-blue">réalisations</span> en IA<br />et solutions numériques
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Des projets concrets qui transforment le quotidien
            des entreprises africaines.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-white text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.name}
                </h3>
                <p className="text-gray-300 text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {project.category}
                </p>
                <div
                  className={`h-1 w-16 ${project.color} mt-4 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100`}
                ></div>
              </div>

              {/* Badge always visible */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                {project.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <button className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
            Voir tous les projets
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Portfolio;
