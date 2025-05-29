import Image from 'next/image'
import { matchesType } from '@/types';

const Matches = ({data}:{data:matchesType}) => {
  const getDate = new Date(data?.utcDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='grid grid-cols-3 items-center gap-x-2'> {/* Added items-center and gap-x-2 for better alignment */}
      <div className='w-full flex items-center text-gray-800'>
        {data?.homeTeam?.crest && (
          <div className='w-[20px] h-[20px] md:w-[24px] md:h-[24px] relative mr-2 shrink-0'> {/* Added md size and shrink-0 */}
            <Image src={data.homeTeam.crest} alt={data.homeTeam.name || 'Home team crest'} fill className='object-contain' /> {/* Changed to object-contain */}
          </div>
        )}
        <p className='text-xs sm:text-sm truncate'>{data?.homeTeam?.name || 'Home Team'}</p> {/* Added truncate and default text */}
      </div>
      <div className='px-2 py-1 m-auto flex justify-center items-center bg-gray-100 rounded-md min-w-[50px] text-center'> {/* Adjusted styles */}
        {data?.status === 'FINISHED' ? (
          <p className='text-teal-700 text-xs md:text-sm font-semibold'>{data?.score?.fullTime.home} : {data.score?.fullTime.away}</p>
          ) : (
          <p className='text-gray-700 text-xs md:text-sm font-medium'>{getDate}</p>
        )}
      </div>
      <div className='w-full flex items-center justify-end text-gray-800'>
        <p className='text-xs sm:text-sm text-right truncate'>{data.awayTeam?.name || 'Away Team'}</p> {/* Added truncate and default text */}
        {data?.awayTeam?.crest && (
          <div className='w-[20px] h-[20px] md:w-[24px] md:h-[24px] relative ml-2 shrink-0'> {/* Added md size and shrink-0 */}
            <Image src={data.awayTeam.crest} alt={data.awayTeam.name || 'Away team crest'} fill className='object-contain' /> {/* Changed to object-contain */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Matches