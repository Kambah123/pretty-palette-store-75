import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
interface SocialMediaLinksProps {
  variant?: 'header' | 'footer';
  className?: string;
}
const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  variant = 'footer',
  className = ''
}) => {
  const socialLinks = [{
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/siacollections',
    color: 'hover:text-blue-600'
  }, {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/siacollections',
    color: 'hover:text-pink-600'
  }, {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/siacollections',
    color: 'hover:text-blue-400'
  }, {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@siacollections',
    color: 'hover:text-red-600'
  }, {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/company/siacollections',
    color: 'hover:text-blue-700'
  }];
  if (variant === 'header') {
    return <div className={`flex items-center space-x-2 ${className}`}>
        {socialLinks.slice(0, 3).map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors">
            <social.icon className="h-4 w-4" />
            <span className="sr-only">{social.name}</span>
          </a>)}
      </div>;
  }
  return <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`text-gray-400 ${social.color} transition-colors duration-200`}>
          
          <span className="sr-only">{social.name}</span>
        </a>)}
    </div>;
};
export default SocialMediaLinks;