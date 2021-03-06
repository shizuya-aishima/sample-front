import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk, RootState } from '../../app/store'
import { Materials } from '../../components/required/types'
import {
  Bean,
  CreateRequest,
  ItemFindReply,
  ItemFindRequest,
  UpdateRequest,
  ExpectedValue as ExpectedValue2,
} from '../../proto/item_pb'
import { ItemClient } from '../../proto/item_pb_service'
import { castNum, getX, getX2, getY, getY2 } from '../../utils/calculation'
import { itemFindGrpc, itemUpdateGrpc } from '../apis/items'
import { ExpectedValue } from './standard/types'

export type ItemState = {
  id: string
  name: string
  price: string
  tab: string
  expectedValue: ExpectedValue
  itemList: Materials[]
  results: Results
  status: 'loading' | 'idle' | 'failed'
}

export type ItemStateOnchange = Omit<ItemState, 'expectedValue' | 'itemList' | 'results' | 'status'>

const initialState: ItemState = {
  id: '',
  name: '',
  tab: '0',
  expectedValue: {
    greatSuccess: '10',
    success: '2',
    greatSuccessPrice: '30000',
    successPrice: '10000',
  },
  price: '5000',
  itemList: [
    {
      id: 'XXX',
      name: 'レッドオーブ',
      quantity: '100',
      price: '100',
    },
    {
      id: 'XXX',
      name: 'ブルーオーブ',
      quantity: '100',
      price: '100',
    },
  ],
  results: {
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
  },
  status: 'failed',
}
type Results = {
  x: number
  y: number
  x2: number
  y2: number
}
const addMaterial: Materials = {
  id: 'XXX',
  name: '',
  price: '0',
  quantity: '1',
}

export const updateAsync = createAsyncThunk<
  // 戻り値の型
  void,
  // 引数の型
  { client: ItemClient; id: string },
  // thunkApi の型
  {
    dispatch: AppDispatch
    state: RootState
  }
>('item/update', async ({ client, id }, thunkApi) => {
  const data = new UpdateRequest()
  const screenData = thunkApi.getState().item
  data.setName(screenData.name)
  // data.setPrice(castNum(screenData.price))
  data.setId(id)
  data.setPrice(castNum(screenData.price))
  const getExpected = () => {
    const expected = new ExpectedValue2()
    expected.setGreatsuccess(castNum(screenData.expectedValue.greatSuccess))
    expected.setSuccess(castNum(screenData.expectedValue.success))
    expected.setGreatsuccessprice(castNum(screenData.expectedValue.greatSuccessPrice))
    expected.setSuccessprice(castNum(screenData.expectedValue.successPrice))
    return expected
  }
  data.setExpected(getExpected())
  data.setItemIdsList(
    screenData.itemList.map((e) => {
      const bean = new Bean()
      bean.setId(e.id)
      bean.setName(e.name)
      bean.setPrice(castNum(e.price))
      bean.setQuantity(castNum(e.quantity))
      return bean
    }),
  )
  return itemUpdateGrpc(client, data)
})

export const findAsync = createAsyncThunk<
  // 戻り値の型
  Omit<ItemState, 'results' | 'status'>,
  // 引数の型
  { client: ItemClient; id: string },
  // thunkApi の型
  {
    dispatch: AppDispatch
    state: RootState
  }
>('item/fetchCount', async ({ client, id }, thunkApi) => {
  const data = new ItemFindRequest()
  data.setId(id)
  console.log('data : ' + data)
  return itemFindGrpc(client, data).then((e) => {
    return {
      id,
      name: e.getName(),
      expectedValue: {
        greatSuccess: e.getExpected()?.getGreatsuccess().toFixed() || '0',
        success: e.getExpected()?.getSuccess().toFixed() || '0',
        greatSuccessPrice: e.getExpected()?.getGreatsuccessprice().toFixed() || '0',
        successPrice: e.getExpected()?.getSuccessprice().toFixed() || '0',
      },
      tab: '0',
      price: e.getPrice().toFixed(),
      itemList: e.getItemIdsList().map((e) => ({
        id: e.getId(),
        name: e.getName(),
        quantity: e.getQuantity().toFixed(),
        price: e.getPrice().toFixed(),
      })),
    }
  })
})

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
    calculationResults: (state, action: PayloadAction<Results>) => {
      state.results = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(findAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(findAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.id = action.payload.id
        state.name = action.payload.name
        state.itemList = action.payload.itemList
        state.price = action.payload.price
      })
      .addCase(findAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(updateAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateAsync.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(updateAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const itemActions = itemSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const calculation =
  (client: ItemClient, id?: string): AppThunk =>
  (dispatch, getState) => {
    const currentValue = getState().item
    const x = getX(currentValue)
    const y = getY(currentValue, x)

    const x2 = getX2(currentValue)
    const y2 = getY2(x2)
    dispatch(itemActions.calculationResults({ x, y, x2, y2 }))
  }

export const itemReducer = itemSlice.reducer
