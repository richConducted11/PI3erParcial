import { useState } from 'react';
import { Shield, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type RegisterProps = {
  onRegister: (name: string, email: string, password: string) => void;
  onNavigateToLogin: () => void;
};

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onRegister(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#24eef7 1px, transparent 1px), linear-gradient(90deg, #24eef7 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#24eef7] to-[#b59efe] mb-4 glow-cyan">
            <Shield className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-[#24eef7] uppercase tracking-wider mb-2">HackLab</h1>
          <p className="text-[#c9c9c9]">Begin Your Journey in Cybersecurity</p>
        </div>

        {/* Register Form */}
        <div className="bg-[#111111] rounded-lg border border-[#24eef7]/20 p-8 glow-cyan">
          <h2 className="text-white mb-6">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-[#c9c9c9]">Full Name</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#48e5c2]" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className="pl-11 bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50 focus:border-[#24eef7] focus:ring-[#24eef7]/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-[#ff3b3b] text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-[#c9c9c9]">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#48e5c2]" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className="pl-11 bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50 focus:border-[#24eef7] focus:ring-[#24eef7]/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-[#ff3b3b] text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-[#c9c9c9]">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#48e5c2]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className="pl-11 pr-11 bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50 focus:border-[#24eef7] focus:ring-[#24eef7]/20 transition-all"
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#48e5c2] hover:text-[#24eef7] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-[#ff3b3b] text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-[#c9c9c9]">Confirm Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#48e5c2]" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  className="pl-11 pr-11 bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50 focus:border-[#24eef7] focus:ring-[#24eef7]/20 transition-all"
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#48e5c2] hover:text-[#24eef7] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[#ff3b3b] text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#24eef7] hover:bg-[#48e5c2] text-black transition-all glow-cyan"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#c9c9c9]">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-[#24eef7] hover:text-[#48e5c2] transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#c9c9c9] mt-6 text-sm">
          By creating an account, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
