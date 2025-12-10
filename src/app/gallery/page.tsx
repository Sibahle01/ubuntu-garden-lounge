// src/app/gallery/page.tsx
'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, Instagram, Share2, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

const galleryCategories = [
  { id: 'all', name: 'All Photos' },
  { id: 'ambiance', name: 'Ambiance' },
  { id: 'food', name: 'Food & Drinks' },
  { id: 'events', name: 'Events' },
  { id: 'people', name: 'People & Social' },
];

const galleryPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  category: ['ambiance', 'food', 'events', 'people'][i % 4],
  title: ['Courtyard Evening', 'Signature Dish', 'Birthday Celebration', 'Friends Gathering'][i % 4],
  description: 'Experience the Ubuntu atmosphere'
}));

export default function GalleryPage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Header */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gradient-to-br from-forest to-charcoal overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Experience Ubuntu through our lens
            </p>
          </div>
        </div>
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 rounded-full bg-white border border-forest/20 text-forest font-medium whitespace-nowrap hover:bg-forest hover:text-cream transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer bg-gradient-to-br from-forest/30 to-gold/30 hover:shadow-2xl transition-all duration-300"
            >
              {/* Photo Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 font-bold text-lg">
                  Photo {photo.id}
                </span>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <h3 className="text-white font-bold mb-1">{photo.title}</h3>
                <p className="text-white/80 text-sm">{photo.description}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="bg-white/90 hover:bg-white p-1.5 rounded">
                  <Share2 size={16} />
                </button>
                <button className="bg-white/90 hover:bg-white p-1.5 rounded">
                  <Download size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Media CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-forest/10 text-forest px-6 py-3 rounded-full mb-4">
            <Instagram size={20} />
            <span className="font-semibold">Tag us on Instagram</span>
          </div>
          <h3 className="text-2xl font-bold text-forest mb-2">
            Share Your Ubuntu Experience
          </h3>
          <p className="text-charcoal-light mb-6 max-w-2xl mx-auto">
            Use #UbuntuGardenLounge for a chance to be featured
          </p>
          <button 
            onClick={() => window.open('https://instagram.com', '_blank')}
            className="bg-gradient-to-r from-forest to-forest-light hover:from-forest-light hover:to-forest text-cream font-bold px-8 py-3 rounded-full transition-all shadow-lg active:scale-95"
          >
            Follow on Instagram
          </button>
        </div>
      </div>
    </main>
  );
}