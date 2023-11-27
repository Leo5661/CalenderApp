import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

type Month = {
  month: number
  sideMonth: number
}

const initialState: Month = {
  month: dayjs().month(),
  sideMonth: dayjs().month(),
}

export const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload
    },
    prevMonth: (state) => {
      state.sideMonth = state.month
      state.month--
      state.sideMonth--
    },
    nextMonth: (state) => {
      state.sideMonth = state.month
      state.month++
      state.sideMonth++
    },
    resetMonth: (state) => {
      state.month = dayjs().month()
    },
    prevMonthSide: (state) => {
      state.sideMonth--
    },
    nextMonthSide: (state) => {
      state.sideMonth++
    },
  },
})

export const {
  setMonth,
  nextMonth,
  prevMonth,
  resetMonth,
  prevMonthSide,
  nextMonthSide,
} = monthSlice.actions
export default monthSlice.reducer
