"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, ExternalLink, Code2, Heart, Sparkles, Send } from "lucide-react";
import { Button } from "./ui/Button";
import ModeToggle from "./ModeToggle";
import { useState } from "react";
import { submitContactForm } from "../actions/contact";

export default function Footer() {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setMsg(null);
    setPending(true);
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setMsg({ ok: true, text: result.message });
        // Reset the form
        const form = document.querySelector('form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        setMsg({ ok: false, text: result.message });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setMsg({ ok: false, text: 'I apologize for the inconvenience, but there seems to be a network issue. Please try again in a moment or use one of my other contact methods.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <footer className="relative overflow-hidden backdrop-blur-2xl bg-background/30 border-t border-white/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Connect Section - Left */}
          <div className="md:order-1 order-2 text-center md:text-left">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide">Let's Connect</h3>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">
              Ready to bring your next project to life? Let's discuss how we can work together.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="w-full md:w-auto border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 px-8 py-3 mx-auto md:mx-0"
            >
              <a href="mailto:contact@mujaxso.com" className="inline-flex items-center gap-3 text-base font-medium">
                Get in touch 
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* About Section - Center */}
          <div className="md:order-2 order-1">
            <div className="flex flex-col items-center text-center">
              {/* Profile Photo Above Name */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-lg mb-4">
                <Image 
                  src="/img/profile.png" 
                  alt="Mujahid Siyam" 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Name and Title */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-foreground block">
                  Mujahid Siyam
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Software Engineer • AI/ML Engineer
                </p>
              </div>
              <p className="text-muted-foreground max-w-sm text-base leading-relaxed mb-6">
                Building cutting-edge solutions with code, AI, and innovative technology.
              </p>
              <div className="flex gap-4 justify-center">
                {[
                  { 
                    name: 'GitHub', 
                    icon: Github, 
                    url: 'https://github.com/mujaxso',
                  },
                  { 
                    name: 'LinkedIn', 
                    icon: Linkedin, 
                    url: 'https://linkedin.com/in/mujaxso',
                  },
                  { 
                    name: 'Email', 
                    icon: Mail, 
                    url: 'mailto:contact@mujaxso.com',
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Section - Right */}
          <div className="md:order-3 order-3">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide text-center md:text-left">
              Quick Message
            </h3>
            {msg && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                msg.ok 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-600' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-600'
              }`}>
                {msg.text}
              </div>
            )}
            <form action={handleSubmit} className="space-y-4">
              {/* Hidden honeypot field */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              {/* Hidden subject field */}
              <input type="hidden" name="subject_line" value="Quick message from website footer" />
              
              <div>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm text-center placeholder:text-center"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm text-center placeholder:text-center"
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  placeholder="Your Message"
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm resize-none text-center placeholder:text-center"
                />
              </div>
              <Button 
                type="submit"
                variant="default" 
                size="lg" 
                disabled={pending}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            {/* Copyright */}
            <div className="text-base text-muted-foreground order-2 md:order-1">
              © {new Date().getFullYear()} Mujahid Siyam. All rights reserved.
            </div>
            
            {/* Build with love */}
            <div className="flex items-center gap-3 text-base text-muted-foreground order-1 md:order-2">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>and</span>
              <span className="text-primary font-medium">Open Source</span>
            </div>

            {/* Tech stack */}
            <div className="flex gap-2 order-3">
              {['Linux', 'Zig', 'AI/ML', 'DevSecOps'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-2 bg-white/5 text-muted-foreground text-sm rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
