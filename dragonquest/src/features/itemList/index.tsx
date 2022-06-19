import { Grid, Skeleton } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { OutlinedCard } from '../../components/itemCard'
import { itemsInstance } from '../apis/items'
import { itemListActions, searchAsync } from './itemListSlice'
import { SearchBox } from './searchBox'
import { SearchProps } from './searchBox/types'

const list = [1, 2, 3, 4, 5, 6]

export const ItemList = () => {
  const dispatch = useAppDispatch()
  // handler関数を作成する関数
  const formHandler =
    (key: keyof SearchProps) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch(itemListActions.onChange({ key: key, value: e.target.value }))

  const searchHandler = formHandler('itemName')

  const doSearch = () => dispatch(searchAsync(client))

  // Grpc 接続
  const client = itemsInstance()

  React.useLayoutEffect(() => {
    doSearch()
  }, [])

  return (
    <>
      <SearchBox searchHandler={searchHandler} doSearch={doSearch} />
      <CardList />
    </>
  )
}

const CardList = () => {
  const results = useAppSelector((state: RootState) => state.itemList.cards)
  const load = useAppSelector((state: RootState) => state.itemList.status)
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {load === 'loading' ? (
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant='rectangular' height={118} />
          </Grid>
        ) : (
          <>
            {results.map((e, i) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <OutlinedCard item={e} materialList={e.materialList} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  )
}
