import { Materials } from '../components/required/types'
import { ItemState } from '../features/item/itemSlice'

export const castNum = (e: string) => (e != null ? +e : 0)

export const getX = (priceData: ItemState) => {
  // const priceData = useAppSelector(getState)
  const m = getM(priceData.itemList)
  return (
    ((castNum(priceData.price) * castNum(priceData.expectedValue.success) - m) * 99) /
    (castNum(priceData.expectedValue.success) * m -
      castNum(priceData.expectedValue.greatSuccess) * m)
  )
}

export const getY = (priceData: ItemState, x: number) => {
  // const priceData = useAppSelector(getState)

  return (
    (99 - x * castNum(priceData.expectedValue.greatSuccess)) /
    castNum(priceData.expectedValue.success)
  )
}

const getM = (materialList: Materials[]) =>
  materialList.map((e) => castNum(e.price) * castNum(e.quantity)).reduce((sum, e) => sum + e, 0)

export const getX2 = (priceData: ItemState) => {
  // const priceData = useAppSelector(getState)
  const m = getM(priceData.itemList)
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
