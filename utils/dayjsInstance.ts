import utc from 'dayjs/plugin/utc'
import arraySupport from 'dayjs/plugin/arraySupport'
import dayjs from 'dayjs'

dayjs.extend(utc)
dayjs.extend(arraySupport)

export default dayjs
