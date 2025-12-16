"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import Logo from "@/assets/images/logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const WelcomePage = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleSignup = () => {
    router.push("/auth/signup");
  };
  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden">
      {/* --- STICKY HEADER --- */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 ">
              <NextImage
                src={Logo}
                alt="URDS Logo"
                className="w-full h-full object-contain"
                priority
              />
            
            </div>
            <span
              className={`font-black tracking-tighter text-2xl ${
                isScrolled ? "text-slate-900" : "text-blue-900"
              }`}
            >
              URDS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-600">
            <a
              href="/urds/home"
              className="text-blue-600 font-black transition-colors"
            >
              Home
            </a>
            <a
              href="/urds/about"
              className="hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Services
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogin}
              className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-6 md:px-20 pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="z-20 text-center lg:text-left"
          >
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              Welcome to URDS
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-black mt-6 mb-6 text-slate-900 leading-[1.1] tracking-tight">
              Unlocking Research <br />
              <span className="text-blue-600">Potential,</span> Powering
              Innovation.
            </h1>
            <p className="text-sm md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The centralized digital research hub designed to streamline
              proposals, institutional initiatives, and academic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-blue-700 transition-all">
                Explore Services
              </button>
              <button className="flex items-center justify-center gap-3 font-bold text-slate-800 hover:text-blue-600 transition-all">
                <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                  ▶
                </span>
                Watch Video
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 rounded-full overflow-hidden border-[10px] md:border-[15px] border-white shadow-2xl aspect-square w-[280px] md:w-[480px]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Research Team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badges */}
            <div className="absolute top-0 right-0 md:right-4 z-20 bg-white p-3 md:p-5 rounded-2xl shadow-xl border-l-4 border-blue-600">
              <p className="text-blue-600 font-black text-xl md:text-2xl">
                4,319+
              </p>
              <p className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold tracking-widest">
                Active Logs
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DARK BLUE BANNER WITH IMAGE OVERLAY */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Dark Blue Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="absolute inset-0 z-10 bg-blue-950/90 mix-blend-multiply" />

        <motion.div
          {...fadeInUp}
          className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        >
          <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em]">
            Institutional Governance
          </span>
          <h2 className="text-2xl md:text-5xl font-bold text-white mt-4 mb-8 leading-tight">
            Connecting Visionary Research <br className="hidden md:block" />{" "}
            with Actionable Insights.
          </h2>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-500 transition-all">
            Get Started Now ↗
          </button>
        </motion.div>
      </section>

      {/* 3. FEATURED SERVICES */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
              Featured Services
            </span>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl shadow-xl text-white transform hover:-translate-y-2 transition-all"
            >
              <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-6">
                📑
              </div>
              <h3 className="text-lg font-bold mb-3">Strategic Review</h3>
              <p className="text-xs text-blue-50 leading-relaxed mb-6">
                Expert guidance to refine your research proposals for global
                standards.
              </p>
              <button className="text-white text-xs font-bold border-b border-white pb-1">
                Read More
              </button>
            </motion.div>

            {[
              {
                title: "Grant Optimization",
                icon: "🔍",
                desc: "Systematic review process to ensure high success rates for competitive funding.",
              },
              {
                title: "Secure Repository",
                icon: "🎓",
                desc: "Encrypted repositories for your research findings and statistical outputs.",
              },
              {
                title: "Compliance Hub",
                icon: "⚖️",
                desc: "Dedicated support for navigating institutional ethics and legal requirements.",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-6">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-800">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  {service.desc}
                </p>
                <button className="text-blue-600 text-xs font-bold border-b border-blue-600 pb-1">
                  Read More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BRIDGE SECTION WITH IMAGE OVERLAY */}
      <section className="relative py-24 md:py-32">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="absolute inset-0 z-10 bg-slate-950/95" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            {...fadeInUp}
            className="text-2xl md:text-5xl font-black text-white mb-16 leading-tight"
          >
            Building the bridge between <br />{" "}
            <span className="text-blue-500">Academic Discovery</span> and Global
            Impact.
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "12K+", label: "Research Logs" },
              { num: "50+", label: "Active Proposals" },
              { num: "150+", label: "Faculty Users" },
              { num: "100%", label: "Digital Workflow" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <p className="text-3xl md:text-6xl font-black text-blue-500 mb-2">
                  {stat.num}
                </p>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 text-center px-6 border-t border-gray-100">
        <p className="text-gray-400 text-[10px] md:text-xs uppercase font-bold tracking-widest">
          © 2025 URDS - University Research and Development Services.
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
