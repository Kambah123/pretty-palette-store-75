
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentID = searchParams.get('paymentID');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-gray-600 mb-2">
                Your order has been confirmed and payment has been processed successfully.
              </p>
              {paymentID && (
                <p className="text-sm text-gray-500">
                  Transaction ID: {paymentID}
                </p>
              )}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Package className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">What's Next?</span>
              </div>
              <p className="text-sm text-blue-700">
                We'll send you an email confirmation shortly. Your order will be processed and shipped within 1-2 business days.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account?tab=orders">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  View My Orders
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
