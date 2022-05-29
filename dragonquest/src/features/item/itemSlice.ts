import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

export type ItemState = {
  id: string
  name: string
  price: string
  expectedValue: ExpectedValue
  itemList: Materials[]
}

export type ItemStateOnchange = Omit<ItemState, 'expectedValue' | 'itemList'>

export type ExpectedValue = {
  greatSuccess: string
  success: string
}
export type Materials = {
  name: string
  quantity: string
  price: string
}

const initialState: ItemState = {
  id: '',
  name: '',
  expectedValue: {
    greatSuccess: '10',
    success: '2',
  },
  price: '5000',
  itemList: [
    {
      name: 'レッドオーブ',
      quantity: '100',
      price: '100',
    },
    {
      name: 'ブルーオーブ',
      quantity: '100',
      price: '100',
    },
  ],
}

const addMaterial: Materials = {
  name: '',
  price: '0',
  quantity: '1',
}

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched. Thunks are
// // typically used to make async requests.
// export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
//   const response = await fetchCount(amount)
//   // The value we return becomes the `fulfilled` action payload
//   return response.data
// })

type ToKeyValueTupleWithKey<T, K extends keyof T> = K extends keyof T
  ? { key: K; value: T[K] }
  : never
type ToKeyValueTuple<T> = ToKeyValueTupleWithKey<T, keyof T>
export const itemSlice = createSlice({
  name: 'item',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onChange: (state, action: PayloadAction<ToKeyValueTuple<ItemStateOnchange>>) => {
      state[action.payload.key] = action.payload.value
    },
    onChangeExpected: (state, action: PayloadAction<ToKeyValueTuple<ExpectedValue>>) => {
      state.expectedValue[action.payload.key] = action.payload.value
    },
    onChangeMaterials: (
      state,
      action: PayloadAction<{ index: number; value: ToKeyValueTuple<Materials> }>,
    ) => {
      state.itemList[action.payload.index][action.payload.value.key] = action.payload.value.value
    },
    addList: (state) => {
      state.itemList = state.itemList.concat(addMaterial)
    },
    deleteMaterial: (state, action: PayloadAction<number>) => {
      state.itemList = state.itemList.filter((_e, i) => i !== action.payload)
    },
  },
  // // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle'
  //       state.value += action.payload
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = 'failed'
  //     })
  // },
})

export const itemActions = itemSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export const itemReducer = itemSlice.reducer
