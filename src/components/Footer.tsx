
import React from 'react';
import { Link } from 'react-router-dom';
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/6d21888a-b154-49d2-a4c3-2fb2c377f1da.png" 
                alt="SIA Collections Logo"
                className="h-8 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted destination for premium beauty products, fashion accessories, and lifestyle essentials.
            </p>
            <SocialMediaLinks variant="footer" />
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-pink-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-pink-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-pink-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?sale=true" className="text-gray-300 hover:text-pink-400 transition-colors">Sale Items</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=makeup" className="text-gray-300 hover:text-pink-400 transition-colors">Makeup</Link></li>
              <li><Link to="/products?category=skincare" className="text-gray-300 hover:text-pink-400 transition-colors">Skincare</Link></li>
              <li><Link to="/products?category=handbags" className="text-gray-300 hover:text-pink-400 transition-colors">Handbags</Link></li>
              <li><Link to="/products?category=shoes" className="text-gray-300 hover:text-pink-400 transition-colors">Shoes</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>📧 hello@siacollections.com</p>
              <p>📞 +880 1XXX-XXXXXX</p>
              <p>📍 Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SIA Collections. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
