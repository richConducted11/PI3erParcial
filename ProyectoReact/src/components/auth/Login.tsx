import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

type LoginProps = {
  onLogin: (email: string, password: string, remember: boolean) => void;
  onNavigateToRegister: () => void;
};

export function Login({ onLogin, onNavigateToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onLogin(email, password, remember);
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
          <p className="text-[#c9c9c9]">Master Cybersecurity Through Practice</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#111111] rounded-lg border border-[#24eef7]/20 p-8 glow-cyan">
          <h2 className="text-white mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                  className="border-[#24eef7]/30 data-[state=checked]:bg-[#24eef7] data-[state=checked]:text-black"
                />
                <Label htmlFor="remember" className="text-[#c9c9c9] cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-[#24eef7] hover:text-[#48e5c2] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#24eef7] hover:bg-[#48e5c2] text-black transition-all glow-cyan"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#c9c9c9]">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-[#24eef7] hover:text-[#48e5c2] transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#c9c9c9] mt-6 text-sm">
          Ethical hacking training platform • OWASP Top 10 focused
        </p>
      </div>
    </div>
  );
}
