import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-card opacity-0 animate-fade-in hover-lift stagger-${Math.min(index + 1, 8)}`}
    >
      {/* Badge */}
      {product.stockQuantity < 10 && product.stockQuantity > 0 && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">
          Low Stock
        </div>
      )}
      {product.price > 150 && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
          Premium
        </div>
      )}

      {/* Image */}
      <Link to={`/products/${product._id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/10">
            <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-card/90 p-3 shadow-elevated backdrop-blur-sm">
                <Eye className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary">
          {product.category}
        </p>
        <Link to={`/products/${product._id}`}>
          <h3 className="mb-2 font-body text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-secondary text-secondary" />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">(4.8)</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
          </div>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            disabled={product.stockQuantity === 0}
            className="gap-1.5 rounded-full text-xs"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        {product.stockQuantity === 0 && (
          <p className="mt-2 text-xs font-semibold text-destructive">Out of stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
