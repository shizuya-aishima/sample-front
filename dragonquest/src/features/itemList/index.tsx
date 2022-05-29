import { Grid } from '@mui/material'
import { OutlinedCard } from '../../components/itemCard'

const list = [1, 2, 3, 4, 5, 6]

export const ItemList = () => {
  return (
    <>
      <Grid container spacing={2}>
        {list.map((e) => (
          <Grid key={e} item xs={12} sm={6} md={3}>
            <OutlinedCard />
          </Grid>
        ))}
        {/* <Outlet /> */}
      </Grid>
    </>
  )
}
