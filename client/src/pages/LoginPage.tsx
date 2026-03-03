import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && !name.trim()) {
      toast.error('Name is required');
      return;
    }

    const isAdminLogin = email === 'admin@shopez.com';
    const mockUser = {
      _id: isAdminLogin ? 'admin1' : 'user1',
      name: isRegister ? name : (isAdminLogin ? 'Admin' : 'John Doe'),
      email,
      role: isAdminLogin ? 'ADMIN' as const : 'USER' as const,
      createdAt: new Date().toISOString(),
    };

    login(mockUser, 'mock-jwt-token');
    toast.success(isRegister ? 'Account created!' : 'Welcome back!');
    navigate(isAdminLogin ? '/admin' : '/');
  };

  return (
    <div className="min-h-[80vh]">
      <div className="grid min-h-[80vh] md:grid-cols-2">
        {/* Left - Image */}
        <div className="hidden bg-hero-gradient md:flex items-center justify-center p-12">
          <div className="max-w-md text-center animate-fade-in">
            <h2 className="font-display text-4xl font-bold text-primary-foreground">
              Welcome to Shop<span className="text-secondary">EZ</span>
            </h2>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Discover curated products for every lifestyle. Join thousands of happy customers.
            </p>
            <img
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&q=80"
              alt="Shopping"
              className="mt-8 rounded-2xl shadow-hero animate-float"
            />
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md animate-fade-in">
            <div className="mb-8">
              <Link to="/" className="font-display text-2xl font-bold text-primary md:hidden">
                Shop<span className="text-secondary">EZ</span>
              </Link>
              <h1 className="mt-4 text-3xl font-bold text-foreground">
                {isRegister ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {isRegister ? 'Sign up to start your shopping journey' : 'Login to access your account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="mt-1.5 rounded-xl" />
                </div>
              )}
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="rounded-xl pr-10"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full gap-2 rounded-full" size="lg">
                {isRegister ? 'Create Account' : 'Login'} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button onClick={() => setIsRegister(!isRegister)} className="font-semibold text-secondary hover:underline">
                {isRegister ? 'Login' : 'Sign Up'}
              </button>
            </p>

            <div className="mt-8 rounded-xl bg-muted p-4">
              <p className="text-xs font-semibold text-foreground">🔑 Demo Credentials</p>
              <p className="mt-1 text-xs text-muted-foreground">Admin: <span className="font-medium text-foreground">admin@shopez.com</span></p>
              <p className="text-xs text-muted-foreground">User: <span className="font-medium text-foreground">any email</span> (any password)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
