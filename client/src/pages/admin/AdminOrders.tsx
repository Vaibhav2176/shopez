import { useState } from 'react';
import { mockOrders } from '@/data/mockOrders';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Package, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Completed'>('all');

  const filtered = orders.filter(o => {
    const matchSearch = o._id.includes(search) || o.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleStatus = (id: string) => {
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status: o.status === 'Pending' ? 'Completed' : 'Pending' } : o));
    toast.success('Order status updated');
  };

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const completedCount = orders.filter(o => o.status === 'Completed').length;
  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">Manage and track all orders</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-primary/10 p-2"><Package className="h-5 w-5 text-primary" /></div>
            <div><p className="text-xl font-bold text-foreground">{orders.length}</p><p className="text-xs text-muted-foreground">Total Orders</p></div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-warning/10 p-2"><Clock className="h-5 w-5 text-warning" /></div>
            <div><p className="text-xl font-bold text-foreground">{pendingCount}</p><p className="text-xs text-muted-foreground">Pending</p></div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-success/10 p-2"><CheckCircle className="h-5 w-5 text-success" /></div>
            <div><p className="text-xl font-bold text-foreground">{completedCount}</p><p className="text-xs text-muted-foreground">Completed</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {(['all', 'Pending', 'Completed'] as const).map(f => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Products</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o._id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">#{o._id}</td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    {o.products.map((p, i) => (
                      <p key={i} className="text-xs text-muted-foreground">{p.name} × {p.quantity}</p>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">${o.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.createdAt}</td>
                <td className="px-4 py-3">
                  <Badge variant={o.status === 'Completed' ? 'default' : 'secondary'}>{o.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="outline" size="sm" onClick={() => toggleStatus(o._id)}>
                    {o.status === 'Pending' ? 'Mark Complete' : 'Reopen'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
