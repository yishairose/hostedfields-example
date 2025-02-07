"use client";
import { Button } from "@/components/ui/button";
import { createIntent, generateToken } from "@/lib/actions/blink";
import { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";
import { PaymentIntentResponse } from "@/lib/types";

function PaymentPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [errors, setErrors] = useState<Error | null>(null);
  const [intent, setIntent] = useState<
    null | PaymentIntentResponse | { success: false; error: string }
  >(null);

  useEffect(() => {
    async function initiatePaymentProcess() {
      try {
        const data = await generateToken();
        if (!data.success) throw new Error(data.error);
        console.log(data);
        setAccessToken(data.access_token);
      } catch (error) {
        setErrors(error as Error);
        console.log(error);
      }
    }
    if (!accessToken) initiatePaymentProcess();
  }, [accessToken]);
  return (
    <div>
      {!intent && (
        <Button
          variant="outline"
          onClick={async () => {
            if (!accessToken) return;
            const intent = await createIntent(accessToken);

            setIntent(intent);

            console.log(intent);
          }}
        >
          Buy Now
        </Button>
      )}
      {errors && (
        <div className="text-red-500 w-full text-center">
          <div>{errors.message}</div>
        </div>
      )}
      {intent?.success && accessToken && (
        <PaymentForm
          accessToken={accessToken}
          html={intent?.element.ccElement}
        />
      )}
    </div>
  );
}

export default PaymentPage;
