import { Item } from '../../features/itemList/itemListSlice'

export type OutlinedCardProps = {
  item: Item
  materialList: Material[]
}

export type Material = {
  itemName: string
}
