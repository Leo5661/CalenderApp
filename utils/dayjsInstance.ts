import utc from 'dayjs/plugin/utc'
import arraySupport from 'dayjs/plugin/arraySupport'
import isBetween from 'dayjs/plugin/isBetween'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

dayjs.extend(utc)
dayjs.extend(arraySupport)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

export default dayjs
