"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Anime Style Decorations */}
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 z-0" />
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-background to-transparent z-0" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-primary/30 blur-[100px] rounded-full z-0 pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground"
          >
            Let&apos;s build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">amazing together</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Whether you have an idea for a project or just want to chat, feel free to shoot me an email!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto bg-white/5 border border-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl shadow-primary/5"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium pl-1">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium pl-1">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium pl-1">Message</label>
              <textarea 
                rows={4}
                placeholder="What's on your mind?" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
            >
              Send Message
              <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
