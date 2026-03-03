import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Truck } from 'lucide-react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
          <Link to="/products"><Button className="mt-6 gap-2 rounded-full px-8">Start Shopping <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const total = totalPrice + shipping;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground animate-fade-in">Shopping Cart</h1>
      <p className="mt-1 text-sm text-muted-foreground animate-fade-in stagger-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(({ product, quantity }, i) => (
              <div key={product._id} className={`flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card opacity-0 animate-fade-in stagger-${Math.min(i + 1, 8)} hover-lift`}>
                <Link to={`/products/${product._id}`}>
                  <img src={product.image} alt={product.name} className="h-28 w-28 rounded-xl object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link to={`/products/${product._id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">{product.category}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">${product.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-full border border-border">
                      <button onClick={() => updateQuantity(product._id, quantity - 1)} className="px-3 py-1.5 text-foreground hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-xs font-bold text-foreground">{quantity}</span>
                      <button onClick={() => updateQuantity(product._id, quantity + 1)} className="px-3 py-1.5 text-foreground hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-base font-bold text-foreground">${(product.price * quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(product._id)} className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="animate-fade-in-right">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-elevated">
            <h3 className="text-lg font-bold text-foreground">Order Summary</h3>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-success' : 'text-foreground'}`}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-secondary">Add ${(50 - totalPrice).toFixed(2)} more for free shipping!</p>
              )}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="mt-6 w-full gap-2 rounded-full" size="lg">
                Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><Shield className="h-3 w-3" /> Secure</div>
              <div className="flex items-center gap-1"><Truck className="h-3 w-3" /> Fast Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
