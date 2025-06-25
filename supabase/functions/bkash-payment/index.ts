
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BkashPaymentRequest {
  amount: number;
  orderId: string;
  customerPhone: string;
  customerName: string;
}

interface BkashCreatePaymentResponse {
  paymentID: string;
  bkashURL: string;
  callbackURL: string;
  successCallbackURL: string;
  failureCallbackURL: string;
  cancelledCallbackURL: string;
  amount: string;
  intent: string;
  currency: string;
  paymentCreateTime: string;
  transactionStatus: string;
  merchantInvoiceNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { amount, orderId, customerPhone, customerName }: BkashPaymentRequest = await req.json();

    console.log('Processing bKash payment request:', { amount, orderId, customerPhone, customerName });

    // Get bKash access token
    const tokenResponse = await fetch(`${Deno.env.get('BKASH_BASE_URL')}/checkout/token/grant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'username': Deno.env.get('BKASH_USERNAME') ?? '',
        'password': Deno.env.get('BKASH_PASSWORD') ?? '',
      },
      body: JSON.stringify({
        app_key: Deno.env.get('BKASH_APP_KEY'),
        app_secret: Deno.env.get('BKASH_APP_SECRET'),
      }),
    });

    if (!tokenResponse.ok) {
      console.error('Failed to get bKash token:', await tokenResponse.text());
      throw new Error('Failed to authenticate with bKash');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.id_token;

    console.log('bKash token obtained successfully');

    // Create payment
    const paymentResponse = await fetch(`${Deno.env.get('BKASH_BASE_URL')}/checkout/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': accessToken,
        'X-APP-Key': Deno.env.get('BKASH_APP_KEY') ?? '',
      },
      body: JSON.stringify({
        mode: '0011',
        payerReference: customerPhone,
        callbackURL: `${Deno.env.get('SUPABASE_URL')}/functions/v1/bkash-callback`,
        amount: amount.toString(),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: orderId,
      }),
    });

    if (!paymentResponse.ok) {
      console.error('Failed to create bKash payment:', await paymentResponse.text());
      throw new Error('Failed to create payment');
    }

    const paymentData: BkashCreatePaymentResponse = await paymentResponse.json();

    console.log('bKash payment created successfully:', paymentData.paymentID);

    // Store payment info in database
    const { error: dbError } = await supabase
      .from('orders')
      .update({
        bkash_transaction_id: paymentData.paymentID,
        payment_status: 'pending'
      })
      .eq('id', orderId);

    if (dbError) {
      console.error('Failed to update order:', dbError);
      throw new Error('Failed to update order status');
    }

    return new Response(JSON.stringify({
      success: true,
      paymentID: paymentData.paymentID,
      bkashURL: paymentData.bkashURL,
      amount: paymentData.amount,
      transactionStatus: paymentData.transactionStatus
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in bkash-payment function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
