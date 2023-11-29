import { useSelector } from '@/hooks/useReduxHooks'
import { EventItem } from '@/redux/slices/eventSlice'
import { getSelectedDateTime, getTaskByTime } from '@/utils/util'
import { Divider } from '@nextui-org/react'
import dayjs from '@/utils/dayjsInstance'

type Props = {
  hour: string
  dayTask: EventItem[]
}
function Hour({ hour, dayTask }: Props) {
  const date = dayjs(useSelector((state) => state.monthSlice.selectedDate))
  const timeFilter = getSelectedDateTime(date, hour)
  const taskList = getTaskByTime(dayTask, timeFilter)

  return (
    <div className="flex flex-row items-center justify-start border-b border-foreground/5 px-5">
      <div className="py-6 pr-4 text-xs font-light text-foreground/50">
        {hour}
      </div>
      <Divider orientation="vertical" />
      <div className="flex flex-1 flex-row items-center justify-start gap-1">
        {taskList.length !== 0 &&
          taskList.map((item) => (
            <div className="mx-1 h-full w-full rounded-md border border-purple/50 px-2 py-1 text-xs font-extralight text-foreground/80">
              {item.title}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Hour
