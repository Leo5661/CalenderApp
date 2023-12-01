import { useSelector } from '@/hooks/useReduxHooks'
import { EventItem } from '@/redux/slices/eventSlice'
import { getSelectedDateTime, getTag, getTaskByTime } from '@/utils/util'
import { Divider } from '@nextui-org/react'
import dayjs from '@/utils/dayjsInstance'
import { Tag } from 'lucide-react'

type Props = {
  hour: string
  dayTask: EventItem[]
}
function Hour({ hour, dayTask }: Props) {
  const tag = useSelector((state) => state.tagSlice.tagList)
  const date = dayjs(useSelector((state) => state.monthSlice.selectedDate))
  const timeFilter = getSelectedDateTime(date, hour)
  const taskList = getTaskByTime(dayTask, timeFilter)

  const styleColor = (item: EventItem) => {
    if (item.tagId != undefined && item.tagId !== '') {
      const selectedTag = getTag(tag, item.tagId)
      return selectedTag?.colorCode
    }
    return undefined
  }

  return (
    <div className="flex h-full flex-row items-center justify-start border-b border-foreground/5 px-3 md:px-5">
      <div className="py-3 pr-4 text-xs font-light text-foreground/50 md:py-6">
        {hour}
      </div>
      <Divider orientation="vertical" />
      <div className="flex h-full flex-1 flex-row items-center justify-start gap-1 md:py-4">
        {taskList.length !== 0 &&
          taskList.map((item) => (
            <div
              key={item.id}
              className="flex h-full w-full flex-row items-center space-x-2 rounded-md border border-foreground/10 px-2 md:space-x-5 md:py-1"
            >
              <Tag size={15} color={styleColor(item)} />
              <div className="text-xs font-extralight">{item.title}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Hour
