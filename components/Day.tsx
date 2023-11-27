import dayjs, { Dayjs } from 'dayjs'

type Props = {
  day: Dayjs
  rowIndex: number
  month: number
}
function Day({ day, rowIndex, month }: Props) {
  const isCurrentDate = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
  const isCurrentMonth =
    day.month() === dayjs(new Date(day.date(), month)).month()

  return (
    <div
      className={`flex flex-col items-center justify-start border border-foreground/5 ${
        isCurrentMonth ? 'bg-background' : 'bg-foreground/5'
      }`}
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
    </div>
  )
}

export default Day
