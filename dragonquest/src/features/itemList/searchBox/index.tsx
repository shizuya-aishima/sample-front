import { Search } from '@mui/icons-material'
import { IconButton, InputBase, Paper } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { SerachBoxProps } from './types'

export const SearchBox: React.FC<SerachBoxProps> = (props) => {
  const value = useAppSelector((state: RootState) => state.itemList.search)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        props.doSearch()
      }}
    >
      <Paper component='div' sx={{ p: '0px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='アイテム名'
          inputProps={{ 'aria-label': 'アイテム名' }}
          value={value.itemName}
          onChange={props.searchHandler}
        />
        <IconButton sx={{ p: '10px' }} aria-label='search' onClick={props.doSearch}>
          <Search />
        </IconButton>
      </Paper>
    </form>
  )
}
