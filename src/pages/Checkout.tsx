
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Truck, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'bkash',
    shippingMethod: 'standard',
    location: 'dhaka', // 'dhaka' or 'outside'
    transactionId: '',
    paymentProof: null as File | null
  });

  const { cartItems, clearCart } = useCart();
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Dynamic shipping calculation
  const getShippingCost = () => {
    return formData.location === 'dhaka' ? 100 : 200;
  };

  // COD charge calculation (1% for outside Dhaka)
  const getCODCharge = () => {
    if (formData.paymentMethod === 'cod' && formData.location === 'outside') {
      return Math.round(subtotal * 0.01);
    }
    return 0;
  };

  const shipping = getShippingCost();
  const codCharge = getCODCharge();
  const total = subtotal + shipping + codCharge;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, paymentProof: file }));
  };

  const createOrder = async () => {
    if (!user || !userProfile) {
      toast.error('Please log in to place an order');
      return null;
    }

    try {
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userProfile.id,
          total_amount: total,
          status: 'pending',
          payment_status: 'pending',
          payment_method: formData.paymentMethod,
          shipping_address: `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city}, ${formData.zipCode}`,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('Failed to create order');
      }

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items creation error:', itemsError);
        throw new Error('Failed to create order items');
      }

      return orderData;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order');
      return null;
    }
  };

  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if ((formData.paymentMethod === 'bkash' || formData.paymentMethod === 'bank') && !formData.transactionId) {
      toast.error('Please provide transaction ID');
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder();
      if (!order) return;

      // For manual payments, mark as processing and awaiting confirmation
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'processing',
          payment_status: 'pending'
        })
        .eq('id', order.id);

      if (updateError) {
        console.error('Order update error:', updateError);
        toast.error('Failed to confirm order');
        return;
      }

      await clearCart();
      toast.success('Order placed successfully! Please confirm payment via WhatsApp or Facebook.');
      navigate('/account?tab=orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-16 h-1 ${step > stepNumber ? 'bg-pink-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input 
                      id="address" 
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input 
                        id="zipCode" 
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Delivery Location</Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Inside Dhaka</SelectItem>
                        <SelectItem value="outside">Outside Dhaka</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Shipping Cost</h4>
                    <p className="text-sm text-gray-600">
                      {formData.location === 'dhaka' ? 'Inside Dhaka: ৳100' : 'Outside Dhaka: ৳200'}
                    </p>
                    {formData.paymentMethod === 'cod' && formData.location === 'outside' && (
                      <p className="text-sm text-orange-600 mt-1">
                        COD Charge (1%): ৳{getCODCharge()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Label htmlFor="bkash" className="flex-1">
                        <div>bKash (Manual Payment)</div>
                        <div className="text-sm text-gray-500">Send to +880 1671-018279</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1">
                        <div>Bank Transfer</div>
                        <div className="text-sm text-gray-500">BRAC Bank - Account: 2060210520001</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1">
                        <div>Cash on Delivery</div>
                        <div className="text-sm text-gray-500">
                          Pay when you receive your order
                          {formData.location === 'outside' && (
                            <span className="text-orange-600"> (1% COD charge applies)</span>
                          )}
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {step === 4 && (formData.paymentMethod === 'bkash' || formData.paymentMethod === 'bank') && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="payment-info bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Instructions</h3>
                    
                    {formData.paymentMethod === 'bkash' && (
                      <div className="mb-4">
                        <p className="mb-2">
                          <strong className="text-pink-600">bKash (Manual Payment):</strong>
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          Send payment to: <span className="highlight bg-yellow-200 px-2 py-1 rounded font-semibold">+880 1671-018279</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Confirm via WhatsApp or Facebook after sending.
                        </p>
                      </div>
                    )}

                    {formData.paymentMethod === 'bank' && (
                      <div className="mb-4">
                        <p className="mb-2">
                          <strong className="text-purple-600">Bank Transfer (Credit/Debit Card):</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Bank: <span className="font-semibold">BRAC Bank</span></p>
                          <p>Account Name: <span className="font-semibold">SIA Collections</span></p>
                          <p>Account Number: <span className="highlight bg-yellow-200 px-2 py-1 rounded font-semibold">2060210520001</span></p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Send proof of payment to our WhatsApp or Facebook.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="transactionId">Transaction ID / Reference Number *</Label>
                    <Input 
                      id="transactionId" 
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange('transactionId', e.target.value)}
                      placeholder="Enter your transaction ID"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="paymentProof">Payment Screenshot (Optional)</Label>
                    <Input 
                      id="paymentProof" 
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload screenshot of your payment confirmation</p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="contact-buttons mt-6">
                    <h4 className="font-semibold mb-3 text-gray-800">Confirm Your Payment</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href="https://wa.me/8801727627194" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-whatsapp flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Confirm via WhatsApp
                      </a>
                      <a 
                        href="https://www.facebook.com/siacollections.sadiaislam" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-facebook flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                      >
                        <Phone className="h-4 w-4" />
                        Message on Facebook
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {((step === 4 && formData.paymentMethod === 'cod') || step === 5) && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.phone}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.zipCode}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Payment Method</h4>
                      <p className="text-sm text-gray-600">
                        {formData.paymentMethod === 'bkash' && 'bKash Payment'}
                        {formData.paymentMethod === 'bank' && 'Bank Transfer'}
                        {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Shipping</h4>
                      <p className="text-sm text-gray-600">
                        {formData.location === 'dhaka' ? 'Inside Dhaka (৳100)' : 'Outside Dhaka (৳200)'}
                      </p>
                    </div>
                  </div>

                  {formData.paymentMethod === 'cod' && (
                    <div className="contact-buttons mt-6">
                      <h4 className="font-semibold mb-3 text-gray-800">Need Help?</h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a 
                          href="https://wa.me/8801727627194" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-whatsapp flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Chat on WhatsApp
                        </a>
                        <a 
                          href="https://www.facebook.com/siacollections.sadiaislam" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-facebook flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                        >
                          <Phone className="h-4 w-4" />
                          Message on Facebook
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={step === 1 || loading}
              >
                Back
              </Button>
              <Button 
                onClick={step >= 4 && (formData.paymentMethod === 'cod' || step === 5) ? handlePlaceOrder : handleNext}
                className="bg-pink-600 hover:bg-pink-700"
                disabled={loading}
              >
                {loading ? 'Processing...' : (step >= 4 && (formData.paymentMethod === 'cod' || step === 5) ? 'Place Order' : 'Continue')}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img 
                      src={item.product.images[0] || '/placeholder.svg'} 
                      alt={item.product.name} 
                      className="w-12 h-12 object-cover rounded" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">৳{item.product.price * item.quantity}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping ({formData.location === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                    <span>৳{shipping}</span>
                  </div>
                  {codCharge > 0 && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>COD Charge (1%)</span>
                      <span>৳{codCharge}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>৳{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
