// src/app/about/page.tsx - WITH MAP AND TEAM IMAGES
'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Leaf, Trophy, Star, MapPin, Globe, Award, ChefHat } from 'lucide-react';
import { KentePattern, AdinkraPattern, KubaPattern, MudclothPattern, ZigzagPattern, DiamondPattern } from '@/components/patterns/AfricanPatterns';
import Image from 'next/image';

// Team data with Unsplash images (free, high-quality)
const teamMembers = [
  {
    name: 'Khethiwe Khuzwayo',
    role: 'Founder & Head Chef',
    bio: 'Born in KwaZulu-Natal with 15 years of culinary expertise. Passionate about modernizing traditional African recipes.',
    expertise: ['Zulu Cuisine', 'African Fusion', 'Sustainable Cooking'],
    years: 15,
    imageUrl: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop'
  },
  {
    name: 'Amahle Ndlovu',
    role: 'Restaurant Manager',
    bio: 'Hospitality expert ensuring every guest experiences genuine Ubuntu hospitality.',
    expertise: ['Guest Experience', 'Wine Pairing', 'Events'],
    years: 8,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
  },
  {
    name: 'Sipho Dlamini',
    role: 'Master Chef',
    bio: 'Specializes in contemporary dishes that honor African heritage with modern techniques.',
    expertise: ['Contemporary African', 'Plant-Based', 'Spice Blending'],
    years: 12,
    imageUrl: 'https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=400&h=400&fit=crop'
  },
  {
    name: 'Thandi Mbeki',
    role: 'Cultural Curator',
    bio: 'Researches cultural elements to create authentic African ambiance and storytelling.',
    expertise: ['African Art', 'Storytelling', 'Traditional Music'],
    years: 10,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
  }
];

// Values with African proverbs
const values = [
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: 'Ubuntu',
    description: '"Umuntu ngumuntu ngabantu" - We are because of others.',
    color: 'bg-forest/10 text-forest'
  },
  {
    icon: <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: 'Sustainability',
    description: 'Source locally, honor the earth.',
    color: 'bg-gold/10 text-gold-dark'
  },
  {
    icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: 'Heritage',
    description: 'Preserving traditions while innovating.',
    color: 'bg-forest-dark/10 text-forest-dark'
  },
  {
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: 'Connection',
    description: 'Bridging cultures through food.',
    color: 'bg-gold/20 text-gold'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-forest-dark to-forest text-white pt-20 pb-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <KentePattern className="w-full h-full text-white" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <MudclothPattern className="w-16 h-4 sm:w-20 sm:h-5 md:w-24 md:h-6 text-gold/40" />
              <ZigzagPattern className="w-16 h-4 sm:w-20 sm:h-5 md:w-24 md:h-6 text-gold/40" />
              <MudclothPattern className="w-16 h-4 sm:w-20 sm:h-5 md:w-24 md:h-6 text-gold/40" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Our Story of <span className="text-gold">Ubuntu</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 font-serif leading-relaxed">
              Where every meal celebrates heritage, community, and authentic African flavors
            </p>
            
            <div className="flex justify-center mt-6 sm:mt-8">
              <ZigzagPattern className="w-32 h-2 sm:w-40 md:w-48 text-gold" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        
        {/* Our Story Section with Map */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full order-2 lg:order-1"
            >
              <div className="mb-6 sm:mb-8">
                <KubaPattern className="w-full h-2 sm:h-2.5 text-gold mb-4 sm:mb-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest mb-4 sm:mb-6">
                  From Newcastle to Your Table
                </h2>
              </div>
              
              <div className="space-y-4 text-base sm:text-lg text-charcoal">
                <p className="leading-relaxed">
                  Ubuntu Garden Lounge was born in 2018 from a vision to create a sanctuary 
                  where African culinary heritage could be celebrated and shared.
                </p>
                
                <p className="leading-relaxed">
                  Founded by Chef Khethiwe Khuzwayo in Newcastle, our restaurant honors the 
                  rich culinary traditions of South Africa. The name "Ubuntu" reflects our 
                  core philosophy: <span className="italic text-forest font-semibold">"I am because we are."</span>
                </p>
                
                <p className="leading-relaxed">
                  From a small family kitchen to a culinary destination, we blend ancestral 
                  recipes with contemporary techniques in the heart of Madadeni.
                </p>
              </div>
              
              {/* Quote Card */}
              <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-gradient-to-r from-forest/5 to-gold/5 rounded-2xl sm:rounded-3xl border-l-4 border-gold">
                <p className="text-lg sm:text-xl italic text-forest-dark mb-4">
                  "Food is memory served on a plate. Every spice carries history, every flavor tells 
                  a story of our ancestors."
                </p>
                <p className="font-bold text-gold flex items-center gap-2">
                  <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />
                  Khethiwe Khuzwayo, Founder
                </p>
              </div>
            </motion.div>
            
            {/* Map Embed - Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full order-1 lg:order-2"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl aspect-square sm:aspect-[4/3] md:aspect-square bg-forest/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14111.825439726065!2d29.8786105!3d-27.7587069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef71721ae1f66cb%3A0xddad85a01a445cdb!2sMadadeni%2C%20Newcastle%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1743718000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubuntu Garden Lounge Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-3 sm:mb-4">
              <ZigzagPattern className="w-24 h-1.5 sm:w-32 sm:h-2 text-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest mb-3 sm:mb-4">
              Our Guiding Principles
            </h2>
            <p className="text-charcoal-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Values that shape every aspect of Ubuntu
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`${value.color} p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-white/50">
                    {value.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold">{value.title}</h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="bg-gradient-to-r from-forest/10 to-gold/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gold" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-forest">Our Journey</h3>
                <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gold" />
              </div>
              <p className="text-charcoal-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Numbers that reflect our commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: '100%', label: 'Local Ingredients', desc: 'Within 100km' },
                { value: '50+', label: 'Recipes', desc: 'Traditional & Modern' },
                { value: '15', label: 'Techniques', desc: 'Handcrafted Methods' },
                { value: '25+', label: 'Partners', desc: 'Farmers & Artisans' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-bold text-gold-dark mb-1">{stat.label}</div>
                  <div className="text-xs text-charcoal-light">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section with Images */}
        <section>
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-3 sm:mb-6">
              <AdinkraPattern className="w-32 h-2 sm:w-40 md:w-48 text-forest" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest mb-3 sm:mb-4">
              Meet Our Ubuntu Family
            </h2>
            <p className="text-charcoal-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              The passionate team behind your dining experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-r from-forest to-forest-dark">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="bg-gold text-forest px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                        {member.years} yrs
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star size={12} className="sm:w-4 sm:h-4 text-gold" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <div className="p-3 sm:p-4 md:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-forest mb-1">{member.name}</h3>
                    <p className="text-sm text-gold font-medium mb-2 sm:mb-3">{member.role}</p>
                    <p className="text-xs sm:text-sm text-charcoal-light mb-3 sm:mb-4 leading-relaxed line-clamp-3">{member.bio}</p>
                    
                    {/* Expertise */}
                    <div className="space-y-1 sm:space-y-2">
                      {member.expertise.map((skill) => (
                        <div key={skill} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                          <span className="text-xs text-charcoal">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
