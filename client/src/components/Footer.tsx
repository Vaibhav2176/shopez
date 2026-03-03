import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="font-display text-2xl font-bold">
            Shop<span className="text-secondary">EZ</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">
            Your one-stop shop for premium, curated products. Quality you can trust, delivered with care.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-body text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/80">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">Home</Link>
            <Link to="/products" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">All Products</Link>
            <Link to="/cart" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">Cart</Link>
            <Link to="/dashboard" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">My Orders</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-body text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/80">Categories</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/products?category=Electronics" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">Electronics</Link>
            <Link to="/products?category=Fashion" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">Fashion</Link>
            <Link to="/products?category=Home+%26+Living" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">Home & Living</Link>
            <Link to="/products?category=Sports" className="text-sm text-primary-foreground/60 transition-colors hover:text-secondary">Sports</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-body text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/80">Contact Us</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-sm text-primary-foreground/60">
              <Mail className="h-4 w-4 text-secondary" /> support@shopez.com
            </div>
            <div className="flex items-center gap-2.5 text-sm text-primary-foreground/60">
              <Phone className="h-4 w-4 text-secondary" /> +91 7024057876
            </div>
            <div className="flex items-center gap-2.5 text-sm text-primary-foreground/60">
              <MapPin className="h-4 w-4 text-secondary" /> Bhopal, India
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} ShopEZ. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
