import { Order } from '@/types';

export const mockOrders: Order[] = [
  {
    _id: 'ord1',
    userId: 'user1',
    products: [
      { productId: '1', name: 'Premium Wireless Headphones', quantity: 1, price: 129.99 },
      { productId: '3', name: 'Organic Green Tea Set', quantity: 2, price: 34.99 },
    ],
    totalAmount: 199.97,
    status: 'Completed',
    createdAt: '2024-03-01',
  },
  {
    _id: 'ord2',
    userId: 'user1',
    products: [
      { productId: '4', name: 'Smart Fitness Watch', quantity: 1, price: 199.99 },
    ],
    totalAmount: 199.99,
    status: 'Pending',
    createdAt: '2024-03-10',
  },
  {
    _id: 'ord3',
    userId: 'user2',
    products: [
      { productId: '6', name: 'Running Shoes Pro', quantity: 1, price: 149.99 },
      { productId: '8', name: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
    ],
    totalAmount: 229.98,
    status: 'Pending',
    createdAt: '2024-03-12',
  },
];
