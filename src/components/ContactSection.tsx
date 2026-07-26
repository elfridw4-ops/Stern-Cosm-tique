import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, Send, CheckCircle2, MapPin } from 'lucide-react';

interface ContactSectionProps {
  onOpenWhatsApp: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenWhatsApp }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    skinType: 'Teint Caramel',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedMessage = `Bonjour Stern Cosmétique, je souhaite obtenir un conseil beauté (via https://stern-cosm.vercel.app) :

📌 *Nom :* ${formData.fullName}
📞 *Contact :* ${formData.emailOrPhone}
✨ *Carnation / Type de peau :* ${formData.skinType}
💬 *Message :* ${formData.message || 'Demande de conseil sur ma routine'}`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/22941634242?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setFormData({ fullName: '', emailOrPhone: '', skinType: 'Teint Caramel', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-[#FBE9E1] border-t border-[#F1D9C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#B5613C] px-3.5 py-1 rounded-full bg-[#F1D9C3] border border-[#B5613C]/20 inline-block">
              Service Client & Conseils
            </span>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241C18] leading-tight">
              Besoin d'un conseil beauté ou d'une recommandation personnalisée ?
            </h2>

            <p className="font-serif text-base text-[#241C18]/80 leading-relaxed">
              Nos conseillères sont à votre entière disposition pour vous guider dans le choix de vos soins et composer votre routine idéale.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              
              {/* WhatsApp direct */}
              <button
                onClick={onOpenWhatsApp}
                className="w-full p-4 rounded-2xl bg-[#278652]/10 hover:bg-[#278652]/20 border border-[#278652]/30 text-left flex items-center justify-between transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-full bg-[#278652] text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#241C18] text-sm sm:text-base">
                      WhatsApp Direct
                    </h3>
                    <p className="font-sans-ui text-xs text-[#278652] font-semibold">
                      Réponse instantanée & Conseils sur-mesure
                    </p>
                  </div>
                </div>
              </button>

              {/* Phone */}
              <a
                href="tel:+22941634242"
                className="p-4 rounded-2xl bg-white border border-[#F1D9C3] flex items-center gap-3.5 text-left hover:border-[#B5613C]/50 transition-colors block"
              >
                <div className="p-3 rounded-full bg-[#F1D9C3] text-[#B5613C]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#241C18] text-sm">
                    Téléphone
                  </h3>
                  <p className="font-sans-ui text-xs text-[#241C18]/80 font-semibold">
                    +229 41 63 42 42
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@sterncosmetique.com"
                className="p-4 rounded-2xl bg-white border border-[#F1D9C3] flex items-center gap-3.5 text-left hover:border-[#B5613C]/50 transition-colors block"
              >
                <div className="p-3 rounded-full bg-[#F1D9C3] text-[#B5613C]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#241C18] text-sm">
                    Adresse Email
                  </h3>
                  <p className="font-sans-ui text-xs text-[#241C18]/80 font-semibold">
                    contact@sterncosmetique.com
                  </p>
                </div>
              </a>

            </div>
          </div>

          {/* Right Advice Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#F1D9C3] shadow-lg text-left">
              <h3 className="font-serif font-bold text-2xl text-[#241C18] mb-2">
                Demander un conseil beauté
              </h3>
              <p className="font-serif text-xs text-[#241C18]/70 mb-6">
                Remplissez ce formulaire court et recevez une recommandation personnalisée sous 24h.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#278652]/10 border border-[#278652]/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#278652] mx-auto" />
                  <h4 className="font-serif font-bold text-lg text-[#241C18]">
                    Message bien reçu !
                  </h4>
                  <p className="font-serif text-sm text-[#241C18]/80">
                    Merci pour votre message. Notre conseillère vous contactera très rapidement pour vous conseiller.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans-ui">
                  
                  <div>
                    <label className="block text-xs font-semibold text-[#241C18] mb-1">
                      Votre nom complet
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="ex. Mariam K."
                      className="w-full px-4 py-3 rounded-xl bg-[#FBE9E1]/40 border border-[#F1D9C3] text-sm focus:outline-none focus:ring-2 focus:ring-[#B5613C] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#241C18] mb-1">
                      Téléphone ou Email (WhatsApp recommandé)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      placeholder="ex. +229 97 00 00 00"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBE9E1]/40 border border-[#F1D9C3] text-sm focus:outline-none focus:ring-2 focus:ring-[#B5613C] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#241C18] mb-1">
                      Votre carnation ou type de peau
                    </label>
                    <select
                      value={formData.skinType}
                      onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FBE9E1]/40 border border-[#F1D9C3] text-sm focus:outline-none focus:ring-2 focus:ring-[#B5613C] transition-all font-serif text-[#241C18]"
                    >
                      <option value="Teint Bronzé">Teint Bronzé</option>
                      <option value="Teint Caramel">Teint Caramel</option>
                      <option value="Teint Ébène">Teint Ébène</option>
                      <option value="Teint Mat Olive">Teint Mat Olive</option>
                      <option value="Teint très clair Porcelaine">Teint très clair Porcelaine</option>
                      <option value="Autre / Conseil général">Autre / Conseil général</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#241C18] mb-1">
                      Votre question ou préoccupation
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Racontez-nous ce que vous souhaitez améliorer (taches, hydratation, éclat...)"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBE9E1]/40 border border-[#F1D9C3] text-sm focus:outline-none focus:ring-2 focus:ring-[#B5613C] focus:border-transparent transition-all font-serif"
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#B5613C] hover:bg-[#9A4E2D] text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <span>Envoyer ma demande</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
