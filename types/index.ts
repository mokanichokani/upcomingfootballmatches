// types/index.ts
export interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  }
  
  export interface Match {
    id: number;
    utcDate: string;
    status: string;
    homeTeam: Team;
    awayTeam: Team;
    competition: {
      id: number;
      name: string;
      code: string;
      type: string;
      emblem: string;
    };
    // Add other fields if needed
  }
  
  export interface MatchesApiResponse {
    filters?: any;
    resultSet?: any;
    matches: Match[];
    error?: string;
    message?: string;
  }
  
  export interface ApiOptions {
    // next?: { // 'next' object for revalidation is used directly in fetch in App Router
    //   revalidate?: number;
    // };
    headers: {
      "X-Auth-Token": string | undefined;
      "Content-Type": string;
    };
    cache?: 'no-store' | 'force-cache'; // For controlling caching in fetch
  }