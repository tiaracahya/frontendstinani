import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-100 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="mx-auto max-w-screen-xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 py-1 pl-2 pr-4 mb-8 text-sm text-green-900 bg-green-200 rounded-full dark:bg-green-700 dark:text-white"
        >
          <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">Baru</span>
          <span className="font-medium">SiTani kini hadir membantu pengelolaan keuangan petani!</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Manajemen Keuangan Mudah Untuk Petani Desa Sukarami
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          SiTani membantu petani mencatat pemasukan, pengeluaran, serta memantau hasil panen
          dengan lebih rapi dan efisien. Ciptakan pengelolaan keuangan yang lebih baik demi
          kesejahteraan petani desa Sukarami.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button className="px-8 py-3 rounded-2xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition">
            Mulai Sekarang
          </button>
          <button className="px-8 py-3 rounded-2xl border border-green-600 text-green-700 dark:text-green-300 dark:border-green-400 font-semibold hover:bg-green-50 dark:hover:bg-gray-700 transition">
            Pelajari Lebih Lanjut
          </button>
        </motion.div>
      </div>

      {/* Decorative Illustration */}
      <div className="mt-16 flex justify-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src="/images/farmer-illustration.png"
          alt="Ilustrasi Petani"
          className="w-full max-w-3xl drop-shadow-xl"
        />
      </div>
    </section>
  );
}
