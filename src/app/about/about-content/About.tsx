"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const AboutContent = () => {
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
      {/* --- STICKY GLASS HEADER --- */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
              U
            </div>
            <span
              className={`font-black tracking-tighter text-xl ${
                isScrolled ? "text-slate-900" : "text-white md:text-white"
              }`}
            >
              URDS
            </span>
          </div>

          {/* Navigation */}
          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest ${
              isScrolled ? "text-slate-600" : "text-blue-100"
            }`}
          >
            <a
              href="/urds/home"
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/urds/about"
              className="text-blue-600 font-black transition-colors"
            >
              About
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Services
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogin}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                isScrolled
                  ? "text-slate-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION WITH IMAGE OVERLAY */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')`,
          }}
        />
        {/* Dark Blue Overlay Layer */}
        <div className="absolute inset-0 z-10 bg-blue-900/80 mix-blend-multiply" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="relative z-20 px-6 mt-10"
        >
          <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] mb-4 text-blue-300 font-bold">
            Home &gt; About Us
          </p>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-none">
            About Our <br className="md:hidden" /> Services
          </h1>
          <div className="w-16 md:w-24 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="max-w-7xl mx-auto py-16 md:py-32 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={fadeInUp.transition}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-sm">
            Research & Development
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-8 mb-6 leading-[1.1] text-slate-900 tracking-tight">
            Advancing Knowledge <br className="hidden md:block" /> Through
            Collaboration.
          </h2>
          <p className="text-sm md:text-xl text-gray-500 mb-10 leading-relaxed">
            As a centralized research hub, the URDS team understands the nuances
            necessary to navigate the project lifecycle. We help discover the
            right path to a rewarding research output for every faculty member.
          </p>
          <button className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95">
            View Our Services ↗
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="relative order-1 md:order-2"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="Research Team"
              className="w-full object-cover h-72 md:h-[550px] transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 md:w-24 md:h-24 bg-blue-600/90 rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl backdrop-blur-md border-4 border-white/20"
              >
                <span className="ml-1 text-2xl md:text-3xl">▶</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. CORE VALUES / FEATURES */}
      <section className="bg-slate-50 py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            viewport={fadeInUp.viewport}
            transition={fadeInUp.transition}
          >
            <span className="text-blue-600 font-bold uppercase text-xs tracking-[0.3em]">
              Our Values
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 mb-16 md:mb-24 text-slate-900 tracking-tight">
              Streamlining Your Progress
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              {...fadeInUp}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                📊
              </div>
              <h3 className="font-black text-xl mb-4 text-slate-800 uppercase tracking-tight">
                Research Growth
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your output is our priority. We provide the tools to make your
                academic goals a reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-blue-600 p-10 rounded-3xl shadow-2xl text-white md:-translate-y-8"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-3xl">
                ⚙️
              </div>
              <h3 className="font-black text-xl mb-4 uppercase tracking-tight">
                Governance
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Our experts know exactly how to navigate complex institutional
                administration workflows.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                🧩
              </div>
              <h3 className="font-black text-xl mb-4 text-slate-800 uppercase tracking-tight">
                Collaboration
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fostering teamwork environments where researchers across units
                innovate together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. MISSION SECTION */}
      <section className="max-w-7xl mx-auto py-20 md:py-32 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left"
        >
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest">
            Our Mission
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-8 mb-8 text-slate-900 leading-[1.1] tracking-tight">
            Improving Academic Output <br /> With Expert Coaching.
          </h2>
          <p className="text-sm md:text-lg text-gray-500 mb-10 leading-relaxed">
            We provide a reliable digital environment for managing research
            initiatives, ensuring all activities are documented and aligned with
            standards.
          </p>
          <button className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-xl">
            Join Our Coaching →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="bg-blue-50 p-8 md:p-16 rounded-[40px] border border-blue-100 shadow-inner"
        >
          <ul className="space-y-8">
            {[
              "Understanding your unique academic goals.",
              "Fostering positive thoughts and innovation.",
              "Systematic Research Administration (SRA).",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center text-sm md:text-lg text-slate-800 font-bold"
              >
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-6 text-xs shadow-lg shadow-blue-200">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-16 flex items-center border-t border-blue-200 pt-10">
            <div className="w-16 h-16 bg-blue-200 rounded-2xl mr-6 overflow-hidden border-4 border-white shadow-md">
              <img
                src="https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"
                alt="Founder"
              />
            </div>
            <div>
              <p className="font-black text-slate-900 text-xl leading-none">
                Rogelio A Banagbanag, Dall
              </p>
              <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-2">
                URDS Director
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center text-gray-400 border-t border-gray-100 px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">
          University Research and Development Services
        </p>
        <p className="text-xs">
          © 2025 All rights reserved • Powered by Innovation
        </p>
      </footer>
    </div>
  );
};

export default AboutContent;
