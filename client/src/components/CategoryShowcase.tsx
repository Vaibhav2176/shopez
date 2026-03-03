import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/mockProducts';

const CategoryShowcase = () => {
  const displayCategories = categories.filter(c => c.name !== 'All');

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Browse by</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Shop Categories</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {displayCategories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`group relative overflow-hidden rounded-2xl opacity-0 animate-fade-in stagger-${i + 1}`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-category-gradient" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="mt-1 font-body text-sm font-bold text-primary-foreground">{cat.name}</h3>
                <p className="text-xs text-primary-foreground/70">{cat.count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
