import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '@/data/mockProducts';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, RotateCcw, Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const product = mockProducts.find(p => p._id === id);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <p className="text-6xl">😕</p>
          <h2 className="mt-4 text-2xl font-bold text-foreground">Product not found</h2>
          <Link to="/products"><Button variant="ghost" className="mt-4 rounded-full">Back to Products</Button></Link>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <Link to="/products">
          <Button variant="ghost" size="sm" className="mb-6 gap-1 rounded-full">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Image */}
          <div className="animate-fade-in-left">
            <div className="relative overflow-hidden rounded-3xl bg-muted">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover aspect-square" />
              <button
                onClick={() => setLiked(!liked)}
                className="absolute right-4 top-4 rounded-full bg-card/80 p-2.5 backdrop-blur-sm transition-all hover:bg-card"
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
              </button>
              {product.price > 150 && (
                <div className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                  Premium
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center animate-fade-in-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{product.category}</p>
            <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.8 (124 reviews)</span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8">
              <span className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            </div>

            <p className={`mt-3 text-sm font-medium ${product.stockQuantity > 0 ? 'text-success' : 'text-destructive'}`}>
              {product.stockQuantity > 0 ? `✓ ${product.stockQuantity} in stock` : '✗ Out of stock'}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center overflow-hidden rounded-full border border-border">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2.5 text-foreground transition-colors hover:bg-muted font-medium">−</button>
                <span className="w-12 text-center text-sm font-bold text-foreground">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stockQuantity, q + 1))} className="px-4 py-2.5 text-foreground transition-colors hover:bg-muted font-medium">+</button>
              </div>
              <Button
                onClick={() => addToCart(product, qty)}
                disabled={product.stockQuantity === 0}
                className="gap-2 rounded-full px-8"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </div>

            {/* Features */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: Shield, label: 'Warranty' },
                { icon: RotateCcw, label: 'Easy Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/50 p-3">
                  <Icon className="h-5 w-5 text-secondary" />
                  <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-foreground">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
