import { Delete } from '@mui/icons-material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { Box, createTheme, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { castNum } from '../../utils/calculation'
import { RequiredProps } from './types'

export const RequiredItem: React.FC<RequiredProps> = (props) => {
  const itemList = useAppSelector(props.getState)

  const nameMaterialsHandler = (index: number) => props.materialsHandler(index, 'name')
  const priceMaterialsHandler = (index: number) => props.materialsHandler(index, 'price')
  const quantityMaterialsHandler = (index: number) => props.materialsHandler(index, 'quantity')

  const addClick = () => {
    if (itemList.length < 5) {
      props.addMaterial()
    }
  }

  const theme = createTheme()
  return (
    <>
      <Typography variant='h4'>必要素材</Typography>
      {itemList.map((e, i) => (
        <Box key={i} sx={{ mt: theme.spacing(2) }}>
          <TextField value={e.name} label={`素材${i + 1}`} onChange={nameMaterialsHandler(i)} />
          <TextField
            value={e.price}
            label='金額'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              type: 'number',
            }}
            onChange={priceMaterialsHandler(i)}
          />
          <TextField
            value={e.quantity}
            label='素材数'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              type: 'number',
            }}
            onChange={quantityMaterialsHandler(i)}
          />
          <IconButton onClick={() => props.deleteMaterial(i)}>
            <Delete color='error' />
          </IconButton>
        </Box>
      ))}
      <Box sx={{ textAlign: 'center' }}>
        <IconButton onClick={addClick}>
          <AddCircleOutlinedIcon fontSize='large' color='primary' />
        </IconButton>
      </Box>
      <Typography variant='h5'>
        総金額: ￥
        {itemList
          .map((e) => castNum(e.price) * castNum(e.quantity))
          .reduce((sum, e) => sum + e, 0)
          .toLocaleString()}
      </Typography>
    </>
  )
}
