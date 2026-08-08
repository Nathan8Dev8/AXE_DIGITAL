import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppImage from '../image/AppImage';

/**
 * Preloader — Écran de chargement affiché au démarrage du site.
 * Utilise l'image preload.png (/assets/preload.png) comme logo.
 */
const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [windowReady, setWindowReady] = useState(false);

  useEffect(() => {
    // Attend le chargement complet de la page avant de masquer le preloader
    if (document.readyState === 'complete') {
      setWindowReady(true);
    } else {
      const onLoad = () => setWindowReady(true);
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  useEffect(() => {
    if (windowReady) {
      // Petit délai pour laisser le logo s'afficher avant de disparaître
      const timer = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [windowReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          aria-hidden="true"
        >
          <motion.img
            src={AppImage.preload}
            alt="Axe Digital"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-40 w-40 md:h-56 md:w-56 object-contain"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-gray-200"
          >
            <motion.div
              className="h-full rounded-full bg-brand-blue"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
