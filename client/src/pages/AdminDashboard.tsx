import React, { useState } from 'react';
import { mockProducts } from '@/data/mockProducts';
import { mockOrders } from '@/data/mockOrders';
import { Product, Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus, Package, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '', stockQuantity: '' });

  const openNew = () => {
    setEditProduct(null);
    setForm({ name: '', description: '', price: '', category: '', image: '', stockQuantity: '' });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      category: p.category,
      image: p.image,
      stockQuantity: p.stockQuantity.toString(),
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error('Name and price are required');
      return;
    }
    if (editProduct) {
      setProducts(prev => prev.map(p => p._id === editProduct._id ? {
        ...p, ...form, price: parseFloat(form.price), stockQuantity: parseInt(form.stockQuantity) || 0,
      } : p));
      toast.success('Product updated');
    } else {
      const newProduct: Product = {
        _id: Date.now().toString(),
        ...form,
        price: parseFloat(form.price),
        stockQuantity: parseInt(form.stockQuantity) || 0,
        createdAt: new Date().toISOString(),
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product created');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p._id !== id));
    toast.info('Product deleted');
  };

  const toggleOrderStatus = (id: string) => {
    setOrders(prev => prev.map(o => o._id === id ? {
      ...o, status: o.status === 'Pending' ? 'Completed' : 'Pending'
    } : o));
    toast.success('Order status updated');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your store</p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{orders.length}</p>
              <p className="text-xs text-muted-foreground">Orders</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success font-bold">$</div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${orders.reduce((s, o) => s + o.totalAmount, 0).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="products" className="mt-8">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="mb-4 flex justify-end">
            <Button onClick={openNew} className="gap-1"><Plus className="h-4 w-4" /> Add Product</Button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Stock</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 text-foreground">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-foreground">{p.stockQuantity}</td>
                    <td className="flex justify-end gap-2 px-4 py-3">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p._id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Items</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">#{o._id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.products.length} items</td>
                    <td className="px-4 py-3 text-foreground">${o.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={o.status === 'Completed' ? 'default' : 'secondary'}>{o.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="outline" size="sm" onClick={() => toggleOrderStatus(o._id)}>
                        Toggle Status
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Description</Label><Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Price</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
              <div><Label>Stock</Label><Input type="number" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: e.target.value })} /></div>
            </div>
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} /></div>
            <Button onClick={handleSave} className="w-full">{editProduct ? 'Update' : 'Create'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
