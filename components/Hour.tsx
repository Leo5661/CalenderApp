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
    <div className="flex flex-row items-center justify-start border-b border-foreground/5 px-5">
      <div className="py-6 pr-4 text-xs font-light text-foreground/50">
        {hour}
      </div>
      <Divider orientation="vertical" />
      <div className="flex flex-1 flex-row items-center justify-start gap-1">
        {taskList.length !== 0 &&
          taskList.map((item) => (
            <div
              key={item.id}
              className="flex w-full flex-row items-center space-x-5 rounded-md border border-foreground/10 px-2 py-1"
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
