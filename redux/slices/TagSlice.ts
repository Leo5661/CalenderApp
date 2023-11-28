import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TagItem = {
  name: string
  colorCode: string
  id: number
}

type TagState = {
  tagList: TagItem[]
}

const defaultTags: TagItem[] = [
  {
    name: 'Birthdays',
    colorCode: '#48d4b3',
    id: 1,
  },
  {
    name: 'Reminders',
    colorCode: '#4265b0',
    id: 2,
  },
  {
    name: 'Tasks',
    colorCode: '#b05342',
    id: 3,
  },
  {
    name: 'Holidays',
    colorCode: '#b643a3',
    id: 4,
  },
]

const initialState: TagState = {
  tagList: defaultTags,
}

export const tagsSlice = createSlice({
  name: 'Tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<TagItem>) => {
      state.tagList.push(action.payload)
    },
    removeTag: (state, action: PayloadAction<number>) => {
      const itemIndex = state.tagList.findIndex(
        (item) => item.id === action.payload,
      )

      if (itemIndex != -1) {
        state.tagList.splice(itemIndex, 1)
      }
    },
  },
})

export const { addTag, removeTag } = tagsSlice.actions
export default tagsSlice.reducer
