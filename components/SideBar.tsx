import { Calendar } from 'lucide-react'
import CreateEventButton from './CreateEventButton'
import SideCalender from './SideCalender'
import { Button, Divider } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import TagsList from './TagsList'

function SideBar() {
  return (
    <div className="flex flex-col items-center p-2 md:items-start md:p-4 ">
      <div className=" mt-4 flex items-center md:mt-1 md:w-full md:items-start md:space-x-1">
        <Calendar color="orange" />
        <div className="hidden text-xl font-bold text-foreground md:flex">
          Calender
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center py-4 md:items-start">
        <CreateEventButton />
        <div className="mt-8 hidden md:flex">
          <SideCalender />
        </div>
        <Divider className="my-4 hidden md:flex" />
        <div className="hidden items-center justify-between md:flex md:w-full">
          <div className="text-sm font-medium text-foreground">Todays Task</div>
          <Button
            size="sm"
            radius="sm"
            variant="light"
            className="text-xs font-light text-foreground/50"
          >
            view more
          </Button>
        </div>
        <Divider className="my-2" />
        <TagsList />
      </div>
    </div>
  )
}

export default SideBar
