import { User } from '@/types';

export const mockUsers: User[] = [
  { _id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'USER', createdAt: '2024-01-15' },
  { _id: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'USER', createdAt: '2024-01-20' },
  { _id: 'user3', name: 'Admin User', email: 'admin@shopez.com', role: 'ADMIN', createdAt: '2024-01-01' },
  { _id: 'user4', name: 'Mike Johnson', email: 'mike@example.com', role: 'USER', createdAt: '2024-02-05' },
  { _id: 'user5', name: 'Sarah Williams', email: 'sarah@example.com', role: 'USER', createdAt: '2024-02-12' },
  { _id: 'user6', name: 'David Brown', email: 'david@example.com', role: 'USER', createdAt: '2024-02-28' },
  { _id: 'user7', name: 'Emily Davis', email: 'emily@example.com', role: 'USER', createdAt: '2024-03-01' },
  { _id: 'user8', name: 'Chris Wilson', email: 'chris@example.com', role: 'ADMIN', createdAt: '2024-03-05' },
];
