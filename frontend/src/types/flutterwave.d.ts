declare global {
  interface Window {
    FlutterwaveCheckout?: (options: FlutterwaveCheckoutOptions) => void;
  }
}

export interface FlutterwaveCheckoutOptions {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options?: string;
  redirect_url?: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>;
  callback: (response: FlutterwavePaymentResponse) => void;
  onclose?: () => void;
}

export interface FlutterwavePaymentResponse {
  status: 'successful' | 'cancelled' | 'failed';
  transaction_id?: string;
  tx_ref?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export {};

