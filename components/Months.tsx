'use client'

import Day from './Day'
import { Dayjs } from 'dayjs'
import { Fragment } from 'react'
import { useSelector } from '@/hooks/useReduxHooks'
import { getMonth } from '@/utils/util'

function Months() {
  const month = useSelector((state) => state.rootReducer.monthSlice.month)
  const dayArray = getMonth(month)

  return (
    <div className="grid flex-1 grid-cols-7 grid-rows-5">
      {dayArray.map((row: Array<Dayjs>, index: number) => (
        <Fragment key={index}>
          {row.map((day: Dayjs, index2: number) => (
            <Day day={day} key={index2} rowIndex={index} month={month} />
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export default Months
