import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { itemReducer } from '../features/item/itemSlice'
import { itemListReducer } from '../features/itemList/itemListSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    item: itemReducer,
    itemList: itemListReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
