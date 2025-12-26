import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const amount = Number(searchParams.get("amount")) || 1;
  const from = searchParams.get("from") || "PKR";
  const to = searchParams.get("to") || "USD";

  try {
    const res = await fetch(
      `https://api.exchangerate.host/convert?from=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}&amount=${amount}`
    );
    const data = await res.json();

    const result = typeof data.result === "number" ? data.result : amount;

    return NextResponse.json({ from, to, amount, result });
  } catch (err) {
    console.error("Conversion API failed:", err);
    return NextResponse.json({ from, to, amount, result: amount });
  }
}
