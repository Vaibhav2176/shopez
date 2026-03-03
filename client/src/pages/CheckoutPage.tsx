import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, Lock, CreditCard, Truck } from 'lucide-react';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [step, setStep] = useState(1);

  if (items.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    setPlaced(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (placed) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center animate-scale-in">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Order Placed!</h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
            Thank you for your purchase. You'll receive a confirmation email shortly with your order details.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button onClick={() => navigate('/dashboard')} className="rounded-full px-6">View Orders</Button>
            <Button variant="outline" onClick={() => navigate('/products')} className="rounded-full px-6">Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 50 ? 0 : 5.99;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Progress Steps */}
      <div className="mb-10 flex items-center justify-center gap-4">
        {[
          { num: 1, label: 'Shipping', icon: Truck },
          { num: 2, label: 'Payment', icon: CreditCard },
          { num: 3, label: 'Confirm', icon: Lock },
        ].map(({ num, label, icon: Icon }) => (
          <React.Fragment key={num}>
            {num > 1 && <div className={`h-px w-10 ${step >= num ? 'bg-secondary' : 'bg-border'}`} />}
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                step >= num ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className={`hidden text-xs font-medium sm:inline ${step >= num ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-foreground animate-fade-in">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2 animate-fade-in">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
              <Truck className="h-5 w-5 text-secondary" /> Shipping Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label><Input required placeholder="John Doe" className="mt-1.5 rounded-xl" onFocus={() => setStep(1)} /></div>
              <div><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label><Input required type="email" placeholder="john@example.com" className="mt-1.5 rounded-xl" /></div>
              <div className="md:col-span-2"><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</Label><Input required placeholder="123 Main St, Apt 4B" className="mt-1.5 rounded-xl" /></div>
              <div><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">City</Label><Input required placeholder="New York" className="mt-1.5 rounded-xl" /></div>
              <div><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Zip Code</Label><Input required placeholder="10001" className="mt-1.5 rounded-xl" /></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
              <CreditCard className="h-5 w-5 text-secondary" /> Payment Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2"><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Card Number</Label><Input required placeholder="4242 4242 4242 4242" className="mt-1.5 rounded-xl" onFocus={() => setStep(2)} /></div>
              <div><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiry Date</Label><Input required placeholder="MM/YY" className="mt-1.5 rounded-xl" /></div>
              <div><Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CVV</Label><Input required placeholder="123" className="mt-1.5 rounded-xl" /></div>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full gap-2 rounded-full text-base" onClick={() => setStep(3)}>
            <Lock className="h-4 w-4" /> Place Order — ${(totalPrice + shipping).toFixed(2)}
          </Button>
        </form>

        <div className="animate-fade-in-right">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-elevated">
            <h3 className="text-lg font-bold text-foreground">Order Summary</h3>
            <div className="mt-5 max-h-60 space-y-3 overflow-y-auto custom-scrollbar">
              {items.map(({ product, quantity }) => (
                <div key={product._id} className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-success font-medium' : ''}>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
                <span>Total</span><span>${(totalPrice + shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
