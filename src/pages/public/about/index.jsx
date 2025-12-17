import React from "react";

function About() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Tentang Kami
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
          <b>Aplikasi Manajemen Keuangan Pabrik Gojong Desa Sukarami</b> adalah sistem 
          yang dirancang untuk membantu proses pencatatan keuangan yang sebelumnya 
          masih dilakukan secara manual. Aplikasi ini memudahkan pencatatan pemasukan, 
          pengeluaran, biaya produksi, dan penyusunan laporan keuangan secara cepat, 
          akurat, dan terstruktur.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
              Misi Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Meningkatkan efisiensi dan akurasi pengelolaan keuangan pabrik gojong 
              melalui sistem digital yang mudah digunakan dan dapat diakses kapan saja.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
              Visi Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Menjadi solusi keuangan berbasis teknologi yang mendukung pengelolaan 
              produksi gojong secara modern dan transparan di Desa Sukarami.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
              Nilai Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Akurasi, transparansi, dan kemudahan penggunaan menjadi dasar dalam 
              pengembangan aplikasi untuk membantu pabrik gojong mengelola keuangan 
              secara lebih profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
