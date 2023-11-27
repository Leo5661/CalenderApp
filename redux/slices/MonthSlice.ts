import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

type Month = {
  month: number
}

const initialState: Month = {
  month: dayjs().month(),
}

export const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
    prevMonth: (state) => {
      state.month--
    },
    nextMonth: (state) => {
      state.month++
    },
    resetMonth: (state) => {
      state.month = dayjs().month()
    },
  },
})

export const { nextMonth, prevMonth, resetMonth } = monthSlice.actions
export default monthSlice.reducer
