'use client';

import { useState, FormEvent } from 'react';
import { Mail, Send, Code2, ExternalLink, Camera, LinkIcon } from 'lucide-react';

// Web3Forms configuration
// Use environment variable with fallback for development
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'c5ce3857-f4f2-47f4-a977-126b08374ab1';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Log in development to help debugging
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  console.log('Web3Forms Access Key:', WEB3FORMS_ACCESS_KEY ? 'Set' : 'Not set');
}

export default function ContactPage() {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMsg(null);
    setPending(true);
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Create an AbortController for timeout (only used in production)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Honeypot check
    const botcheck = formData.get('botcheck') as string;
    if (botcheck?.trim()) {
      console.log('Honeypot triggered');
      setMsg({ ok: true, text: 'Thank you for your message! I will get back to you soon.' });
      setPending(false);
      form.reset();
      return;
    }
    
    // Get form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject_line') as string;
    const message = formData.get('message') as string;
    
    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      setMsg({ ok: false, text: 'Please fill in all required fields: name, email, and message.' });
      setPending(false);
      clearTimeout(timeoutId);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMsg({ ok: false, text: 'Please provide a valid email address.' });
      setPending(false);
      clearTimeout(timeoutId);
      return;
    }
    
    // Check if we're in development mode (localhost or preview deployment)
    // In Vercel production, the hostname will be your domain (mujaxso.com)
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname.includes('.local');
    
    // For preview deployments (like Vercel preview), you might want to test the real API
    // You can enable real submissions in preview by setting a query parameter or environment variable
    const forceProduction = new URLSearchParams(window.location.search).has('force-production');
    
    if (isLocalhost && !forceProduction) {
      console.log('Development mode: Simulating form submission');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      clearTimeout(timeoutId);
      setMsg({ 
        ok: true, 
        text: 'Thank you for your message! (Development mode: Form validated successfully. In production, this would send an email.)' 
      });
      form.reset();
      setPending(false);
      return;
    }
    
    // Production: Actual Web3Forms submission
    // Check if API key is available
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error('Web3Forms API key is not configured');
      setMsg({ 
        ok: false, 
        text: 'Contact form is not properly configured. Please try again later or contact me directly.' 
      });
      setPending(false);
      clearTimeout(timeoutId);
      return;
    }
    
    // Prepare payload for Web3Forms
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || 'Quick message from website footer',
      message: message.trim(),
      from_name: 'My Website Contact Form',
      botcheck: botcheck || ''
    };
    
    console.log('Sending to Web3Forms:', payload);
    
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      
      if (!response.ok) {
        console.error('Web3Forms HTTP error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Web3Forms response:', result);
      
      clearTimeout(timeoutId);
      if (result.success) {
        setMsg({ 
          ok: true, 
          text: 'Thank you for your message! I have received it and will get back to you within 24 hours.' 
        });
        form.reset();
      } else {
        setMsg({ 
          ok: false, 
          text: result.message || 'I apologize, but there was an issue sending your message. Please try again or reach out through one of my other contact methods.' 
        });
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Submission error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      
      // Check for specific error types
      if (error.name === 'AbortError') {
        setMsg({ 
          ok: false, 
          text: 'Request timed out. Please check your internet connection and try again.' 
        });
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMsg({ 
          ok: false, 
          text: 'Network error: Unable to connect to the server. Please check your internet connection and try again. If the problem persists, the service may be temporarily unavailable.' 
        });
      } else if (error.message?.includes('HTTP')) {
        setMsg({ 
          ok: false, 
          text: `Server error: ${error.message}. Please try again later.` 
        });
      } else {
        setMsg({ 
          ok: false, 
          text: 'I apologize for the inconvenience, but there seems to be a network issue. Please try again in a moment or use one of my other contact methods.' 
        });
      }
    } finally {
      clearTimeout(timeoutId);
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
              <div className="flex items-center backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">Email</h3>
                  <p className="text-[var(--color-foreground)]/60">I typically respond within a few hours</p>
                  <p className="text-sm text-[var(--color-primary)] font-medium">contact@mujaxso.com</p>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-secondary)]/20 rounded-lg mr-4">
                  <Code2 className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">GitHub</h3>
                  <p className="text-[var(--color-foreground)]/60">Explore my latest projects and contributions</p>
                  <a href="https://github.com/mujaxso" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    github.com/mujaxso
                  </a>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg mr-4">
                  <LinkIcon className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">LinkedIn</h3>
                  <p className="text-[var(--color-foreground)]/60">Connect with me professionally</p>
                  <a href="https://linkedin.com/in/mujaxso" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    @mujaxso
                  </a>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-accent)]/20 rounded-lg mr-4">
                  <Camera className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">Instagram</h3>
                  <p className="text-[var(--color-foreground)]/60">Follow for creative insights and updates</p>
                  <a href="https://instagram.com/mujaxso" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    @mujaxso
                  </a>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-primary)]/20 rounded-lg mr-4">
                  <span className="text-sm font-bold">TK</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">TikTok</h3>
                  <p className="text-[var(--color-foreground)]/60">Creative content and tech insights</p>
                  <a href="https://tiktok.com/@mujaxso" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    @mujaxso
                  </a>
                </div>
              </div>
              
              <div className="flex items-center backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-[var(--color-accent)]/20 rounded-lg mr-4">
                  <ExternalLink className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)]">Website</h3>
                  <p className="text-[var(--color-foreground)]/60">Explore my portfolio and blog</p>
                  <a href="https://mujaxso.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)] transition-colors">
                    mujaxso.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-8">
            {msg && (
              <div className={`mb-6 p-4 rounded-lg ${
                msg.ok 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-600' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-600'
              }`}>
                {msg.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 text-center md:text-left"
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
                    className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 text-center md:text-left"
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
                  className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 text-center md:text-left"
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
                  className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 text-center md:text-left"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              
              <button
                type="submit"
                disabled={pending}
                className="w-full flex flex-col items-center justify-center px-8 py-8 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {pending ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-[var(--color-primary)]" />
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
