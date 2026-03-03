import React from 'react';
import { brandStats } from '@/data/mockProducts';

const StatsBar = () => (
  <section className="border-y border-border bg-card py-12">
    <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4">
      {brandStats.map((stat, i) => (
        <div key={stat.label} className={`text-center opacity-0 animate-fade-in stagger-${i + 1}`}>
          <p className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBar;
