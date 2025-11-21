import React from "react";

function About() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Tentang Kami
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
          <b>ByBook</b> adalah platform toko buku online yang menyediakan berbagai koleksi
          buku dari berbagai genre dan penulis terkenal. Kami berkomitmen untuk
          membe produk pertanian yang kami bu 
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
              Misi Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Menyebarkan ilmu dan inspirasi melalui buku serta mempermudah akses
              pembaca ke karya-karya berkualitas di seluruh Indonesia.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
              Visi Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Menjadi platform literasi digital terbaik yang menghubungkan penulis
              dan pembaca dalam satu ekosistem kreatif.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
              Nilai Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Inovasi, Kejujuran, dan Pelayanan yang ramah menjadi dasar dalam setiap
              langkah yang kami ambil untuk memberikan pengalaman terbaik kepada pelanggan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
