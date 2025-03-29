import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  try {
    const API_KEY = process.env.WEATHERAPI_KEY;
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching weather data" }, { status: 500 });
  }
}
