
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Award, Heart, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We carefully curate each product to ensure the highest quality for our customers.'
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We listen, learn, and improve based on your feedback.'
    },
    {
      icon: Award,
      title: 'Authentic Products',
      description: 'All our products are 100% authentic and sourced directly from trusted suppliers.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across Bangladesh with careful packaging.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SIA Collections</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted destination for premium beauty products, fashion accessories, and lifestyle essentials in Bangladesh.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with a passion for bringing quality beauty and fashion products to Bangladesh, 
                SIA Collections has grown from a small startup to a trusted name in the industry. 
                We believe that everyone deserves access to premium products at affordable prices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our journey began with a simple mission: to make high-quality makeup, skincare, 
                and fashion accessories accessible to everyone. Today, we serve thousands of 
                satisfied customers across Bangladesh, offering everything from professional 
                makeup kits to designer handbags.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
                    <value.icon className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>Wide range of authentic beauty and fashion products</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>Competitive prices with frequent sales and discounts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>Fast and reliable delivery across Bangladesh</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>Excellent customer service and support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>Easy returns and exchange policy</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
