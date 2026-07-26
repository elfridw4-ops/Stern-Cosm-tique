import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, PackageCheck, Sparkles, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const gentleEase = [0.25, 0.1, 0.25, 1.0];

  const features = [
    {
      icon: Leaf,
      title: 'Ingrédients sélectionnés avec soin',
      description: 'Extraits botaniques purifiants, beurres végétaux et huiles précieuses pour une tolérance cutanée parfaite.',
    },
    {
      icon: Award,
      title: 'Formules vegan et cruelty-free',
      description: '100% de nos soins sont conçus dans le respect absolu du vivant, sans aucun ingrédient ni test d\'origine animale.',
    },
    {
      icon: PackageCheck,
      title: 'Packaging chic et durable',
      description: 'Des flacons et pots réutilisables au design raffiné, pensés pour apporter une touche d\'élégance dans votre salle de bain.',
    },
  ];

  return (
    <section id="pourquoi" className="py-20 bg-[#FBE9E1] border-t border-[#F1D9C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Header */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#B5613C] px-3.5 py-1 rounded-full bg-[#F1D9C3] border border-[#B5613C]/20 inline-block">
              Notre Philosophie
            </span>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241C18] leading-tight">
              Pourquoi choisir Stern Cosmétique ?
            </h2>

            <p className="font-serif text-base sm:text-lg text-[#241C18]/80 leading-relaxed">
              Nous allions innovation cosmétique, sensorialité et ingrédients de
              qualité pour créer des produits à la fois performants et respectueux de
              votre peau.
            </p>

            {/* Notre Promesse Highlight Sub-block */}
            <div className="p-6 rounded-2xl bg-[#F1D9C3]/50 border border-[#B5613C]/20 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[#B5613C]">
                <HeartHandshake className="w-5 h-5" />
                <h3 className="font-serif font-bold text-base">Notre promesse</h3>
              </div>
              <p className="font-serif italic text-sm text-[#241C18] leading-relaxed">
                « Une expérience beauté premium, simple et inspirante, du premier
                regard au dernier geste. »
              </p>
            </div>
          </div>

          {/* Right Features List */}
          <div className="lg:col-span-7 space-y-6">
            {features.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * index,
                    ease: gentleEase,
                  }}
                  className="p-6 rounded-2xl bg-white border border-[#F1D9C3] shadow-xs hover:shadow-md transition-shadow flex items-start gap-5 text-left group"
                >
                  <div className="p-3.5 rounded-xl bg-[#F1D9C3] text-[#B5613C] group-hover:bg-[#B5613C] group-hover:text-white transition-colors duration-300 shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-lg text-[#241C18]">
                      {item.title}
                    </h3>
                    <p className="font-serif text-sm text-[#241C18]/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
