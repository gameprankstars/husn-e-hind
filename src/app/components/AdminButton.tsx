import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

interface AdminButtonProps {
  onClick: () => void;
}

export function AdminButton({ onClick }: AdminButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-shadow"
      title="Admin Panel"
    >
      <Settings size={24} />
    </motion.button>
  );
}
