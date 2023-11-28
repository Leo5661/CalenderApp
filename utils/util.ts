import dayjs, { Dayjs } from 'dayjs'
export const getMonth = (
  month: number = dayjs().month(),
): Array<Array<Dayjs>> => {
  const year = dayjs().year()
  const firstDay = dayjs(new Date(year, month, 1)).day()
  let startIndexofMatrix = 0 - firstDay
  const dayArray = Array.from({ length: 5 }, () =>
    Array(7)
      .fill(null)
      .map(() => {
        startIndexofMatrix++
        return dayjs(new Date(year, month, startIndexofMatrix))
      }),
  )

  return dayArray
}

export const getHourList = (
  start: string,
  end: string,
  minutes_step: number,
): string[] => {
  const dateStart = dayjs(`2023-11-28T${start}:00`)
  const dateEnd = dayjs(`2023-11-28T${end}:00`)
  const diffInMinutes = dateEnd.diff(dateStart, 'minute')
  const steps = Math.ceil(diffInMinutes / minutes_step)

  const times = Array.from({ length: steps }, (_, i) =>
    dateStart.add(i * minutes_step, 'minute').format('hh:mm A'),
  )

  return times
}
