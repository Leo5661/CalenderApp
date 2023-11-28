import { Calendar } from 'lucide-react'
import CreateEventButton from './CreateEventButton'
import SideCalender from './SideCalender'
import { Button, Divider } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import TagsList from './TagsList'

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
        <Divider className="my-4" />
        <div className="flex items-center justify-between">
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
