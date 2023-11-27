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
