import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

export type TagItem = {
  name: string
  colorCode: string
  id: string
}

type TagState = {
  tagList: TagItem[]
}

const defaultTags: TagItem[] = [
  {
    name: 'Birthdays',
    colorCode: '#48d4b3',
    id: nanoid(),
  },
  {
    name: 'Reminders',
    colorCode: '#4265b0',
    id: nanoid(),
  },
  {
    name: 'Tasks',
    colorCode: '#b05342',
    id: nanoid(),
  },
  {
    name: 'Holidays',
    colorCode: '#b643a3',
    id: nanoid(),
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
    removeTag: (state, action: PayloadAction<string>) => {
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
