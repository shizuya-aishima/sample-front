import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { OutlinedCardProps } from './types'

export const OutlinedCard: React.FC<OutlinedCardProps> = (props) => {
  const navigate = useNavigate()
  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h5' component='div'>
          {props.item.name}
        </Typography>
        {props.materialList.map((e, i) => (
          <Typography key={i} variant='body2'>
            {e.itemName}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => navigate(props.item.id)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
