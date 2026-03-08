import { useState } from 'react';
import { mockProducts } from '@/data/mockProducts';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '', stockQuantity: '' });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => {
    setEditProduct(null);
    setForm({ name: '', description: '', price: '', category: '', image: '', stockQuantity: '' });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, description: p.description, price: p.price.toString(), category: p.category, image: p.image, stockQuantity: p.stockQuantity.toString() });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    if (editProduct) {
      setProducts(prev => prev.map(p => p._id === editProduct._id ? { ...p, ...form, price: parseFloat(form.price), stockQuantity: parseInt(form.stockQuantity) || 0 } : p));
      toast.success('Product updated');
    } else {
      const newProduct: Product = { _id: Date.now().toString(), ...form, price: parseFloat(form.price), stockQuantity: parseInt(form.stockQuantity) || 0, createdAt: new Date().toISOString() };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product created');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p._id !== id));
    toast.info('Product deleted');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} products in your store</p>
        </div>
        <Button onClick={openNew} className="gap-1.5"><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Stock</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge variant="outline">{p.category}</Badge></td>
                <td className="px-4 py-3 font-semibold text-foreground">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.stockQuantity < 15 ? 'destructive' : p.stockQuantity < 30 ? 'secondary' : 'default'}>
                    {p.stockQuantity}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p._id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No products found.</div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle></DialogHeader>
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

export default AdminProducts;
