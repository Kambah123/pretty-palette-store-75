
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Award, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Beauty for All',
      description: 'We believe every woman deserves to feel beautiful and confident in their own skin.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest products from trusted brands and suppliers worldwide.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide exceptional service and support.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Bringing international beauty trends and products to Bangladesh and beyond.'
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About SIA Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your premier destination for beauty, fashion, and lifestyle products in Bangladesh
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with a passion for beauty and fashion, SIA Collections has grown to become one of Bangladesh's most trusted online retailers. We started with a simple mission: to make high-quality beauty and fashion products accessible to every woman in Bangladesh.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From premium makeup and skincare to stylish handbags and footwear, we curate only the best products that meet our strict quality standards. Our commitment to authenticity, customer service, and competitive pricing has earned us the trust of thousands of satisfied customers.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-4">
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
              <CardTitle>Why Choose SIA Collections?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🌟 Authentic Products</h4>
                  <p className="text-gray-600 text-sm mb-4">All our products are 100% authentic and sourced directly from authorized distributors.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">🚚 Fast Delivery</h4>
                  <p className="text-gray-600 text-sm mb-4">Quick and reliable delivery across Bangladesh with secure packaging.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">💝 Easy Returns</h4>
                  <p className="text-gray-600 text-sm mb-4">Hassle-free 7-day return policy for your peace of mind.</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Expert Curation</h4>
                  <p className="text-gray-600 text-sm">Our beauty experts carefully select every product in our collection.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center bg-gradient-to-r from-pink-50 to-purple-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Have questions or need help? We'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium">
                    Contact Us
                  </button>
                </Link>
                <a href="mailto:hello@siacollections.com" className="border border-pink-600 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-lg font-medium">
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
