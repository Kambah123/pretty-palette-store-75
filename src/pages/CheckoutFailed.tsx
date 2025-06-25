
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const CheckoutFailed = () => {
  const [searchParams] = useSearchParams();
  const paymentID = searchParams.get('paymentID');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-gray-600 mb-2">
                Unfortunately, your payment could not be processed. This might be due to:
              </p>
              <ul className="text-sm text-gray-500 text-left max-w-md mx-auto space-y-1">
                <li>• Insufficient balance in your bKash account</li>
                <li>• Network connectivity issues</li>
                <li>• Transaction was cancelled</li>
                <li>• Technical issues with the payment gateway</li>
              </ul>
              {paymentID && (
                <p className="text-sm text-gray-500 mt-4">
                  Transaction ID: {paymentID}
                </p>
              )}
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-700">
                Don't worry! Your order is still saved. You can try paying again or choose a different payment method.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checkout">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cart
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutFailed;
