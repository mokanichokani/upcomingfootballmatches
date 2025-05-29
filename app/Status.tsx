"use client"

import {useState} from 'react'
import { matchesType } from '@/types'
import LeagueTable from './LeagueTable'

const Status = ({matchesList,matchesListFinished}:{matchesList:matchesType[], matchesListFinished:matchesType[]}) => {

  const [statusMatch, setStatusMatch] = useState("TODAY")

  return (
    <div>
      <div className='flex space-x-3 md:space-x-4 mb-4 md:mb-6'> {/* Increased spacing slightly */}
        <button
          onClick={() => setStatusMatch("TODAY")}
          className={`px-3 py-1.5 text-xs md:text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75
            ${statusMatch === 'TODAY'
              ? 'bg-teal-500 text-white font-semibold shadow-sm hover:bg-teal-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium'
            }`}
        >
          Today
        </button>
        <button
          onClick={() => setStatusMatch("FINISHED")}
          className={`px-3 py-1.5 text-xs md:text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75
            ${statusMatch === 'FINISHED'
              ? 'bg-teal-500 text-white font-semibold shadow-sm hover:bg-teal-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium'
            }`}
        >
          Finished
        </button>
      </div>

      <div className='w-full space-y-2'> {/* Added space-y-2 for consistent spacing between LeagueTable items */}
        {statusMatch === "TODAY" && (
          matchesList.map((data) => (
            data?.status === "TIMED" && (
              <LeagueTable key={data.id} data={data} />
            )
          ))
        )}

        {statusMatch === "FINISHED" && (
          <>
            {matchesList.map((data) => (
              data?.status === "FINISHED" && (
                <LeagueTable key={`finished-${data.id}`} data={data} />
              )
            ))}
            {matchesListFinished.map((data) => (
              <LeagueTable key={`finished-list-${data.id}`} data={data} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Status