// src/app/menu/page.tsx - MODIFIED TO USE LOCAL IMAGES
'use client';

import MenuHero from '@/components/sections/MenuHero';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShoppingCart, Star, Flame, Leaf } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

// Hardcoded menu items with your local images
const menuItems = [
  {
    id: '1',
    name: 'Bunny Chow',
    description: 'Traditional South African curry served in a hollowed-out bread loaf',
    price: '120.00',
    category: 'MAIN_COURSES',
    imageUrl: '/images/menu/bunny-chow.jpg',
    isFeatured: true,
    isSpicy: true,
    isVegetarian: false,
    isAvailable: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Pap en Wors',
    description: 'Maize meal porridge with grilled sausage and tomato relish',
    price: '85.00',
    category: 'MAIN_COURSES',
    imageUrl: '/images/menu/pap-en-wors.jpg',
    isFeatured: true,
    isSpicy: true,
    isVegetarian: false,
    isAvailable: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Malva Pudding',
    description: 'Classic South African dessert with creamy custard',
    price: '70.00',
    category: 'DESSERTS',
    imageUrl: '/images/menu/malva.jpg',
    isFeatured: true,
    isSpicy: false,
    isVegetarian: true,
    isAvailable: true,
    order: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

// --- CONFIGURATION ---

// Map your database categories to frontend categories
const categoryMap: Record<string, string> = {
  'APPETIZERS': 'starters',
  'APPETIZER': 'starters',
  'STARTERS': 'starters',
  'STARTER': 'starters',
  'MAIN_COURSES': 'mains',
  'MAIN_COURSE': 'mains',
  'MAINS': 'mains',
  'MAIN': 'mains',
  'DESSERTS': 'desserts',
  'DESSERT': 'desserts',
  'DRINKS': 'drinks',
  'DRINK': 'drinks',
  'PLATTERS': 'platters',
  'PLATTER': 'platters',
};

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Mains' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'platters', name: 'Platters' },
];

const formatPrice = (price: string) => {
  const priceNum = parseFloat(price);
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(priceNum);
};

// Get frontend category
const getFrontendCategory = (dbCategory: string): string => {
  return categoryMap[dbCategory] || dbCategory.toLowerCase();
};

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem, totalItems } = useCart();

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => getFrontendCategory(item.category) === selectedCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      imageUrl: item.imageUrl,
      category: getFrontendCategory(item.category),
    });
  };

  return (
    <main className="min-h-screen bg-cream">
      <MenuHero />
      
      {/* Category Filter */}
      <div className="sticky top-0 z-30 bg-white shadow-md border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 snap-center px-4 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-gold text-forest shadow-md'
                    : 'bg-cream text-charcoal hover:bg-cream-dark'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-32 md:pb-8">
        {filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-forest/20 to-gold/20">
                  {/* Badges */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                    {item.isFeatured && (
                      <span className="bg-gold text-forest text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star size={10} className="sm:w-3 sm:h-3" /> Featured
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Flame size={10} className="sm:w-3 sm:h-3" /> Spicy
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Leaf size={10} className="sm:w-3 sm:h-3" /> Veg
                      </span>
                    )}
                    {!item.isAvailable && (
                      <span className="bg-gray-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                        Sold Out
                      </span>
                    )}
                  </div>

                  <Image
                    src={item.imageUrl}
                    alt={`${item.name} - Ubuntu Garden Lounge`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={index < 4}
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg text-forest mb-1 line-clamp-2 leading-tight">
                    {item.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-charcoal-light mb-2 sm:mb-3 line-clamp-2 flex-grow">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gold">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isAvailable}
                      className={`${
                        item.isAvailable 
                          ? 'bg-gold hover:bg-gold-light text-forest' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      } font-bold w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all active:scale-90 shadow-md`}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      {item.isAvailable ? '+' : '×'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-charcoal-light text-lg">No items found in this category</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => {
            const cartButton = document.querySelector('[aria-label*="Shopping cart"]');
            if (cartButton) {
              (cartButton as HTMLButtonElement).click();
            }
          }}
          className="fixed bottom-24 md:bottom-6 right-6 bg-forest text-cream w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center hover:bg-forest-light transition-all z-30 md:hidden"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-gold text-forest w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        </motion.button>
      )}
    </main>
  );
}