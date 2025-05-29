// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import type { Match, MatchesApiResponse } from '@/types'; // Adjust path if needed

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/matches');
        if (!response.ok) {
          const errorData: MatchesApiResponse = await response.json();
          throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data: MatchesApiResponse = await response.json();
        if (data.error) {
          throw new Error(data.message || data.error);
        }
        setMatches(data.matches);
      } catch (err: any) {
        console.error("Failed to fetch matches:", err);
        setError(err.message || "Could not load matches.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (utcDate: string) => {
    const date = new Date(utcDate);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <>
      {/* Metadata is handled in app/layout.tsx or page.tsx Server Components for App Router */}
      <main className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center font-sans">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Upcoming Soccer Matches
        </h1>

        {loading && <p className="text-gray-600 text-lg">Loading matches...</p>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <p className="text-gray-600 text-lg">No upcoming matches found or API limit reached.</p>
        )}

        {!loading && !error && matches.length > 0 && (
          <ul className="w-full max-w-2xl space-y-4">
            {matches.map((match) => (
              <li
                key={match.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200 ease-in-out"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-indigo-700 truncate text-center sm:text-left flex-1 mb-2 sm:mb-0">
                    {match.homeTeam.name}
                  </span>
                  <span className="text-gray-500 font-medium mx-2 sm:mx-4">vs</span>
                  <span className="text-lg font-semibold text-indigo-700 truncate text-center sm:text-right flex-1">
                    {match.awayTeam.name}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong className="text-gray-700">Date:</strong> {formatDate(match.utcDate)}
                  </p>
                  <p>
                    <strong className="text-gray-700">Competition:</strong> {match.competition.name}
                  </p>
                  {/* <p>
                    <strong className="text-gray-700">Status:</strong> {match.status}
                  </p> */}
                </div>
              </li>
            ))}
          </ul>
        )}
        <footer className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-500 w-full max-w-2xl">
          Data provided by{' '}
          <a
            href="https://football-data.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            football-data.org
          </a>
        </footer>
      </main>
    </>
  );
}