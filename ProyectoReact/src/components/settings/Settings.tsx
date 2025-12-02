import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { User as UserIcon, Lock, Bell, Palette, Monitor, Smartphone } from 'lucide-react';
import { User } from '../../App';
import { toast } from 'sonner@2.0.3';

type SettingsProps = {
  user: User;
};

export function Settings({ user }: SettingsProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState('Passionate about cybersecurity and ethical hacking.');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newChallenges: true,
    rankChanges: true,
    achievements: true,
  });
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#24eef7');

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    toast.success('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? '2FA disabled' : '2FA enabled');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-2">Settings</h1>
        <p className="text-[#c9c9c9]">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-[#111111] border border-[#24eef7]/20">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <UserIcon className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <h3 className="text-white mb-6">Profile Information</h3>
            
            <div className="space-y-6">
              {/* Avatar */}
              <div>
                <Label className="text-[#c9c9c9] mb-3 block">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-2 border-[#24eef7]">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#24eef7] text-black text-xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-[#24eef7] text-[#24eef7] hover:bg-[#24eef7] hover:text-black">
                      Upload New
                    </Button>
                    <Button variant="outline" className="border-[#ff3b3b] text-[#ff3b3b] hover:bg-[#ff3b3b] hover:text-white">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-[#c9c9c9] mb-2 block">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0c0c0c] border-[#24eef7]/30 text-white"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-[#c9c9c9] mb-2 block">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0c0c0c] border-[#24eef7]/30 text-white"
                />
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="text-[#c9c9c9] mb-2 block">Bio</Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full h-24 bg-[#0c0c0c] border border-[#24eef7]/30 rounded-lg p-3 text-white placeholder:text-[#c9c9c9]/50 focus:border-[#24eef7] focus:outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button
                onClick={handleUpdateProfile}
                className="bg-[#24eef7] hover:bg-[#48e5c2] text-black"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            {/* Change Password */}
            <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
              <h3 className="text-white mb-6">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-[#c9c9c9] mb-2 block">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-[#0c0c0c] border-[#24eef7]/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-[#c9c9c9] mb-2 block">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-[#0c0c0c] border-[#24eef7]/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-[#c9c9c9] mb-2 block">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-[#0c0c0c] border-[#24eef7]/30 text-white"
                  />
                </div>
                <Button
                  onClick={handleChangePassword}
                  className="bg-[#24eef7] hover:bg-[#48e5c2] text-black"
                >
                  Update Password
                </Button>
              </div>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
              <h3 className="text-white mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Enable 2FA</p>
                  <p className="text-[#c9c9c9] text-sm">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                  className="data-[state=checked]:bg-[#24eef7]"
                />
              </div>
            </Card>

            {/* Active Sessions */}
            <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
              <h3 className="text-white mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'New York, US', current: true },
                  { device: 'Safari on iPhone', location: 'New York, US', current: false },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0c0c0c] rounded-lg border border-[#24eef7]/10">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-[#24eef7]" />
                      <div>
                        <p className="text-white">{session.device}</p>
                        <p className="text-[#c9c9c9] text-sm">{session.location}</p>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="text-[#3ef587] text-sm">Current</span>
                    ) : (
                      <Button variant="ghost" className="text-[#ff3b3b] hover:text-[#ff3b3b] hover:bg-[#ff3b3b]/10">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <h3 className="text-white mb-6">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Email Notifications</p>
                  <p className="text-[#c9c9c9] text-sm">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  className="data-[state=checked]:bg-[#24eef7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Push Notifications</p>
                  <p className="text-[#c9c9c9] text-sm">Receive push notifications in browser</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  className="data-[state=checked]:bg-[#24eef7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">New Challenges</p>
                  <p className="text-[#c9c9c9] text-sm">Notify when new challenges are available</p>
                </div>
                <Switch
                  checked={notifications.newChallenges}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newChallenges: checked })}
                  className="data-[state=checked]:bg-[#24eef7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Rank Changes</p>
                  <p className="text-[#c9c9c9] text-sm">Notify when your ranking changes</p>
                </div>
                <Switch
                  checked={notifications.rankChanges}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, rankChanges: checked })}
                  className="data-[state=checked]:bg-[#24eef7]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Achievements</p>
                  <p className="text-[#c9c9c9] text-sm">Notify when you earn badges</p>
                </div>
                <Switch
                  checked={notifications.achievements}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
                  className="data-[state=checked]:bg-[#24eef7]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <h3 className="text-white mb-6">Appearance Settings</h3>
            <div className="space-y-6">
              <div>
                <Label className="text-[#c9c9c9] mb-3 block">Theme</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'dark' ? 'border-[#24eef7] bg-[#24eef7]/5' : 'border-[#24eef7]/20'
                    }`}
                  >
                    <div className="w-full h-20 bg-black rounded-lg mb-3" />
                    <p className="text-white">Dark Mode</p>
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'light' ? 'border-[#24eef7] bg-[#24eef7]/5' : 'border-[#24eef7]/20'
                    }`}
                  >
                    <div className="w-full h-20 bg-white rounded-lg mb-3" />
                    <p className="text-white">Light Mode</p>
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-[#c9c9c9] mb-3 block">Accent Color</Label>
                <div className="grid grid-cols-6 gap-3">
                  {['#24eef7', '#48e5c2', '#b59efe', '#3ef587', '#ffd54f', '#ff3b3b'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        accentColor === color ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div>
                <Label className="text-[#c9c9c9] mb-3 block">Preview</Label>
                <div className="bg-[#0c0c0c] rounded-lg p-6 border border-[#24eef7]/20">
                  <Button className="bg-[#24eef7] hover:bg-[#48e5c2] text-black mb-4">
                    Sample Button
                  </Button>
                  <div className="h-2 rounded-full bg-[#24eef7] w-1/2" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
