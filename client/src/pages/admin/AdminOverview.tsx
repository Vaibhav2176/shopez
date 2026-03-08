import { mockProducts } from '@/data/mockProducts';
import { mockOrders } from '@/data/mockOrders';
import { mockUsers } from '@/data/mockUsers';
import { ShoppingBag, Package, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminOverview = () => {
  const totalRevenue = mockOrders.reduce((s, o) => s + o.totalAmount, 0);
  const pendingOrders = mockOrders.filter(o => o.status === 'Pending').length;
  const completedOrders = mockOrders.filter(o => o.status === 'Completed').length;

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, change: '+12.5%', up: true, color: 'text-success' },
    { label: 'Products', value: mockProducts.length, icon: ShoppingBag, change: '+3', up: true, color: 'text-secondary' },
    { label: 'Orders', value: mockOrders.length, icon: Package, change: '+8.2%', up: true, color: 'text-primary' },
    { label: 'Users', value: mockUsers.length, icon: Users, change: '+5', up: true, color: 'text-accent-foreground' },
  ];

  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.up ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                    <span className="text-xs text-success font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`rounded-xl bg-muted p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">#{order._id}</p>
                    <p className="text-xs text-muted-foreground">{order.products.length} items · {order.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">${order.totalAmount.toFixed(2)}</span>
                    <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProducts.filter(p => p.stockQuantity < 30).slice(0, 5).map((product) => (
                <div key={product._id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <Badge variant={product.stockQuantity < 15 ? 'destructive' : 'secondary'}>
                    {product.stockQuantity} left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
