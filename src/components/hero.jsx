import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-24">
      
      {/* Background Blur Decoration */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-300/30 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-32 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-screen-xl px-6 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2 mb-8 text-sm font-medium text-green-800 bg-white/70 backdrop-blur border border-green-200 rounded-full shadow-sm dark:bg-green-800/30 dark:text-green-100 dark:border-green-700"
        >
          <span className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
            Baru
          </span>
          <span>Solusi keuangan digital untuk petani</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Kelola Keuangan Gojong Pabrik
          <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Lebih Mudah & Teratur
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 max-w-3xl mx-auto text-lg lg:text-xl text-gray-600 dark:text-gray-300"
        >
          <strong>SiTani</strong> membantu Gojong Pabrik di Desa Sukarami mencatat pemasukan,
          pengeluaran, dan hasil panen secara digital agar lebih rapi, efisien,
          dan transparan demi meningkatkan kesejahteraan.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <button className="px-9 py-3 rounded-2xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transition-all">
            Mulai Sekarang
          </button>

          <button className="px-9 py-3 rounded-2xl border border-green-600 text-green-700 dark:text-green-300 dark:border-green-400 font-semibold hover:bg-green-50 dark:hover:bg-gray-700 transition-all">
            Pelajari Lebih Lanjut
          </button>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
        </motion.div>
      </div>
    </section>
  );
}
