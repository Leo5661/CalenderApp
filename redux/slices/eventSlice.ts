import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type EventItem = {
  id: string
  title: string
  dateTime: string
  meetLink?: string
  location?: string
  description?: string
  tagId?: string
}

type EventSlice = {
  eventList: EventItem[]
}

const initialState: EventSlice = {
  eventList: [],
}

export const eventSlice = createSlice({
  name: 'Event',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventItem>) => {
      state.eventList.splice(state.eventList.length, 0, action.payload)
    },
    removeEvent: (state, action: PayloadAction<EventItem>) => {
      const itemIndex = state.eventList.findIndex(
        (item) => item.id === action.payload.id,
      )

      state.eventList.splice(itemIndex, 1)
    },
    updateEvent: (state, action: PayloadAction<EventItem>) => {
      state.eventList.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      )
    },
  },
})

export const { addEvent, removeEvent, updateEvent } = eventSlice.actions
export default eventSlice.reducer
