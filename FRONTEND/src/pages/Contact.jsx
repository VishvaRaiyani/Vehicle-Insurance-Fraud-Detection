import { useState } from 'react';
import { Send, MapPin, Mail, MessageSquare } from 'lucide-react';
import AbstractBackground3D from '../components/prediction/AbstractBackground3D';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate sending
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen pb-24 relative flex items-center justify-center">
      
      <AbstractBackground3D isAnalyzing={false} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Contact Information */}
        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3">Get In Touch</div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Let's Discuss AI Fraud Detection.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-12">
            Interested in learning more about FraudShield AI's machine learning capabilities, technical architecture, or requesting a detailed demonstration? Send us a message.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-6">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Email Us</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">support@fraudshield.ai</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mr-6">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Headquarters</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Global AI Research Center</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            {status === 'success' ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">We will get back to you as soon as possible.</p>
                <button onClick={() => setStatus('idle')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-500" /> Send a Message
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full premium-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/70 dark:bg-slate-900/50" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email</label>
                    <input type="email" required placeholder="john@company.com" className="w-full premium-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/70 dark:bg-slate-900/50" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Subject</label>
                  <input type="text" required placeholder="How can we help?" className="w-full premium-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/70 dark:bg-slate-900/50" />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Message</label>
                  <textarea required rows="4" placeholder="Your message here..." className="w-full premium-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/70 dark:bg-slate-900/50 resize-none"></textarea>
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 disabled:opacity-70 mt-4">
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
