import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const cardData = {
  itemName: '虹色のオーブ',
  materialList: [
    { itemName: 'ブルーオーブ', price: 100, quantity: 4 },
    { itemName: 'レッドオーブ', price: 100, quantity: 3 },
  ],
}

const TestCard = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
        Word of the Day
      </Typography> */}
        <Typography variant='h5' component='div'>
          {cardData.itemName}
        </Typography>
        {/* {cardData.materialList.map((e, i) => (
        <Typography key={i} sx={{ mb: 0.5 }} color='text.secondary'>
          {e.itemName} ￥{e.price} 個数：{e.quantity}
        </Typography>
      ))} */}
        {cardData.materialList.map((e, i) => (
          <Typography key={i} variant='body2'>
            {e.itemName} ￥{e.price} 個数：{e.quantity}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Link to='123'>
          <Button size='small'>Learn More</Button>
        </Link>
      </CardActions>
    </React.Fragment>
  )
}

export const OutlinedCard = () => {
  return (
    <Card variant='outlined'>
      <TestCard />
    </Card>
  )
}
