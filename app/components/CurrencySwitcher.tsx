"use client";
import { useEffect, useState } from "react";

const supportedCurrencies = ["PKR", "USD", "EUR", "AED", "GBP", "INR"];

export default function CurrencySwitcher() {
  const [currency, setCurrency] = useState("PKR");

  useEffect(() => {
    const saved = localStorage.getItem("userCurrency");
    if (saved) setCurrency(saved);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("userCurrency", newCurrency);
    // Trigger hook to refetch conversion
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className="flex justify-center mt-4">
      <select value={currency} onChange={handleChange} className="border px-3 py-2 rounded-md">
        {supportedCurrencies.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
    </div>
  );
}
