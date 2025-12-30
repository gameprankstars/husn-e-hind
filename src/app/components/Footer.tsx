import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: 'mailto:info@husnehind.com', label: 'Email' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+91 98765 43210' },
    { icon: Mail, text: 'info@husnehind.com' },
    { icon: MapPin, text: 'Mumbai, India' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-amber-900 to-amber-950 text-amber-50 overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-3xl mb-4 text-amber-200">
                HUSN-E-HIND
              </h3>
              <p className="text-amber-200/80 leading-relaxed mb-6">
                Celebrating India's rich heritage of jewellery craftsmanship with 
                handcrafted pieces that tell stories of tradition and elegance.
              </p>
              <motion.div
                className="h-px bg-gradient-to-r from-amber-400 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-serif mb-6 text-amber-200">Contact Us</h4>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-amber-200/80 hover:text-amber-200 transition-colors"
                  >
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-serif mb-6 text-amber-200">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-amber-800/50 hover:bg-amber-700 flex items-center justify-center transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </motion.a>
                ))}
              </div>
              <p className="mt-6 text-amber-200/80 text-sm">
                Stay connected for exclusive updates and new collection launches.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-amber-800/50 py-6"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-amber-200/60 text-sm text-center md:text-left">
                © {new Date().getFullYear()} HUSN-E-HIND. All rights reserved.
              </p>
              <div className="flex gap-6 text-amber-200/60 text-sm">
                <motion.a
                  whileHover={{ color: 'rgb(251 191 36)' }}
                  href="#"
                  className="hover:text-amber-300 transition-colors"
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  whileHover={{ color: 'rgb(251 191 36)' }}
                  href="#"
                  className="hover:text-amber-300 transition-colors"
                >
                  Terms of Service
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>
    </footer>
  );
}
