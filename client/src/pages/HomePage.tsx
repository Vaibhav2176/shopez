import { useEffect } from "react";
import axios from "axios";

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import CategoryShowcase from '@/components/CategoryShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import StatsBar from '@/components/StatsBar';
import PromoBanner from '@/components/PromoBanner';
import { mockProducts } from '@/data/mockProducts';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: Shield, title: 'Secure Payment', desc: '256-bit SSL encryption' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here for you' },
  { icon: Sparkles, title: 'Premium Quality', desc: 'Curated with care' },
];

const HomePage = () => {
  const featured = mockProducts.slice(0, 8);
  const newArrivals = mockProducts.slice(8, 12);


  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient px-4 py-24 md:py-36">
        {/* Decorative elements */}
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

        <div className="container relative z-10 mx-auto grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in-left">
            <span className="inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
              New Season 2026
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-primary-foreground md:text-6xl lg:text-7xl">
              Discover<br />
              What You<br />
              <span className="text-gradient-gold">Love</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/70">
              Curated products for every lifestyle. Premium quality, timeless design, and prices that make sense.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="gap-2 rounded-full px-8 font-bold shadow-glow">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="ghost" className="gap-2 rounded-full border border-primary-foreground/20 px-8 text-primary-foreground hover:bg-primary-foreground/10">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block animate-fade-in-right">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                alt="Shopping collection"
                className="h-[500px] w-full rounded-3xl object-cover shadow-hero"
              />
              {/* Floating product card */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card p-4 shadow-elevated animate-float">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80" alt="Watch" className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Trending Now</p>
                    <p className="text-xs text-secondary">Smart Watch Pro</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -right-4 top-8 rounded-2xl bg-secondary px-4 py-2 shadow-elevated animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-sm font-bold text-secondary-foreground">40% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b border-border bg-card py-8">
        <div className="container mx-auto grid grid-cols-2 gap-4 px-4 md:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 rounded-xl p-3 opacity-0 animate-fade-in stagger-${i + 1}`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                <Icon className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-body text-xs font-bold text-foreground">{title}</h3>
                <p className="text-[10px] text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Featured Products */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Curated for You</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Featured Products</h2>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-1 rounded-full text-sm font-semibold">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Just Landed</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};




export default HomePage;
