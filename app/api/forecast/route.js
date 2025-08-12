import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const days = searchParams.get("days") || 3; // Default to 3-day forecast

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  try {
    const API_KEY = process.env.WEATHERAPI_KEY;
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching forecast data" }, { status: 500 });
  }
}
