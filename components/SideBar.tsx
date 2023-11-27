import { Calendar } from 'lucide-react'
import CreateEventButton from './CreateEventButton'

function SideBar() {
  return (
    <div className="flex flex-col items-start p-1">
      <div className="flex items-center space-x-1 p-1">
        <Calendar color="orange" />
        <div className="text-xl font-bold text-foreground">Calender</div>
      </div>

      <div className="mt-8 flex flex-col">
        <CreateEventButton />
      </div>
    </div>
  )
}

export default SideBar
