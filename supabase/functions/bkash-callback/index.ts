
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const url = new URL(req.url);
    const paymentID = url.searchParams.get('paymentID');
    const status = url.searchParams.get('status');

    console.log('bKash callback received:', { paymentID, status });

    if (!paymentID) {
      throw new Error('Payment ID is required');
    }

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

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.id_token;

    if (status === 'success') {
      // Execute payment
      const executeResponse = await fetch(`${Deno.env.get('BKASH_BASE_URL')}/checkout/payment/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': accessToken,
          'X-APP-Key': Deno.env.get('BKASH_APP_KEY') ?? '',
        },
        body: JSON.stringify({
          paymentID: paymentID,
        }),
      });

      const executeData = await executeResponse.json();

      console.log('bKash payment executed:', executeData);

      if (executeData.transactionStatus === 'Completed') {
        // Update order status to completed
        const { error: updateError } = await supabase
          .from('orders')
          .update({
            payment_status: 'completed',
            status: 'confirmed'
          })
          .eq('bkash_transaction_id', paymentID);

        if (updateError) {
          console.error('Failed to update order status:', updateError);
        }

        // Clear user's cart
        const { data: orderData } = await supabase
          .from('orders')
          .select('user_id')
          .eq('bkash_transaction_id', paymentID)
          .single();

        if (orderData?.user_id) {
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', orderData.user_id);
        }

        // Redirect to success page
        return new Response(null, {
          status: 302,
          headers: {
            'Location': `${Deno.env.get('SITE_URL')}/checkout/success?paymentID=${paymentID}`,
            ...corsHeaders
          }
        });
      }
    }

    // Payment failed or cancelled
    await supabase
      .from('orders')
      .update({
        payment_status: 'failed'
      })
      .eq('bkash_transaction_id', paymentID);

    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${Deno.env.get('SITE_URL')}/checkout/failed?paymentID=${paymentID}`,
        ...corsHeaders
      }
    });

  } catch (error: any) {
    console.error('Error in bkash-callback function:', error);
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
