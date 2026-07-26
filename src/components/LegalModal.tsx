import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, FileText, Copyright } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'mentions' | 'privacy' | 'credits';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'mentions',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'mentions' | 'privacy' | 'credits'>(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F1D9C3] z-10 text-left my-8 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#FBE9E1] border-b border-[#F1D9C3] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-[#B5613C] text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl text-[#241C18]">
                  Informations Légales & Protection
                </h2>
                <p className="font-sans-ui text-xs text-[#241C18]/70">
                  Stern Cosmétique — Beauté Naturelle
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-[#241C18] transition-colors shadow-xs"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#F1D9C3] bg-[#FBE9E1]/40 px-6 gap-2 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('mentions')}
              className={`py-3 px-4 font-sans-ui text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'mentions'
                  ? 'border-[#B5613C] text-[#B5613C]'
                  : 'border-transparent text-[#241C18]/70 hover:text-[#241C18]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Mentions Légales & Droits d'Auteur</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`py-3 px-4 font-sans-ui text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'privacy'
                  ? 'border-[#B5613C] text-[#B5613C]'
                  : 'border-transparent text-[#241C18]/70 hover:text-[#241C18]'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Confidentialité & Données</span>
            </button>

            <button
              onClick={() => setActiveTab('credits')}
              className={`py-3 px-4 font-sans-ui text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'credits'
                  ? 'border-[#B5613C] text-[#B5613C]'
                  : 'border-transparent text-[#241C18]/70 hover:text-[#241C18]'
              }`}
            >
              <Copyright className="w-4 h-4" />
              <span>Propriété des Visuels</span>
            </button>
          </div>

          {/* Content Scrollable Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-serif text-sm text-[#241C18]/85 leading-relaxed flex-1">
            {activeTab === 'mentions' && (
              <div className="space-y-6">
                <section className="space-y-2">
                  <h3 className="font-bold text-lg text-[#241C18] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B5613C]"></span>
                    1. Édition du Site
                  </h3>
                  <p>
                    Le présent site internet est édité et exploité par la marque <strong>Stern Cosmétique</strong>.
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs font-sans-ui text-[#241C18]/80">
                    <li><strong>Nom commercial :</strong> Stern Cosmétique</li>
                    <li><strong>Téléphone Service Client :</strong> +229 41 63 42 42</li>
                    <li><strong>Email de contact :</strong> contact@sterncosmetique.com</li>
                    <li><strong>Siège & Distribution :</strong> Cotonou, Bénin (Livraison nationale & internationale)</li>
                  </ul>
                </section>

                <section className="space-y-2 pt-4 border-t border-[#F1D9C3]/60">
                  <h3 className="font-bold text-lg text-[#241C18] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B5613C]"></span>
                    2. Propriété Intellectuelle & Droits d'Auteur sur les Images
                  </h3>
                  <div className="p-4 rounded-2xl bg-[#FBE9E1] border border-[#B5613C]/30 space-y-2">
                    <p className="font-semibold text-[#B5613C]">
                      📷 Propriété Exclusive des Visuels et des Photos
                    </p>
                    <p className="text-xs leading-relaxed text-[#241C18]">
                      L’ensemble des visuels, photographies, illustrations, identités graphiques, packaging de produits et contenus visuels présents sur ce site sont la <strong>propriété exclusive de la marque Stern Cosmétique et de sa propriétaire</strong>.
                    </p>
                    <p className="text-xs leading-relaxed text-[#241C18]">
                      Toute reproduction, représentation, modification, publication, adaptation ou exploitation commerciale de tout ou partie de ces images, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite et préalable de la propriétaire de la marque.
                    </p>
                    <p className="text-xs italic text-[#241C18]/70">
                      Toute utilisation non autorisée des visuels constitue une contrefaçon sanctionnée par le Code de la Propriété Intellectuelle et les lois relatives à la protection du droit d'auteur.
                    </p>
                  </div>
                </section>

                <section className="space-y-2 pt-4 border-t border-[#F1D9C3]/60">
                  <h3 className="font-bold text-lg text-[#241C18] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B5613C]"></span>
                    3. Produits et Formulations
                  </h3>
                  <p>
                    Les produits Stern Cosmétique (Savons de soin, Crèmes hydratantes et clarifiantes, Pack Spécial Stern) sont élaborés selon des exigences rigoureuses de qualité botanique. Les indications d'utilisation données sur le site le sont à titre de conseil beauté et ne remplacent pas un avis médical dermatologique spécialisé.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <section className="space-y-2">
                  <h3 className="font-bold text-lg text-[#241C18] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B5613C]"></span>
                    Protection des Données Personnelles
                  </h3>
                  <p>
                    Stern Cosmétique s'engage à préserver la confidentialité des informations fournies par les utilisateurs lors de leurs commandes ou demandes de conseil beauté.
                  </p>
                </section>

                <section className="space-y-2 pt-4 border-t border-[#F1D9C3]/60">
                  <h3 className="font-bold text-lg text-[#241C18]">Utilisation des données</h3>
                  <p className="text-xs leading-relaxed">
                    Les données personnelles collectées (nom, téléphone WhatsApp, email, carnation de peau) sont exclusivement réservées au traitement des commandes, à l'expédition des produits et aux conseils beauté personnalisés dispensés par nos conseillères.
                  </p>
                  <p className="text-xs leading-relaxed font-semibold text-[#B5613C]">
                    Aucune donnée personnelle n'est vendue, cédée ni louée à des tiers à des fins commerciales.
                  </p>
                </section>

                <section className="space-y-2 pt-4 border-t border-[#F1D9C3]/60">
                  <h3 className="font-bold text-lg text-[#241C18]">Vos Droits</h3>
                  <p className="text-xs leading-relaxed">
                    Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ce droit à tout moment en contactant notre service client à l'adresse <strong>contact@sterncosmetique.com</strong> ou directement via notre numéro WhatsApp officiel <strong>+229 41 63 42 42</strong>.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'credits' && (
              <div className="space-y-6">
                <section className="space-y-3">
                  <h3 className="font-bold text-lg text-[#241C18] flex items-center gap-2">
                    <Copyright className="w-5 h-5 text-[#B5613C]" />
                    Droits d'Auteur sur la Galerie & les Produits
                  </h3>
                  <p>
                    Tous les clichés photographiques des gammes de soins (Savon Teint Bronzé, Savon Teint Caramel, Savon Métissé/Clair, Crème Visage & Corps, Pack Spécial Stern) ont été réalisés spécialement pour la marque.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FBE9E1]/70 border border-[#F1D9C3] space-y-2 text-xs">
                    <p className="font-bold text-[#241C18]">
                      Notice relative aux photographies :
                    </p>
                    <p>
                      • <strong>Titulaire du droit d'auteur :</strong> La propriétaire de Stern Cosmétique.
                    </p>
                    <p>
                      • <strong>Droits réservés :</strong> © 2026 Stern Cosmétique — Tous droits strictement réservés.
                    </p>
                    <p>
                      • <strong>Protection :</strong> Toute extraction, republication sur des réseaux sociaux sans mention ni autorisation, ou réutilisation sur d'autres plateformes e-commerce est interdite.
                    </p>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer Close Button */}
          <div className="p-4 bg-[#FBE9E1]/50 border-t border-[#F1D9C3] flex justify-end shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#B5613C] hover:bg-[#9A4E2D] text-white font-sans-ui text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              J'ai compris
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
