import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const amount = Number(searchParams.get("amount")) || 1;
  const from = searchParams.get("from") 
  const to = searchParams.get("to") 
  console.log(`from ${from} to ${to}`)
  try {
 
    const res = await fetch(`https://v6.exchangerate-api.com/v6/9c78ac0ea4dec02eb01bf519/pair/${from}/${to}/${amount}`)
    const data = await res.json();
    
    const result = typeof data.result === "number" ? data.result : amount;
 
    return NextResponse.json({ from, to, amount, data });
  } catch (err) {
    console.error("Conversion API failed:", err);
    return NextResponse.json({ from, to, amount, result: amount });
  }
}
