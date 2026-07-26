import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  const gentleEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <section id="avis" className="py-20 bg-[#FBE9E1] border-t border-[#F1D9C3] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-4 mb-14">
          <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#B5613C] px-3.5 py-1 rounded-full bg-[#F1D9C3] border border-[#B5613C]/20 inline-block">
            Témoignages Clients
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241C18]">
            Ce que disent nos clientes
          </h2>
          <p className="font-serif text-[#241C18]/80 text-base">
            Des retours authentiques de femmes qui ont adopté la routine Stern Cosmétique au quotidien.
          </p>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: gentleEase,
              }}
              className="p-8 rounded-2xl bg-white border border-[#F1D9C3] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C9A227]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#B5613C]/15 group-hover:text-[#B5613C]/30 transition-colors" />
                </div>

                {/* Exact Testimonial Text */}
                <p className="font-serif italic text-base sm:text-lg text-[#241C18] leading-relaxed">
                  « {t.comment} »
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#F1D9C3] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-base text-[#241C18]">
                      {t.name}
                    </h3>
                    <CheckCircle className="w-3.5 h-3.5 text-[#278652]" />
                  </div>
                  <p className="font-sans-ui text-xs text-[#241C18]/65">
                    Achat vérifié — {t.city || 'Bénin'}
                  </p>
                </div>
                {t.productName && (
                  <span className="text-[11px] font-sans-ui font-semibold px-2.5 py-1 rounded bg-[#F1D9C3]/50 text-[#B5613C]">
                    {t.productName}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
