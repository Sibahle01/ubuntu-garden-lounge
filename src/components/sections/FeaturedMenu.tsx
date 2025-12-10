// src/components/sections/FeaturedMenu.tsx - UPDATED WITH CART CONTEXT
'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Utensils, GlassWater, Salad, Cake } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext'; // Import CartContext

// Professional icon components for categories
const CategoryIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case 'platters':
      return <Utensils size={24} className="text-forest" />;
    case 'cocktails':
    case 'drinks':
      return <GlassWater size={24} className="text-forest" />;
    case 'starters':
      return <Salad size={24} className="text-forest" />;
    case 'desserts':
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

// UPDATED: Function to get a cleaner, more subtle background pattern style
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

interface FeaturedItem {
  id: string;
  name: string;
  price: number; // Changed to number
  image: string;
  badge?: string;
  category: 'platters' | 'starters' | 'mains' | 'desserts' | 'drinks';
  description: string;
}

export default function FeaturedMenu() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const { addItem } = useCart(); // Use CartContext

  const featuredItems: FeaturedItem[] = [
    {
      id: 'platter-1',
      name: 'Ubuntu Fusion Platter',
      price: 285.00,
      image: '/images/menu/fusion-platter.jpg',
      badge: 'BEST SELLER',
      category: 'platters',
      description: 'A celebration of African flavors with grilled meats, chakalaka, and pap'
    },
    {
      id: 'platter-2',
      name: 'Sea & Flame Platter',
      price: 350.00,
      image: '/images/menu/sea-flame.jpg',
      badge: 'NEW',
      category: 'platters',
      description: 'Fresh prawns, calamari, and line fish with our signature peri-peri sauce'
    },
    {
      id: 'platter-3',
      name: 'Royal Ubuntu Feast',
      price: 480.00,
      image: '/images/menu/royal-feast.jpg',
      category: 'platters',
      description: 'Premium sharing platter with lamb chops, boerewors, and sides'
    }
  ];

  const categories = [
    { name: 'Platters', count: 8, id: 'platters' },
    { name: 'Cocktails', count: 12, id: 'drinks' },
    { name: 'Starters', count: 6, id: 'starters' },
    { name: 'Desserts', count: 5, id: 'desserts' }
  ];

  // Navigation handlers
  const handleViewMenuClick = () => {
    router.push('/menu');
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/menu?category=${categoryId}`);
  };

  const handleAddToCart = (item: FeaturedItem) => {
    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.image,
      category: item.category,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Preload images
  useEffect(() => {
    featuredItems.forEach((item) => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [item.id]: true }));
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${item.image}`);
        setFailedImages(prev => ({ ...prev, [item.id]: true }));
        setLoadedImages(prev => ({ ...prev, [item.id]: true }));
      };
    });
  }, []);

  // Get image style for an item
  const getImageStyle = (item: FeaturedItem, index: number): CSSProperties => {
    const isLoaded = loadedImages[item.id];
    const hasFailed = failedImages[item.id];
    
    if (!isLoaded) {
      return { 
        backgroundImage: 'linear-gradient(135deg, #1a4d2e 0%, #1a4d2e 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    
    if (hasFailed) {
      return { 
        backgroundImage: getFallbackGradient(index),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    
    return { 
      backgroundImage: `url(${item.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
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
                  <div className="text-xs text-charcoal-light text-center">{cat.count} items</div>
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
                  <div className="text-sm text-charcoal-light text-center">{cat.count} items</div>
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
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex-shrink-0 snap-center w-[280px] sm:w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <div 
                    className="relative h-48 transition-opacity duration-500"
                    style={{
                      ...getImageStyle(item, index),
                      opacity: loadedImages[item.id] ? 1 : 0.5,
                    } as CSSProperties}
                  >
                    {!loadedImages[item.id] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-gold/20 animate-pulse" />
                    )}
                    
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {item.badge}
                      </div>
                    )}
                    
                    {failedImages[item.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest/30 to-gold/30">
                        <div className="text-white text-center p-4">
                          <div className="text-lg font-semibold mb-1">{item.name.split(' ')[0]}</div>
                          <div className="text-sm opacity-80">Image Coming Soon</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-forest mb-2 leading-tight">
                      {item.name}
                    </h4>
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
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 duration-300"
                >
                  <div 
                    className="relative h-56 transition-opacity duration-500"
                    style={{
                      ...getImageStyle(item, index),
                      opacity: loadedImages[item.id] ? 1 : 0.5,
                    } as CSSProperties}
                  >
                    {!loadedImages[item.id] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-gold/20 animate-pulse" />
                    )}
                    
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {item.badge}
                      </div>
                    )}
                    
                    {failedImages[item.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest/30 to-gold/30">
                        <div className="text-white text-center p-4">
                          <div className="text-xl font-semibold mb-1">{item.name.split(' ')[0]}</div>
                          <div className="text-sm opacity-80">Professional Photo Coming Soon</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-xl text-forest mb-3 leading-tight">
                      {item.name}
                    </h4>
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