import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders } from '@/data/mockOrders';
import { Badge } from '@/components/ui/badge';
import { Package, User, ShoppingBag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  const { user } = useAuth();
  const userOrders = mockOrders.filter(o => o.userId === user?._id || user?._id === 'user1');

  return (
    <div className="container mx-auto px-4 py-10">
      {/* User Header */}
      <div className="mb-10 flex items-center gap-5 animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: ShoppingBag, label: 'Total Orders', value: userOrders.length, color: 'text-primary' },
          { icon: Clock, label: 'Pending', value: userOrders.filter(o => o.status === 'Pending').length, color: 'text-secondary' },
          { icon: Package, label: 'Completed', value: userOrders.filter(o => o.status === 'Completed').length, color: 'text-success' },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <div key={label} className={`flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card opacity-0 animate-fade-in stagger-${i + 1}`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-muted ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {userOrders.length === 0 ? (
        <div className="mt-16 text-center animate-fade-in">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Package className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-semibold text-foreground">No orders yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Start shopping to see your orders here.</p>
          <Link to="/products"><Button className="mt-6 rounded-full px-8">Browse Products</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order, i) => (
            <div key={order._id} className={`rounded-2xl border border-border bg-card p-6 shadow-card opacity-0 animate-fade-in hover-lift stagger-${Math.min(i + 1, 8)}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-foreground">Order #{order._id}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Placed on {order.createdAt}</p>
                </div>
                <Badge
                  variant={order.status === 'Completed' ? 'default' : 'secondary'}
                  className="rounded-full px-3"
                >
                  {order.status === 'Completed' ? '✓ ' : '⏳ '}{order.status}
                </Badge>
              </div>
              <div className="mt-4 space-y-2">
                {order.products.map((item, j) => (
                  <div key={j} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4 text-right">
                <span className="text-lg font-bold text-foreground">Total: ${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
