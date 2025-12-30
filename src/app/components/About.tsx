import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Heart, Award } from 'lucide-react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const features = [
    {
      icon: Sparkles,
      title: 'Handcrafted Excellence',
      description: 'Every piece is meticulously crafted by skilled artisans with decades of experience',
    },
    {
      icon: Heart,
      title: 'Timeless Design',
      description: 'Classic designs that blend traditional aesthetics with contemporary elegance',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: '22K gold and precious stones sourced from the finest craftsmen across India',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-gradient-to-b from-[#FAF9F6] to-[#F5F1E8] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(180, 83, 9) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"
          />
          
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            <span className="bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg"
          >
            At HUSN-E-HIND, we celebrate India's rich heritage of jewellery craftsmanship. 
            Each piece tells a story of tradition, artistry, and timeless beauty. Our master 
            artisans pour their heart and soul into creating jewellery that transcends generations.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative bg-white p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500">
                {/* Gold Border Animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-serif text-gray-800 mb-4 text-center">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Quote */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -top-4 -left-4 text-6xl text-amber-200 font-serif">"</div>
            <p className="text-2xl md:text-3xl font-serif italic text-gray-700 py-8 px-12">
              Where tradition meets elegance, and every piece is a masterpiece
            </p>
            <div className="absolute -bottom-4 -right-4 text-6xl text-amber-200 font-serif">"</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
