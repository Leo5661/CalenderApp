'use client'
import { useSelector } from '@/hooks/useReduxHooks'
import { getHourList } from '@/utils/util'
import Hour from './Hour'
import dayjs from '@/utils/dayjsInstance'
import { Divider } from '@nextui-org/react'
function Date() {
  const date = useSelector((state) => state.rootReducer.monthSlice.selectedDate)
  const selectedDate = dayjs(date)
  const hourArray = getHourList('00:00', '24:00', 60)

  return (
    <div className="relative flex h-full flex-1 flex-col">
      <div className="sticky top-0 flex flex-col ">
        <div className=" flex flex-col items-start justify-start px-12 py-2">
          <div className="text-sm font-normal uppercase text-foreground">
            {selectedDate.format('dddd')}
          </div>
          <div className="text-xl font-semibold text-foreground">
            {selectedDate.format('DD')}
          </div>
        </div>
        <Divider />
      </div>
      <div className="grid-rows-24 grid grid-cols-1 overflow-y-scroll pl-10">
        {hourArray.map((hour, index) => (
          <Hour key={index} hour={hour} />
        ))}
      </div>
    </div>
  )
}

export default Date
