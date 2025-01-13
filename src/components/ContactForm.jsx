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
        'service_7jrvf4f', // Replace with your EmailJS service ID
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
    <section id="contact" className="mb-24 scroll-mt-20">
      <div className="flex items-center mb-8">
        <Mail className="mr-3 text-blue-600" />
        <h3 className="text-3xl font-bold">Contact Me</h3>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all">
        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="user_name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </div>

          <div className="relative group">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="user_email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </div>

          <div className="relative group">
            <label className="block text-gray-700 mb-2 font-medium">Message</label>
            <textarea
              name="message"
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700 hover:transform hover:scale-105'}
            `}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                Send Message
                <Send size={16} className="ml-2" />
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="text-green-500 text-center animate-fade-in">
              Message sent successfully!
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-red-500 text-center animate-fade-in">
              Failed to send message. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
