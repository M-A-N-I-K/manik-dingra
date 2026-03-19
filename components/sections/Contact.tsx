"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Ocean depth background */}
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/8 z-0" />
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-background to-transparent z-0" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />
      <div className="absolute right-10 top-10 w-48 h-48 bg-secondary/15 blur-[80px] rounded-full z-0 pointer-events-none" />
      <div className="absolute inset-0 map-texture opacity-25 z-0" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-semibold text-primary mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Transponder Snail
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground"
          >
            Send a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Den Den Mushi
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Whether you have a treasure map or just want to join the crew — drop a transmission and I&apos;ll get back to you at sea.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto parchment-glass rounded-3xl p-8 shadow-2xl shadow-primary/5"
        >
          {/* Den Den Mushi header */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-primary/10">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-lg">
              🐌
            </div>
            <div>
              <div className="text-xs font-mono text-primary/60 tracking-widest">DEN DEN MUSHI</div>
              <div className="text-sm font-semibold text-foreground">manikdhingra0582@gmail.com</div>
            </div>
            <div className="ml-auto">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-neon" />
            </div>
          </div>

          {status === "success" ? (
            <div className="text-center py-8 space-y-3">
              <div className="text-4xl">🐌</div>
              <p className="text-lg font-semibold text-foreground">Transmission sent!</p>
              <p className="text-sm text-muted-foreground">The snail is on its way. I&apos;ll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm text-primary underline underline-offset-2"
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold pl-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name, pirate..."
                    className="w-full px-4 py-3 bg-background/50 border border-primary/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold pl-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@ship.sea"
                    className="w-full px-4 py-3 bg-background/50 border border-primary/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold pl-1">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="What's your bounty proposal?"
                  className="w-full px-4 py-3 bg-background/50 border border-primary/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder:text-muted-foreground/50"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/25 group hover:shadow-neon hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {status === "loading" ? "Sending..." : "Send Transmission"}
                <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
