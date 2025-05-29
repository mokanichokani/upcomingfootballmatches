// app/api/matches/route.ts
import { NextResponse } from 'next/server';
import type { MatchesApiResponse, ApiOptions, Match } from '@/types'; // Adjust path if needed

const EXTERNAL_API_URL = "https://api.football-data.org/v4/matches";

export async function GET(request: Request) {
  const apiToken = process.env.API_TOKEN;

  if (!apiToken) {
    console.error("API_TOKEN is not defined in environment variables.");
    return NextResponse.json(
      { matches: [], error: "Server configuration error: API token missing." },
      { status: 500 }
    );
  }

  const options: ApiOptions = {
    headers: {
      "X-Auth-Token": apiToken,
      "Content-Type": "application/json",
    },
    // To ensure fresh data on each request to this backend API route:
    // cache: 'no-store', // Or manage revalidation with 'next: { revalidate: seconds }'
    // If you want to cache the result from football-data.org for some time:
    // next: { revalidate: 60 } // Revalidate every 60 seconds
  };

  try {
    // Fetch upcoming matches.
    // The default endpoint /v4/matches usually gives upcoming/recent matches.
    // You might want to add ?status=SCHEDULED if the API tier supports it
    // or filter by date: `${EXTERNAL_API_URL}?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD`
    const response = await fetch(EXTERNAL_API_URL, {
      ...options,
      next: { revalidate: 300 } 
    });


    if (!response.ok) {
      const errorData = await response.json();
      console.error("External API Error:", errorData);
      return NextResponse.json(
        {
          matches: [],
          error: `API Error: ${response.statusText}`,
          message: errorData.message || 'Failed to fetch matches from external API'
        },
        { status: response.status }
      );
    }

    const data: MatchesApiResponse = await response.json();

    // Filter for matches that are 'SCHEDULED' or 'TIMED'
    // The API might also return 'IN_PLAY' if it's very close to now.
    // 'TIMED' means the time is set, 'SCHEDULED' is also for upcoming.
    const upcomingMatches: Match[] = data.matches.filter(
      match => match.status === 'SCHEDULED' || match.status === 'TIMED'
    );

    // If no specific filters applied and you want to ensure only future matches:
    const now = new Date();
    const futureMatches = upcomingMatches.filter(match => new Date(match.utcDate) > now);


    return NextResponse.json({ matches: futureMatches }); // or upcomingMatches if you don't mind very recent ones

  } catch (error: any) {
    console.error("Error in /api/matches route:", error);
    return NextResponse.json(
      { matches: [], error: "Failed to fetch matches.", message: error.message },
      { status: 500 }
    );
  }
}