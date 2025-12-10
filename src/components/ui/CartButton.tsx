// src/components/ui/CartButton.tsx
'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

export default function CartButton() {
  const { totalItems, setIsCartOpen } = useCart();
  
  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 hover:bg-cream-dark rounded-full transition-colors"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingBag className="w-6 h-6 text-forest" />
      
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-gold text-forest text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          {totalItems > 9 ? '9+' : totalItems}
        </motion.div>
      )}
    </button>
  );
}