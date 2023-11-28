'use client'

import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import {
  nextMonthSide,
  prevMonthSide,
  setMonth,
  setSelectedDate,
} from '@/redux/slices/MonthSlice'
import { useRouter } from 'next/navigation'
import { getMonth } from '@/utils/util'
import { Button, ButtonGroup } from '@nextui-org/react'
import { Dayjs } from 'dayjs'
import dayjs from '@/utils/dayjsInstance'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Fragment } from 'react'

function SideCalender() {
  const router = useRouter()
  const sideCalMonth = useSelector(
    (state) => state.rootReducer.monthSlice.sideMonth,
  )
  const selectedDate = useSelector(
    (state) => state.rootReducer.monthSlice.selectedDate,
  )
  const dispatch = useDispatch()
  const dayArray = getMonth(sideCalMonth)

  const isCurrentDate = (day: Dayjs): boolean =>
    day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
  const isCurrentMonth = (day: Dayjs) =>
    day.month() === dayjs(new Date(day.date(), sideCalMonth)).month()
  const isSelectedDate = (day: Dayjs): boolean =>
    dayjs(selectedDate).format('DD-MM-YY') === day.format('DD-MM-YY')

  const handleNext = () => {
    dispatch(nextMonthSide())
  }
  const handlePrev = () => {
    dispatch(prevMonthSide())
  }
  const handleDatePress = (day: Dayjs) => {
    const month = day.month()
    dispatch(setMonth(month))
    dispatch(setSelectedDate(day.toString()))
  }

  const handleDoubleClick = (day: Dayjs) => {
    handleDatePress(day)
    router.push('/day')
  }
  return (
    <div className="flex w-60 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex-grow px-4 text-base font-normal text-foreground">
          {dayjs(new Date(dayjs().year(), sideCalMonth)).format('MMMM YYYY')}
        </div>
        <ButtonGroup variant="light" size="sm" radius="none">
          <Button variant="light" isIconOnly onPress={handlePrev}>
            <ChevronLeft size={15} />
          </Button>
          <Button variant="light" isIconOnly onPress={handleNext}>
            <ChevronRight size={15} />
          </Button>
        </ButtonGroup>
      </div>
      <div className="mt-2 grid grid-cols-7 grid-rows-6 border border-foreground/10 p-1">
        {dayArray[0].map((day, index) => (
          <span
            key={index}
            className="text-center text-sm font-medium text-foreground/80"
          >
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {dayArray.map((row: Array<Dayjs>, index: number) => (
          <Fragment key={index}>
            {row.map((day: Dayjs, index2: number) => (
              <Button
                radius="full"
                isIconOnly
                key={index2}
                onPress={() => handleDatePress(day)}
                onDoubleClick={() => handleDoubleClick(day)}
                className={`flex h-5 w-3 items-center justify-center text-xs font-normal text-foreground/60 hover:bg-foreground/5 ${
                  isSelectedDate(day)
                    ? isCurrentDate(day)
                      ? 'bg-purple/80 dark:bg-purple'
                      : 'bg-purple/60 dark:bg-purple/50'
                    : isCurrentDate(day)
                      ? 'bg-purple/80 dark:bg-purple'
                      : 'bg-transparent'
                }`}
              >
                <span
                  className={`
                  ${
                    isCurrentMonth(day)
                      ? isCurrentDate(day)
                        ? 'text-background dark:text-foreground'
                        : 'text-foreground/90'
                      : ''
                  }
                  `}
                >
                  {day.format('D')}
                </span>
              </Button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default SideCalender
