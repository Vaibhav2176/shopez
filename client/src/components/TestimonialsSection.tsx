import React from 'react';
import { testimonials } from '@/data/mockProducts';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => (
  <section className="bg-muted/50 py-20">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Testimonials</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">What Our Customers Say</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className={`relative rounded-2xl border border-border bg-card p-6 opacity-0 animate-fade-in hover-lift stagger-${i + 1}`}
          >
            <Quote className="absolute right-6 top-6 h-8 w-8 text-secondary/20" />
            <div className="mb-4 flex items-center gap-1">
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
              ))}
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
