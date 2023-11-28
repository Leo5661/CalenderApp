import { Modal, useDisclosure, ModalContent } from '@nextui-org/react'
import { Dayjs } from 'dayjs'
import dayjs from '@/utils/dayjsInstance'
import EventModal from './EventModal'
import { useDispatch } from '@/hooks/useReduxHooks'
import { setSelectedDate } from '@/redux/slices/MonthSlice'

type Props = {
  day: Dayjs
  rowIndex: number
  month: number
}
function Day({ day, rowIndex, month }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const dispatch = useDispatch()
  const isCurrentDate = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
  const isCurrentMonth =
    day.month() === dayjs(new Date(day.date(), month)).month()

  const handleClick = () => {
    dispatch(setSelectedDate(day.toString()))
    onOpen()
  }

  return (
    <div
      className={`flex flex-col items-center justify-start border border-foreground/5 ${
        isCurrentMonth ? 'bg-background' : 'bg-foreground/5'
      }`}
      onClick={handleClick}
    >
      {rowIndex === 0 && (
        <div className="mt-2 text-sm font-semibold uppercase text-foreground/80">
          {day.format('ddd')}
        </div>
      )}
      <div
        className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full p-1 ${
          isCurrentDate && 'bg-purple/80 dark:bg-purple'
        }`}
      >
        <div
          className={`text-sm font-normal ${
            isCurrentDate
              ? 'text-background dark:text-foreground'
              : 'text-foreground/60'
          }`}
        >
          {day.date()}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        radius="md"
      >
        <ModalContent>
          {(onClose) => <EventModal onClose={onClose} />}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Day
