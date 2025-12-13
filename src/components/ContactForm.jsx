import React, { useState, useRef } from 'react';
import { Mail, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await emailjs.sendForm(
        'service_j0wa25s', // Replace with your EmailJS service ID
        'template_m4auzhr', // Replace with your EmailJS template ID
        form.current,
        'csgVpkAu-q80rb4mO' // Replace with your EmailJS public key
      );

      setStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-white/10 bg-white/5 p-3 text-white">
          <Mail />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.5em] text-slate-400">Direct channel</p>
          <h3 className="text-3xl font-semibold text-white">Let's connect.</h3>
        </div>
      </div>
      <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-[#050608] p-10">
        <form ref={form} onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.4em] text-slate-400">Name</label>
              <input
                type="text"
                name="user_name"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/40 focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.4em] text-slate-400">Email</label>
              <input
                type="email"
                name="user_email"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/40 focus:outline-none"
                placeholder="you@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.4em] text-slate-400">Mission brief</label>
            <textarea
              name="message"
              className="h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/40 focus:outline-none"
              placeholder="Share the challenge, objectives, or research prompt…"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl border border-white/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.5em] text-white transition
              ${loading ? 'cursor-not-allowed opacity-60' : 'hover:border-white/50'}
            `}
          >
            {loading ? (
              <div className="mx-auto flex items-center gap-3 text-slate-300">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                Sending…
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send
                <Send size={16} />
              </span>
            )}
          </button>

          {status === 'success' && (
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center text-sm text-slate-200">
              Message sent. I will respond shortly.
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center text-sm text-red-200">
              Transmission failed — please retry.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
