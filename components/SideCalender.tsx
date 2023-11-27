'use client'

import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import {
  nextMonthSide,
  prevMonthSide,
  setMonth,
} from '@/redux/slices/MonthSlice'
import { getMonth } from '@/utils/util'
import { Button, ButtonGroup } from '@nextui-org/react'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Fragment, useEffect } from 'react'

function SideCalender() {
  const mainMonth = useSelector((state) => state.rootReducer.monthSlice.month)
  const sideCalMonth = useSelector(
    (state) => state.rootReducer.monthSlice.sideMonth,
  )
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  const dayArray = getMonth(sideCalMonth)

  const isCurrentDate = (day: Dayjs): boolean =>
    day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
  const isCurrentMonth = (day: Dayjs) =>
    day.month() === dayjs(new Date(day.date(), sideCalMonth)).month()

  const handleNext = () => {
    dispatch(nextMonthSide())
  }
  const handlePrev = () => {
    dispatch(prevMonthSide())
  }
  const handleDatePress = (day: Dayjs) => {
    const month = day.month()
    dispatch(setMonth(month))
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
                className={`flex h-5 w-3 items-center justify-center text-xs font-normal text-foreground/60 hover:bg-foreground/5 ${
                  isCurrentDate(day)
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
