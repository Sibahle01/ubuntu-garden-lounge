// src/components/sections/FeaturedMenu.tsx - FIXED ORDER
'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Utensils, GlassWater, Salad, Cake } from 'lucide-react';
import { useState } from 'react';
import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

// Your local images from public/images/menu/
const featuredItems = [
  {
    id: '1',
    name: 'Bunny Chow',
    description: 'Traditional South African curry served in a hollowed-out bread loaf',
    price: 120.00,
    category: 'MAIN_COURSES',
    imageUrl: '/images/menu/bunny-chow.jpg',
    isFeatured: true,
    isAvailable: true
  },
  {
    id: '3',
    name: 'Pap en Wors',
    description: 'Maize meal porridge with grilled sausage and tomato relish',
    price: 85.00,
    category: 'MAIN_COURSES',
    imageUrl: '/images/menu/pap-en-wors.jpg',
    isFeatured: true,
    isAvailable: true
  },
  {
    id: '5',
    name: 'Malva Pudding',
    description: 'Classic South African dessert with creamy custard',
    price: 70.00,
    category: 'DESSERTS',
    imageUrl: '/images/menu/malva.jpg',
    isFeatured: true,
    isAvailable: true
  },
];

// Professional icon components for categories
const CategoryIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case 'platters':
    case 'platter':
      return <Utensils size={24} className="text-forest" />;
    case 'cocktails':
    case 'drinks':
    case 'drink':
      return <GlassWater size={24} className="text-forest" />;
    case 'starters':
    case 'appetizers':
    case 'appetizer':
      return <Salad size={24} className="text-forest" />;
    case 'desserts':
    case 'dessert':
      return <Cake size={24} className="text-forest" />;
    default:
      return <Utensils size={24} className="text-forest" />;
  }
};

// Function to get fallback gradient based on index
const getFallbackGradient = (index: number) => {
  const gradients = [
    'linear-gradient(135deg, #1a4d2e 0%, #2d5f3f 50%, #d4af37 100%)',
    'linear-gradient(135deg, #d4af37 0%, #f4c430 50%, #1a4d2e 100%)',
    'linear-gradient(135deg, #2d5f3f 0%, #1a4d2e 50%, #f4c4c0 100%)',
  ];
  return gradients[index % gradients.length];
};

const getSectionPatternStyle = (patternIndex: number): CSSProperties => {
  const patternStyle: CSSProperties = {
    backgroundColor: '#f5f5dc',
    backgroundImage: `
      repeating-conic-gradient(from 45deg, 
        #d4af37 0% 0.05%, 
        transparent 0.05% 50%
      )
    `,
    backgroundSize: '40px 40px',
    opacity: 0.1,
  };

  return {
    ...patternStyle,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    pointerEvents: 'none',
  };
};

// Category mapping - MOVED UP BEFORE IT'S USED
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

// Helper function - MOVED UP BEFORE IT'S USED
const getFrontendCategory = (dbCategory: string): string => {
  return categoryMap[dbCategory] || dbCategory.toLowerCase();
};

export default function FeaturedMenu() {
  const router = useRouter();
  const { addItem } = useCart();

  const categories = [
    { name: 'Platters', id: 'platters' },
    { name: 'Cocktails', id: 'drinks' },
    { name: 'Starters', id: 'starters' },
    { name: 'Desserts', id: 'desserts' }
  ];

  // Calculate category counts from featured items
  const categoryCount = categories.reduce((acc, cat) => {
    const count = featuredItems.filter(item => 
      getFrontendCategory(item.category) === cat.id
    ).length;
    return { ...acc, [cat.id]: count };
  }, {} as Record<string, number>);

  const handleViewMenuClick = () => {
    router.push('/menu');
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/menu?category=${categoryId}`);
  };

  const handleAddToCart = (item: typeof featuredItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      category: getFrontendCategory(item.category),
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <section className="bg-cream py-8 md:py-16 relative overflow-hidden">
      {/* Background Pattern Element */}
      <div 
        aria-hidden="true" 
        style={getSectionPatternStyle(0)}
      />

      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-forest">Explore Menu</h2>
              <button
                onClick={handleViewMenuClick}
                className="text-sm text-gold font-semibold flex items-center gap-1 hover:gap-2 transition-all active:scale-95"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory touch-pan-x">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 snap-center bg-white rounded-2xl p-4 min-w-[110px] shadow-sm hover:shadow-md transition-all active:scale-95 border border-forest/5"
                  aria-label={`Browse ${cat.name}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <div className="flex justify-center mb-2">
                    <CategoryIcon name={cat.name} />
                  </div>
                  <div className="text-sm font-semibold text-forest text-center">{cat.name}</div>
                  <div className="text-xs text-charcoal-light text-center">
                    {categoryCount[cat.id] || 0} items
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Desktop: Full Width Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-4">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-forest/5"
                  aria-label={`Browse ${cat.name}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <div className="flex justify-center mb-3">
                    <CategoryIcon name={cat.name} />
                  </div>
                  <div className="text-base font-semibold text-forest text-center">{cat.name}</div>
                  <div className="text-sm text-charcoal-light text-center">
                    {categoryCount[cat.id] || 0} items
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Featured Items */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-forest">Signature Dishes</h3>
              <button
                onClick={handleViewMenuClick}
                className="text-sm text-gold font-semibold flex items-center gap-1 active:scale-95"
              >
                See All
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Mobile: Horizontal Scroll */}
            <div 
              className="md:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' } as CSSProperties}
            >
              {featuredItems.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex-shrink-0 snap-center w-[280px] sm:w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <div className="relative h-48 bg-gradient-to-br from-forest/10 to-gold/10">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-forest mb-2 leading-tight line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-charcoal-light mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">{formatPrice(item.price)}</span>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-gold hover:bg-gold-light text-forest font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all active:scale-90 shadow-md"
                        aria-label={`Add ${item.name} to order`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 duration-300"
                >
                  <div className="relative h-56 bg-gradient-to-br from-forest/10 to-gold/10">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-xl text-forest mb-2 leading-tight line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-charcoal-light mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gold">{formatPrice(item.price)}</span>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-gold hover:bg-gold-light text-forest font-bold w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all active:scale-90 shadow-md"
                        aria-label={`Add ${item.name} to order`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View Full Menu CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={handleViewMenuClick}
              className="bg-forest hover:bg-forest-light text-cream font-bold px-8 py-4 rounded-full text-base transition-all active:scale-95 shadow-lg w-full md:w-auto"
              aria-label="View full menu"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}