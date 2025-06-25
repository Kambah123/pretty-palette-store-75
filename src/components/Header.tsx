
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  
  const navigationItems = [
    { name: 'Sale', category: 'sale' },
    { name: 'Makeup', category: 'makeup' },
    { name: 'Skincare', category: 'skincare' },
    { name: 'Home', category: 'home' },
    { name: 'Shoes', category: 'shoes' },
    { name: 'Handbags', category: 'handbags' },
    { name: 'Accessories', category: 'accessories' },
    { name: 'Clothing', category: 'clothing' },
    { name: 'Kids', category: 'kids' },
    { name: 'Men', category: 'men' },
    { name: 'Minis', category: 'minis' },
    { name: 'Designer', category: 'designer' }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
      setIsSheetOpen(false);
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const NavigationMenu = ({ mobile = false }) => (
    <nav className={mobile ? "flex flex-col space-y-4" : "hidden lg:flex lg:items-center lg:space-x-6"}>
      {navigationItems.map(item => (
        <Link 
          key={item.name} 
          to={`/products?category=${item.category}`} 
          className={`${mobile ? 'text-lg font-medium py-2 px-4 rounded-lg hover:bg-gray-100' : 'text-sm font-medium'} text-gray-700 hover:text-pink-600 transition-colors relative group`}
          onClick={mobile ? handleLinkClick : undefined}
        >
          {item.name}
          {item.name === 'Sale' && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0">
              Hot
            </Badge>
          )}
          {!mobile && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-200 group-hover:w-full"></span>}
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
          <Link to="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
            <img src="/lovable-uploads/6d21888a-b154-49d2-a4c3-2fb2c377f1da.png" alt="SIA Collections Logo" className="h-8 md:h-10 w-auto" />
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
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Account - Desktop */}
            <div className="hidden sm:flex items-center space-x-2">
              {user ? (
                <>
                  <Link to="/account" onClick={handleLinkClick}>
                    <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </Link>
                  {(userProfile?.user_role === 'admin' || userProfile?.user_role === 'super_admin') && (
                    <Link to="/admin" onClick={handleLinkClick}>
                      <Button variant="outline" size="sm" className="text-pink-600 border-pink-600 hover:bg-pink-50 text-xs px-2 py-1">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleSignOut}
                    className="hover:bg-pink-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Sign Out</span>
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={handleLinkClick}>
                  <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Login</span>
                  </Button>
                </Link>
              )}
            </div>

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
            <Link to="/cart" onClick={handleLinkClick}>
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
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 flex flex-col">
                <div className="flex flex-col h-full">
                  {/* Mobile Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search products..." className="pl-10 pr-4 w-full" />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto">
                    <NavigationMenu mobile />
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="mt-auto pt-6 border-t space-y-3">
                    {user ? (
                      <>
                        <Link to="/account" className="block" onClick={handleLinkClick}>
                          <Button variant="outline" className="w-full justify-start">
                            <User className="h-4 w-4 mr-2" />
                            My Account
                          </Button>
                        </Link>
                        {(userProfile?.user_role === 'admin' || userProfile?.user_role === 'super_admin') && (
                          <Link to="/admin" className="block" onClick={handleLinkClick}>
                            <Button variant="outline" className="w-full justify-start">
                              Admin Panel
                            </Button>
                          </Link>
                        )}
                        <Button onClick={handleSignOut} variant="outline" className="w-full justify-start">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block" onClick={handleLinkClick}>
                          <Button className="w-full bg-pink-600 hover:bg-pink-700">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/register" className="block" onClick={handleLinkClick}>
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
