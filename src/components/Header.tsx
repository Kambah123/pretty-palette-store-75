
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Search, User, Heart, ShoppingCart, Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [wishlistCount] = useState(3);
  const { user, userProfile, signOut } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  
  const navigationItems = ['Sale', 'Makeup', 'Skincare', 'Home', 'Shoes', 'Handbags', 'Accessories', 'Clothing', 'Kids', 'Men', 'Minis', 'Designer'];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const NavigationMenu = ({ mobile = false }) => (
    <nav className={mobile ? "flex flex-col space-y-4" : "hidden lg:flex lg:items-center lg:space-x-8"}>
      {navigationItems.map(item => (
        <Link 
          key={item} 
          to={`/products?category=${item.toLowerCase()}`} 
          className={`${mobile ? 'text-lg font-medium py-2' : 'text-sm font-medium'} text-gray-700 hover:text-pink-600 transition-colors relative group`}
        >
          {item}
          {item === 'Sale' && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0">
              Hot
            </Badge>
          )}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-200 group-hover:w-full"></span>
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-2 text-sm">
        <p>Free shipping on orders over $50! 🚚</p>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/lovable-uploads/6d21888a-b154-49d2-a4c3-2fb2c377f1da.png" alt="SIA Collections Logo" className="h-10 w-auto" />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className={`relative w-full transition-all duration-200 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 pr-4 w-full rounded-full border-2 border-gray-200 focus:border-pink-500 transition-colors" 
                onFocus={() => setIsSearchFocused(true)} 
                onBlur={() => setIsSearchFocused(false)} 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </Link>
                {userProfile?.user_role === 'admin' || userProfile?.user_role === 'super_admin' ? (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="text-pink-600 border-pink-600 hover:bg-pink-50">
                      Admin
                    </Button>
                  </Link>
                ) : null}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSignOut}
                  className="hover:bg-pink-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <div className="flex flex-col h-full">
                  {/* Mobile Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search products..." className="pl-10 pr-4 w-full" />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <NavigationMenu mobile />

                  {/* Mobile Action Buttons */}
                  <div className="mt-auto pt-6 border-t space-y-4">
                    {user ? (
                      <>
                        <Link to="/account" className="block">
                          <Button variant="outline" className="w-full">
                            My Account
                          </Button>
                        </Link>
                        {userProfile?.user_role === 'admin' || userProfile?.user_role === 'super_admin' ? (
                          <Link to="/admin" className="block">
                            <Button variant="outline" className="w-full">
                              Admin Panel
                            </Button>
                          </Link>
                        ) : null}
                        <Button onClick={handleSignOut} variant="outline" className="w-full">
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block">
                          <Button className="w-full bg-pink-600 hover:bg-pink-700">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/register" className="block">
                          <Button variant="outline" className="w-full">
                            Create Account
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="border-t border-gray-200 py-4">
          <NavigationMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
