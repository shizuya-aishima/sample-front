import { Add, Delete } from '@mui/icons-material'
import { Box, IconButton, Paper, Tab, Tabs, TextField, Typography } from '@mui/material'
import { createTheme } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { ExpectedValue, itemActions, ItemState, ItemStateOnchange, Materials } from './itemSlice'
import { castNum } from './utils'

const data = {
  id: 'XXX-XXX-XXXXXX',
  name: '虹色のオーブ',
  price: 5000,
  expectedValue: {
    greatSuccess: 10,
    success: 2,
  },
  itemList: [
    {
      name: 'レッドオーブ',
      quantity: 100,
      price: 100,
    },
    {
      name: 'ブルーオーブ',
      quantity: 100,
      price: 100,
    },
  ],
}

export const Item: React.FC = () => {
  const priceData = useAppSelector((state: RootState) => state.item)
  const dispatch = useAppDispatch()

  type Param = {
    id: string
  }
  const theme = createTheme()

  const min =
    priceData.itemList
      .map((e) => castNum(e.quantity) * castNum(e.price))
      .reduce((sum, e) => sum + e, 0) *
    (99 / data.expectedValue.success)
  const max =
    priceData.itemList
      .map((e) => castNum(e.quantity) * castNum(e.price))
      .reduce((sum, e) => sum + e, 0) *
    (99 / data.expectedValue.greatSuccess)

  const m = priceData.itemList
    .map((e) => castNum(e.price) * castNum(e.quantity))
    .reduce((sum, e) => sum + e, 0)
  const x =
    ((castNum(priceData.price) * castNum(priceData.expectedValue.success) - m) * 99) /
    (castNum(priceData.expectedValue.success) * m -
      castNum(priceData.expectedValue.greatSuccess) * m)

  const y =
    (99 - x * castNum(priceData.expectedValue.greatSuccess)) /
    castNum(priceData.expectedValue.success)

  const py =
    priceData.tab === '0'
      ? castNum(priceData.price) * castNum(priceData.expectedValue.success)
      : castNum(priceData.expectedValue.successPrice)

  const px =
    priceData.tab === '0'
      ? castNum(priceData.price) * castNum(priceData.expectedValue.greatSuccess)
      : castNum(priceData.expectedValue.greatSuccessPrice)

  const x2 = (30 * py - 30 * m) / (py - px)
  const y2 = 30 - x2

  // handler関数を作成する関数
  const formHandler =
    (key: keyof ItemStateOnchange) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch(itemActions.onChange({ key: key, value: e.target.value }))
  const materialsHandler =
    (index: number, key: keyof Materials) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch(
        itemActions.onChangeMaterials({ index: index, value: { key: key, value: e.target.value } }),
      )

  const expectedHandler =
    (key: keyof ExpectedValue) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch(itemActions.onChangeExpected({ key: key, value: e.target.value }))

  const priceHandler = formHandler('price')
  const tabHandler = (event: React.SyntheticEvent, newValue: number) =>
    dispatch(itemActions.onChange({ key: 'tab', value: newValue.toString() }))
  const nameMaterialsHandler = (index: number) => materialsHandler(index, 'name')
  const priceMaterialsHandler = (index: number) => materialsHandler(index, 'price')
  const quantityMaterialsHandler = (index: number) => materialsHandler(index, 'quantity')
  const greatSuccessHandler = expectedHandler('greatSuccess')
  const successHandler = expectedHandler('success')
  const greatSuccessPriceHandler = expectedHandler('greatSuccessPrice')
  const successPriceHandler = expectedHandler('successPrice')
  const addMaterial = () => dispatch(itemActions.addList())
  const deleteMaterial = (index: number) => dispatch(itemActions.deleteMaterial(index))

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }
  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    )
  }

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  return (
    <>
      <Paper>
        <Typography variant='h3'>{'利益計算ツール'}</Typography>
        <Typography>99個で￥{(castNum(priceData.price) * 99).toLocaleString()}</Typography>
        <Paper sx={{ textAlign: 'left', m: theme.spacing(2) }}>
          <Box sx={{ p: 3 }}>
            <Typography variant='h4'>必要素材</Typography>
            {priceData.itemList.map((e, i) => (
              <Box key={i} sx={{ mt: theme.spacing(2) }}>
                <TextField
                  value={e.name}
                  label={`素材${i + 1}`}
                  onChange={nameMaterialsHandler(i)}
                />
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
                <IconButton onClick={() => deleteMaterial(i)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Box sx={{ textAlign: 'center' }}>
              <IconButton onClick={addMaterial}>
                <Add />
              </IconButton>
            </Box>
            <Typography variant='h5'>
              総金額: ￥
              {priceData.itemList
                .map((e) => castNum(e.price) * castNum(e.quantity))
                .reduce((sum, e) => sum + e, 0)
                .toLocaleString()}
            </Typography>
          </Box>
        </Paper>
        <Paper sx={{ textAlign: 'left', m: theme.spacing(2) }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={Number(priceData.tab)}
              onChange={tabHandler}
              aria-label='basic tabs example'
            >
              <Tab label='個数評価' {...a11yProps(0)} />
              <Tab label='星評価' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={Number(priceData.tab)} index={0}>
            <TextField
              value={priceData.price}
              label='生成アイテム単価'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                type: 'number',
                // readOnly: true
              }}
              onChange={priceHandler}
            />
            <TextField
              value={priceData.expectedValue.greatSuccess}
              label='大成功'
              onChange={greatSuccessHandler}
            />
            <TextField
              value={priceData.expectedValue.success}
              label='成功'
              onChange={successHandler}
            />
          </TabPanel>
          <TabPanel value={Number(priceData.tab)} index={1}>
            <TextField
              value={priceData.expectedValue.greatSuccessPrice}
              label='星3'
              onChange={greatSuccessPriceHandler}
            />
            <TextField
              value={priceData.expectedValue.successPrice}
              label='星2~1'
              onChange={successPriceHandler}
            />
          </TabPanel>
        </Paper>
        <Paper sx={{ textAlign: 'left', m: theme.spacing(2) }}>
          <Box sx={{ p: 3 }}>
            <Typography variant='h5'>30回作製すると</Typography>
            <Typography variant='h6'>利益の出る大成功数(MIN)：{Math.ceil(x2)}回</Typography>
            <Typography variant='h6'>利益の出る成功数(MAX)：{Math.floor(y2)}回</Typography>
          </Box>
          <TabPanel value={Number(priceData.tab)} index={0}>
            <Typography variant='h5'>99個作ると</Typography>
            <Typography variant='h6'>利益の出る大成功数：{Math.ceil(x)}回</Typography>
            <Typography variant='h6'>利益の出る成功数：{Math.floor(y)}回</Typography>
          </TabPanel>
          <Box sx={{ p: 3 }}>
            <Typography variant='h6'>
              最大: ￥{max} 利益：{castNum(priceData.price) * 99 - max}
            </Typography>
            <Typography variant='h6'>
              最小: ￥{min} 利益：{castNum(priceData.price) * 99 - min}
            </Typography>
          </Box>
        </Paper>
      </Paper>
    </>
  )
}
