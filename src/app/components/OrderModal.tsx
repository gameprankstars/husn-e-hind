import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, CircleCheck } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface OrderModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  onClose: () => void;
}

export function OrderModal({ product, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...formData,
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
          }),
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Success State */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white z-10 flex items-center justify-center flex-col gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CircleCheck className="w-24 h-24 text-green-500" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h3 className="text-3xl font-serif text-gray-800 mb-2">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-gray-600">
                    We'll contact you shortly to confirm your order
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <h2 className="text-2xl font-serif text-gray-800">Place Your Order</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-200"
          >
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-serif text-xl text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-serif text-amber-700">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Name Field */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 tracking-wide uppercase">
                  Full Name *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgb(217 119 6 / 0.2)' }}
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-amber-500 focus:outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 tracking-wide uppercase">
                  Phone Number *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgb(217 119 6 / 0.2)' }}
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-amber-500 focus:outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 tracking-wide uppercase">
                  Delivery Address *
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgb(217 119 6 / 0.2)' }}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-amber-500 focus:outline-none transition-all resize-none"
                  placeholder="Enter your complete delivery address"
                />
              </div>

              {/* Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-600 bg-amber-50 p-4 border-l-4 border-amber-400"
              >
                <strong>Note:</strong> This is a manual order system. Our team will contact 
                you within 24 hours to confirm your order and discuss payment options.
              </motion.p>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white tracking-wider uppercase shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: loading ? '-100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">
                  {loading ? 'Placing Order...' : 'Place Order'}
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}