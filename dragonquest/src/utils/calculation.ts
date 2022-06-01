import { useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import { ItemState } from '../features/item/itemSlice'
import { Materials } from '../components/required/types'

export const castNum = (e: string) => (e != null ? +e : 0)

export const getX = (getState: (state: RootState) => ItemState) => {
  const priceData = useAppSelector(getState)
  const m = getM((state: RootState) => state.item.itemList)
  return (
    ((castNum(priceData.price) * castNum(priceData.expectedValue.success) - m) * 99) /
    (castNum(priceData.expectedValue.success) * m -
      castNum(priceData.expectedValue.greatSuccess) * m)
  )
}

export const getY = (getState: (state: RootState) => ItemState, x: number) => {
  const priceData = useAppSelector(getState)

  return (
    (99 - x * castNum(priceData.expectedValue.greatSuccess)) /
    castNum(priceData.expectedValue.success)
  )
}

const getM = (getState: (state: RootState) => Materials[]) =>
  useAppSelector(getState)
    .map((e) => castNum(e.price) * castNum(e.quantity))
    .reduce((sum, e) => sum + e, 0)

export const getX2 = (getState: (state: RootState) => ItemState) => {
  const priceData = useAppSelector(getState)
  const m = getM((state: RootState) => state.item.itemList)
  const py =
    priceData.tab === '0'
      ? castNum(priceData.price) * castNum(priceData.expectedValue.success)
      : castNum(priceData.expectedValue.successPrice)

  const px =
    priceData.tab === '0'
      ? castNum(priceData.price) * castNum(priceData.expectedValue.greatSuccess)
      : castNum(priceData.expectedValue.greatSuccessPrice)

  return (30 * py - 30 * m) / (py - px)
}

export const getY2 = (x: number) => 30 - x
