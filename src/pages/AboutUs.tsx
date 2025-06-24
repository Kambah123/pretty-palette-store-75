
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Users, Award, Sparkles, Globe } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "Every decision we make puts our customers first, ensuring exceptional experiences at every touchpoint."
    },
    {
      icon: Star,
      title: "Quality Excellence",
      description: "We curate only the finest products, maintaining rigorous quality standards across all categories."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building a vibrant community of style enthusiasts who inspire and support each other."
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Continuously evolving our platform and services to meet the changing needs of modern shoppers."
    }
  ];

  const milestones = [
    { year: "2020", event: "Founded with a vision to democratize premium fashion" },
    { year: "2021", event: "Reached 10,000+ satisfied customers" },
    { year: "2022", event: "Expanded to include home & lifestyle products" },
    { year: "2023", event: "Launched exclusive designer collaborations" },
    { year: "2024", event: "Achieved carbon-neutral shipping" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Born from a passion for style and quality, SIA Collections has been transforming 
              the way people discover and experience premium fashion since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To empower individuals to express their unique style through carefully curated, 
                  high-quality products that enhance their lifestyle and confidence. We believe 
                  everyone deserves access to premium fashion and home essentials.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To become the most trusted and beloved destination for style-conscious 
                  individuals worldwide, setting new standards for customer experience, 
                  sustainability, and community engagement in e-commerce.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience we create for our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in premium e-commerce.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-400 to-purple-600 h-full rounded-full"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-pink-600 mb-2">{milestone.year}</div>
                        <p className="text-gray-700">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-pink-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Story
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of our journey as we continue to redefine premium shopping experiences 
            and build a community of style enthusiasts.
          </p>
          <Button variant="secondary" size="cta" className="bg-white text-pink-600 hover:bg-gray-100">
            Explore Collections
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
