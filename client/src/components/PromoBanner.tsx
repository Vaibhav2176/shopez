import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PromoBanner = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl bg-hero-gradient-warm p-10 md:p-16">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />

        <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-secondary/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
              Limited Time
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-primary-foreground md:text-5xl">
              Up to 40% Off<br />
              <span className="text-secondary">Premium Collection</span>
            </h2>
            <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
              Discover our handpicked premium products at unbeatable prices. Limited stock available.
            </p>
            <Link to="/products">
              <Button variant="secondary" size="lg" className="mt-6 gap-2 rounded-full font-semibold animate-pulse-glow">
                Shop the Sale <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="hidden md:flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80"
              alt="Premium collection"
              className="h-72 w-72 rounded-2xl object-cover shadow-hero animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
