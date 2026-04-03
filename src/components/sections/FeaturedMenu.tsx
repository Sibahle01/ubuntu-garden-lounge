// src/components/sections/FeaturedMenu.tsx - Horizontal scroll fixed for Android
'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Utensils, GlassWater, Salad, Cake } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

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

const getSectionPatternStyle = (): CSSProperties => {
  return {
    backgroundColor: '#f5f5dc',
    backgroundImage: `repeating-conic-gradient(from 45deg, #d4af37 0% 0.05%, transparent 0.05% 50%)`,
    backgroundSize: '40px 40px',
    opacity: 0.1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  };
};

interface FeaturedItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string;
  description: string;
  isFeatured: boolean;
}

const categoryMap: Record<string, string> = {
  'APPETIZERS': 'starters',
  'APPETIZER': 'starters',
  'MAIN_COURSES': 'mains',
  'MAIN_COURSE': 'mains',
  'DESSERTS': 'desserts',
  'DESSERT': 'desserts',
  'DRINKS': 'drinks',
  'DRINK': 'drinks',
  'PLATTERS': 'platters',
  'PLATTER': 'platters',
};

const categoryFallbackImages: Record<string, string> = {
  'APPETIZERS': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop',
  'MAIN_COURSES': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop',
  'DESSERTS': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=600&fit=crop',
  'DRINKS': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=600&fit=crop',
  'PLATTERS': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
  'DEFAULT': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
};

const getImageUrl = (item: FeaturedItem): string => {
  if (item.imageUrl) {
    if (item.imageUrl.startsWith('http')) {
      return item.imageUrl;
    }
    if (item.imageUrl.startsWith('/uploads/')) {
      return item.imageUrl;
    }
    return `/uploads/menu/${item.imageUrl}`;
  }
  return categoryFallbackImages[item.category] || categoryFallbackImages[item.category + 'S'] || categoryFallbackImages['DEFAULT'];
};

export default function FeaturedMenu() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  const router = useRouter();
  const { addItem } = useCart();

  const categories = [
    { name: 'Platters', id: 'platters' },
    { name: 'Cocktails', id: 'drinks' },
    { name: 'Starters', id: 'starters' },
    { name: 'Desserts', id: 'desserts' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        
        const data = await response.json();
        
        const featured = data
          .filter((item: any) => item.isFeatured && item.isAvailable)
          .map((item: any) => ({
            ...item,
            price: parseFloat(item.price)
          }))
          .slice(0, 6);
        
        setFeaturedItems(featured);

        const counts: Record<string, number> = {};
        data.forEach((item: any) => {
          let frontendCategory = categoryMap[item.category] || item.category.toLowerCase();
          if (frontendCategory === 'mains') frontendCategory = 'platters';
          counts[frontendCategory] = (counts[frontendCategory] || 0) + 1;
        });
        setCategoryCount(counts);
        
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      imageUrl: getImageUrl(item),
      category: categoryMap[item.category] || item.category.toLowerCase(),
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
      <div aria-hidden="true" style={getSectionPatternStyle()} />

      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Categories Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-forest">Explore Menu</h2>
              <button
                onClick={handleViewMenuClick}
                className="text-sm text-gold font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Mobile Horizontal Scroll - No negative margins, padding on inner div */}
            <div className="md:hidden overflow-x-auto pb-2">
              <div className="flex gap-3 px-4" style={{ minWidth: 'max-content' }}>
                {categories.map((cat, index) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex-shrink-0 bg-white rounded-2xl p-4 w-[110px] shadow-sm hover:shadow-md transition-all border border-forest/5"
                  >
                    <div className="flex justify-center mb-2">
                      <CategoryIcon name={cat.name} />
                    </div>
                    <div className="text-sm font-semibold text-forest text-center">{cat.name}</div>
                    <div className="text-xs text-charcoal-light text-center">
                      {categoryCount[cat.id] !== undefined ? `${categoryCount[cat.id]} items` : '0 items'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-4">
              {categories.map((cat, index) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 border border-forest/5"
                >
                  <div className="flex justify-center mb-3">
                    <CategoryIcon name={cat.name} />
                  </div>
                  <div className="text-base font-semibold text-forest text-center">{cat.name}</div>
                  <div className="text-sm text-charcoal-light text-center">
                    {categoryCount[cat.id] || 0} items
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Items Section - keep horizontal scroll as before */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
              <p className="mt-4 text-charcoal">Loading signature dishes...</p>
            </div>
          ) : featuredItems.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-forest">Signature Dishes</h3>
                <button
                  onClick={handleViewMenuClick}
                  className="text-sm text-gold font-semibold flex items-center gap-1"
                >
                  See All
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Mobile Horizontal Scroll - No negative margins */}
              <div className="md:hidden overflow-x-auto pb-4">
                <div className="flex gap-4 px-4" style={{ minWidth: 'max-content' }}>
                  {featuredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden shadow-lg"
                    >
                      <div className="relative h-48 bg-gradient-to-br from-forest/10 to-gold/10">
                        <Image
                          src={getImageUrl(item)}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg text-forest mb-2 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-sm text-charcoal-light mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gold">{formatPrice(item.price)}</span>
                          <button 
                            onClick={() => handleAddToCart(item)}
                            className="bg-gold text-forest font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all active:scale-90 shadow-md"
                            aria-label={`Add ${item.name} to order`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <div className="relative h-56 bg-gradient-to-br from-forest/10 to-gold/10">
                      <Image
                        src={getImageUrl(item)}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-xl text-forest mb-2 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-sm text-charcoal-light mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gold">{formatPrice(item.price)}</span>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="bg-gold text-forest font-bold w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all active:scale-90 shadow-md"
                          aria-label={`Add ${item.name} to order`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* View Full Menu CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={handleViewMenuClick}
              className="bg-forest hover:bg-forest-light text-cream font-bold px-8 py-4 rounded-full text-base transition-all shadow-lg w-full md:w-auto"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}