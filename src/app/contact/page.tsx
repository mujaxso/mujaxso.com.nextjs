'use client';

import { useState } from 'react';
import { Mail, Send, Github, ExternalLink, Instagram } from 'lucide-react';
import { submitContactForm } from '../actions/contact';

export default function ContactPage() {
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
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-[var(--color-foreground)]/60 max-w-2xl mx-auto">
            I'm always excited to discuss new opportunities, creative projects, or potential collaborations. 
            Feel free to reach out—I'd be delighted to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
              Start a Conversation
            </h2>
            <p className="text-[var(--color-foreground)]/60 mb-8">
              Whether you have a project in mind, want to explore collaboration opportunities, 
              or simply wish to connect, I'm here to listen. Let's discuss how we can work together 
              to bring your ideas to life.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">Email</h3>
                  <p className="text-[var(--color-foreground)]/60">I typically respond within a few hours</p>
                  <p className="text-sm text-[var(--color-primary)] font-medium">contact@mujaxso.com</p>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-secondary)]/20 rounded-lg mr-4">
                  <Github className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">GitHub</h3>
                  <p className="text-[var(--color-foreground)]/60">Explore my latest projects and contributions</p>
                  <a href="https://github.com/mujaxso" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    github.com/mujaxso
                  </a>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-accent)]/20 rounded-lg mr-4">
                  <Instagram className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">Instagram</h3>
                  <p className="text-[var(--color-foreground)]/60">Follow for creative insights and updates</p>
                  <a href="https://instagram.com/mujaxso" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    @mujaxso
                  </a>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg mr-4">
                  <span className="text-sm font-bold">TK</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">TikTok</h3>
                  <p className="text-[var(--color-foreground)]/60">Creative content and tech insights</p>
                  <a href="https://tiktok.com/@mujaxso" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    @mujaxso
                  </a>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-accent)]/20 rounded-lg mr-4">
                  <ExternalLink className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">Website</h3>
                  <p className="text-[var(--color-foreground)]/60">Explore my portfolio and blog</p>
                  <a href="https://mujaxso.com" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    mujaxso.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-8">
            {msg && (
              <div className={`mb-6 p-4 rounded-lg ${
                msg.ok 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-600' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-600'
              }`}>
                {msg.text}
              </div>
            )}
            <form action={handleSubmit} className="space-y-6">
              {/* Hidden fields */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject_line" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject_line"
                  name="subject_line"
                  required
                  className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              
              <button
                type="submit"
                disabled={pending}
                className="w-full flex flex-col items-center justify-center px-6 py-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium rounded-2xl hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 group"
              >
                {pending ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
                    <span>Send Message</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
