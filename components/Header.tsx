'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Button, ButtonGroup } from '@nextui-org/react'
import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import {
  nextMonth,
  prevMonth,
  resetMonth,
  setSelectedDate,
} from '@/redux/slices/MonthSlice'
import dayjs from '@/utils/dayjsInstance'
import { usePathname } from 'next/navigation'

function Header() {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const month = useSelector((state) => state.rootReducer.monthSlice.month)
  const selectDay = useSelector(
    (state) => state.rootReducer.monthSlice.selectedDate,
  )

  const isDayPage = pathname === '/day'

  const handleReset = () => {
    dispatch(resetMonth())
  }

  const handleNextMonth = () => {
    dispatch(nextMonth())
  }

  const handlePrevMonth = () => {
    dispatch(prevMonth())
  }

  const handlePrevDay = () => {
    const date = dayjs(selectDay)
    const prevDay = date.subtract(1, 'day')
    dispatch(setSelectedDate(prevDay.toString()))
  }

  const handleNextDay = () => {
    const date = dayjs(selectDay)
    const nextDay = date.add(1, 'day')
    dispatch(setSelectedDate(nextDay.toString()))
  }

  const handleResetDay = () => {
    const date = dayjs()
    dispatch(setSelectedDate(date.toString()))
  }

  return (
    <header className="flex w-full items-center justify-between px-8 py-1">
      <div className="flex items-center">
        <div className="px-4 text-xl font-normal text-foreground">
          {dayjs(new Date(dayjs().year(), month)).format('MMMM YYYY')}
        </div>
        <Button
          onPress={isDayPage ? handleResetDay : handleReset}
          variant="bordered"
          size="sm"
          radius="sm"
        >
          Today
        </Button>
        <ButtonGroup variant="light" className="ml-4">
          <Button
            variant="light"
            size="sm"
            radius="sm"
            isIconOnly
            onPress={isDayPage ? handlePrevDay : handlePrevMonth}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="light"
            size="sm"
            radius="sm"
            isIconOnly
            onPress={isDayPage ? handleNextDay : handleNextMonth}
          >
            <ChevronRight />
          </Button>
        </ButtonGroup>
      </div>
      <ThemeSwitcher />
    </header>
  )
}

export default Header
