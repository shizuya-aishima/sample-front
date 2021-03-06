import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk, RootState } from '../../app/store'
import { Material } from '../../components/itemCard/types'
import { SearchRequest } from '../../proto/item_pb'
import { ItemClient } from '../../proto/item_pb_service'
import { itemSearchGrpc } from '../apis/items'
import { SearchProps } from './searchBox/types'

export type ItemListState = {
  search: SearchProps
  cards: Item[]
  status: 'loading' | 'idle' | 'failed'
}
export type Item = {
  name: string
  id: string
  materialList: Material[]
}

const initialState: ItemListState = {
  search: {
    itemName: 'TEST',
  },
  cards: [],
  status: 'failed',
}
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const searchAsync = createAsyncThunk<
  // 戻り値の型
  Item[],
  // 引数の型
  ItemClient,
  // thunkApi の型
  {
    dispatch: AppDispatch
    state: RootState
  }
>('counter/fetchCount', async (client, thunkApi) => {
  const data = new SearchRequest()
  data.setName(thunkApi.getState().itemList.search.itemName)
  return itemSearchGrpc(client, data).then((tes) =>
    tes.map((e) => ({
      name: e.getName(),
      id: e.getId(),
      materialList: e.getItemIdsList().map((ele) => ({
        itemName: ele.getName(),
        quantity: ele.getQuantity(),
      })),
    })),
  )
})

type ToKeyValueTupleWithKey<T, K extends keyof T> = K extends keyof T
  ? { key: K; value: T[K] }
  : never
type ToKeyValueTuple<T> = ToKeyValueTupleWithKey<T, keyof T>
export const itemListSlice = createSlice({
  name: 'item',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onChange: (state, action: PayloadAction<ToKeyValueTuple<SearchProps>>) => {
      state.search[action.payload.key] = action.payload.value
    },
    setCardList: (state, action: PayloadAction<Item[]>) => {
      state.cards = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = 'loading'
        state.cards = []
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.cards = action.payload
      })
      .addCase(searchAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const itemListActions = itemListSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const searchApi =
  (client: ItemClient): AppThunk =>
  async (dispatch, getState) => {
    console.log('未使用')
  }

export const itemListReducer = itemListSlice.reducer
