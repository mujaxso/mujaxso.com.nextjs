'use client';

import { useState } from 'react';
import { Mail, Send, Github, ExternalLink, Instagram } from 'lucide-react';

async function submitContactForm(formData: FormData) {
  'use server';
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return { error: 'All fields are required' };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email format' };
  }

  // Here you would typically send email, save to database, etc.
  console.log('Contact form submission:', {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  });

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: 'Message sent successfully!' };
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.error) {
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        // Reset form on success
        const form = document.querySelector('form') as HTMLFormElement;
        if (form) form.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-[var(--color-foreground)]/60 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
              Let's Start a Conversation
            </h2>
            <p className="text-[var(--color-foreground)]/60 mb-8">
              I'm always open to discussing new opportunities, creative ideas, 
              or opportunities to be part of your vision. Feel free to reach out 
              through any of the channels below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">Email</h3>
                  <p className="text-[var(--color-foreground)]/60">contact@mujaxso.com</p>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-secondary)]/20 rounded-lg mr-4">
                  <Github className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">GitHub</h3>
                  <a href="https://github.com/mujaxso" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors">
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
                  <a href="https://instagram.com/mujaxso" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors">
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
                  <a href="https://tiktok.com/@mujaxso" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors">
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
                  <a href="https://mujaxso.com" className="text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)] transition-colors">
                    mujaxso.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl p-8">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600">
                Thank you for your message! I will get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600">
                Failed to send message. Please try again.
              </div>
            )}
            <form action={handleSubmit} className="space-y-6">
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
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
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
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
