"use client";
import { useCurrency } from "./hooks/useCurrency";

export default function CurrencyDisplay() {
  const { data, loading } = useCurrency(1000);
  console.log(data)
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p>Country: {data?.country}</p>
      <p>Currency: {data?.currency}</p>
      <p>
        PKR = {data?.convertedAmount.toFixed(2)} {data?.currency}
      </p>
    </div>
  );
}
