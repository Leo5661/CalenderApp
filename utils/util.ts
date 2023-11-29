import { Dayjs } from 'dayjs'
import dayjs from '@/utils/dayjsInstance'
import { EventItem } from '@/redux/slices/eventSlice'
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

export const getSelectedDateTime = (
  selectedDate: Dayjs,
  time: string,
): Dayjs => {
  const dateTimeString = `${selectedDate.format('DD-MM-YYYY')} ${time}`
  const format = 'DD-MM-YYYY hh:mm A'
  return dayjs(dateTimeString, format)
} // Outputs: Sat, 01 Jan 2022 14:30:00 GMT

export const getTask = (
  list: EventItem[],
  date: string | Dayjs,
): EventItem[] => {
  let filterDate: Dayjs

  if (typeof date === 'string') {
    filterDate = dayjs(date)
  } else {
    filterDate = date
  }

  return list.filter(
    (item) =>
      dayjs(item.dateTime).format('DD-MM-YYYY') ===
      filterDate.format('DD-MM-YYYY'),
  )
}

export const getTaskByTime = (list: EventItem[], time: Dayjs): EventItem[] => {
  const startTime = time
  const endTime = time.add(1, 'hour')
  return list.filter((item) =>
    dayjs(item.dateTime).isBetween(startTime, endTime, 'minute', '[]'),
  )
}

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.slice(0, length - 1) + '...' : str
}
