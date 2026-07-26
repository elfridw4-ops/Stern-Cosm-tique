import React from 'react';
import { motion } from 'motion/react';
import { REASSURANCE_METRICS } from '../data/products';

export const Reassurance: React.FC = () => {
  const gentleEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <section id="reassurance" className="py-12 bg-[#F5F2F5] border-y border-[#D8D2D8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center text-center divide-y md:divide-y-0 md:divide-x divide-[#D8D2D8]/80">
          {REASSURANCE_METRICS.map((metric, index) => (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: 0.08 * index,
                ease: gentleEase,
              }}
              className="pt-6 md:pt-0 px-4 flex flex-col items-center justify-center group"
            >
              <span className="font-serif font-bold text-4xl sm:text-5xl text-[#6B3F63] tracking-tight group-hover:scale-105 transition-transform duration-300">
                {metric.value}
              </span>
              <span className="font-serif font-medium text-lg text-[#2A2430] mt-1">
                {metric.label}
              </span>
              <span className="font-sans-ui text-xs text-[#2A2430]/70 mt-0.5 tracking-wide">
                {metric.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
