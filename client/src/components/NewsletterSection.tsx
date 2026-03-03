import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="bg-hero-gradient py-20">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">Stay in the Loop</h2>
        <p className="mt-3 text-sm text-primary-foreground/70">
          Get early access to new arrivals, exclusive deals, and curated style guides delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="flex-1 rounded-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-secondary"
          />
          <Button type="submit" variant="secondary" className="gap-2 rounded-full px-6 font-semibold">
            Subscribe <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
