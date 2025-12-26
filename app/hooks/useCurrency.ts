"use client";
import { useEffect, useState } from "react";

interface CurrencyData {
  country: string;
  currency: string;
  convertedAmount: number;
}

export function useCurrency(amount: number) {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrency() {
      setLoading(true);

      try {
        // 1️⃣ Get dynamic country + currency
        const locRes = await fetch("/api/get-location");
        const locData = await locRes.json();
        const currency = locData.currency || "PKR";
        const country = locData.country || "Pakistan";

        // 2️⃣ Convert PKR → detected currency
        const convertRes = await fetch(
          `/api/convert?amount=${amount}&from=PKR&to=${currency}`
        );
        const convertData = await convertRes.json();
        const convertedAmount =
          typeof convertData.result === "number" ? convertData.result : amount;

        setData({ country, currency, convertedAmount });
      } catch (err) {
        console.error(err);
        setData({ country: "Pakistan", currency: "PKR", convertedAmount: amount });
      } finally {
        setLoading(false);
      }
    }

    fetchCurrency();
  }, [amount]);

  return { data, loading };
}
