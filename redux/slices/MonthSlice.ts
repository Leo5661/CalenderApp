import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dayjs from '@/utils/dayjsInstance'

type Month = {
  month: number
  sideMonth: number
  selectedDate: string
}

const initialState: Month = {
  selectedDate: dayjs().toString(),
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
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload
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
  setSelectedDate,
} = monthSlice.actions
export default monthSlice.reducer
