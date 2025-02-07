"use server";

import { PaymentData } from "../types";

const URL = process.env.BLINK_API_URL;
const API_KEY = process.env.BLINK_API_KEY;
const SECRET = process.env.BLINK_API_SECRET;

export const generateToken = async () => {
  const reqBody: {
    api_key: string | undefined;
    secret_key: string | undefined;
    address_postcode_required: boolean;
    enable_moto_payments: boolean;
    application_name: string;
  } = {
    api_key: API_KEY,
    secret_key: SECRET,
    address_postcode_required: true,
    enable_moto_payments: true,
    application_name: "API test",
  };
  try {
    const response = await fetch(`${URL}/tokens`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Token generation failed. Status: " + response.status);
    }
    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const createIntent = async (accessToken: string) => {
  const reqBody = {
    transaction_type: "SALE",
    payment_type: "credit-card",
    amount: 1.01,
    currency: "GBP",
    card_layout: "single-line",
    delay_capture_days: 0,
    return_url: "http://localhost:3000/success",
    notification_url: "http://localhost:3000/notification",
  };
  try {
    const response = await fetch(`${URL}/intents`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return { success: true, ...data };
  } catch (error) {
    if (error instanceof Error) return error?.message;
    return { success: false, error: error };
  }
};

export const makePaymentEcom = async (data: PaymentData) => {
  const {
    device_capabilities,
    device_accept_language,
    device_screen_resolution,
    device_timezone,
    remote_address,
    accessToken,
    payment_intent,
    paymentToken,
    type,
    customer_email,
    customer_name,
    transaction_unique,
  } = data;

  const body = {
    payment_intent,
    paymentToken,
    type,
    customer_email,
    customer_name,
    transaction_unique,
    device_capabilities,
    device_accept_language,
    device_screen_resolution,
    device_timezone,
    remote_address,
  };
  console.log(body);
  try {
    const response = await fetch(`${URL}/creditcards`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Accept-Charset": "UTF-8",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) return error?.message;
    return error;
  }
};
