"use client";
import { useEffect } from "react";
import { useCurrency } from "./hooks/useCurrency";

export default  function CurrencyDisplay() {
  const { data, loading } = useCurrency(1000);

  // const response = await fetch("http://localhost:3000/api/geo")

  // const data = await response.json()

  // console.log(data)
  
  if (loading) return <p>Loading...</p>;



  return (
    <div>
      <p>Country: {data?.country}

      </p>

      <p>Currency: {data?.currency}</p>
      <p>
        PKR = {data?.convertedAmount.toFixed(2)} {data?.currency}
      </p>
    </div>
  );
}
