'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Button, ButtonGroup } from '@nextui-org/react'
import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import { nextMonth, prevMonth, resetMonth } from '@/redux/slices/MonthSlice'
import dayjs from 'dayjs'

function Header() {
  const dispatch = useDispatch()
  const month = useSelector((state) => state.rootReducer.monthSlice.month)

  const handleReset = () => {
    dispatch(resetMonth())
  }

  const handleNextMonth = () => {
    dispatch(nextMonth())
  }

  const handlePrevMonth = () => {
    dispatch(prevMonth())
  }

  return (
    <header className="flex w-full items-center justify-between px-8 py-1">
      <div className="flex items-center">
        <div className="px-4 text-xl font-normal text-foreground">
          {dayjs(new Date(dayjs().year(), month)).format('MMMM YYYY')}
        </div>
        <Button onPress={handleReset} variant="bordered" size="sm" radius="sm">
          Today
        </Button>
        <ButtonGroup variant="light" className="ml-4">
          <Button
            variant="light"
            size="sm"
            radius="sm"
            isIconOnly
            onPress={handlePrevMonth}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="light"
            size="sm"
            radius="sm"
            isIconOnly
            onPress={handleNextMonth}
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
