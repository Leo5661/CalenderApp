import { Calendar } from 'lucide-react'
import CreateEventButton from './CreateEventButton'
import SideCalender from './SideCalender'

function SideBar() {
  return (
    <div className="flex flex-col items-start p-4">
      <div className=" flex w-full items-start space-x-1">
        <Calendar color="orange" />
        <div className="text-xl font-bold text-foreground">Calender</div>
      </div>

      <div className="mt-8 flex flex-col py-4">
        <CreateEventButton />
        <div className="mt-8">
          <SideCalender />
        </div>
      </div>
    </div>
  )
}

export default SideBar
