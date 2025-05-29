import Competition from './Competition' // Assuming Competition.tsx will also adapt to light mode
import {matchesType} from '@/types'
import Matches from './Matches'

const LeagueTable = ({data}:{data:matchesType}) => {
  return (
    <div className='py-3 px-2 md:px-4 rounded-lg flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200'>
      {/* Competition component might need internal styling changes for light mode as well */}
      <div className="mb-2.5"> {/* Added margin-bottom for spacing */}
        <Competition data={data} />
      </div>
      <Matches data={data} />
    </div>
  )
}

export default LeagueTable