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
        console.log(locData)
        console.log(locData.ip)
        const currency =  locData.currency || "USD";
        const country = locData.country || "Pakistan";

        // 2️⃣ Convert PKR → detected currency
        const convertRes = await fetch(
          `/api/convert?amount=100&from=PKR&to=USD`
        );
        const convertData = await convertRes.json();
        console.log(convertData)
        const convertedAmount =
          typeof convertData.data.conversion_result === "number" ? convertData.data.conversion_result : amount;
      
        setData({ country, currency, convertedAmount });
        console.log(`setData${setData}`)
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
