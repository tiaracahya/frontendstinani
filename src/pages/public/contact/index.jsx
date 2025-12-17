import React from "react";
import { Instagram, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const contacts = [
    {
      title: "Instagram BEM POLSRI",
      type: "Instagram",
      value: "@bempolsri_",
      link: "https://www.instagram.com/bempolsri_/",
      icon: Instagram,
      gradient: "from-pink-500 via-purple-500 to-indigo-500",
    },
    {
      title: "Website BEM POLSRI",
      type: "Website",
      value: "bem.polsri.ac.id",
      link: "https://bem.polsri.ac.id/",
      icon: Globe,
      gradient: "from-indigo-600 to-blue-500",
    },
    {
      title: "Instagram BEMBERDAMPAK POLSRI",
      type: "Instagram",
      value: "@bemberdampa.polsri",
      link: "https://www.instagram.com/bemberdampak.polsri/",
      icon: Instagram,
      gradient: "from-orange-500 via-rose-500 to-pink-500",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* background blur */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />

      <div className="relative w-full max-w-6xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Hubungi dan ikuti BEM POLSRI serta BEMBERDAMPAK POLSRI melalui platform resmi kami.
          </p>
        </motion.div>

        {/* contact cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all"
              >
                {/* top accent */}
                <div className={`h-1 rounded-t-3xl bg-gradient-to-r ${item.gradient}`} />

                <div className="p-8 flex flex-col items-center text-center h-full">
                  <div className="p-4 rounded-2xl bg-gray-100 mb-5">
                    <Icon className="w-7 h-7 text-gray-800" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{item.type}</p>

                  <p className="text-gray-600 font-medium mb-8">{item.value}</p>

                  <span
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${item.gradient} group-hover:opacity-90 transition`}
                  >
                    Visit {item.type}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
