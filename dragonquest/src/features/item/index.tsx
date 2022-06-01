import { Box, Paper, Tab, Tabs, TextField, Typography } from '@mui/material'
import { createTheme } from '@mui/system'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { castNum, getX, getX2, getY, getY2 } from '../../utils/calculation'
import { ExpectedValue, itemActions, ItemStateOnchange } from './itemSlice'
import { RequiredItem } from '../../components/required'
import { Materials } from '../../components/required/types'

export const Item: React.FC = () => {
  const priceData = useAppSelector((state: RootState) => state.item)
  const dispatch = useAppDispatch()

  const theme = createTheme()

  const x = getX((state: RootState) => state.item)

  const y = getY((state: RootState) => state.item, x)

  const x2 = getX2((state: RootState) => state.item)
  const y2 = getY2(x2)

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
            <RequiredItem
              getState={(state: RootState) => state.item.itemList}
              materialsHandler={materialsHandler}
              addMaterial={addMaterial}
              deleteMaterial={deleteMaterial}
            />
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
        </Paper>
      </Paper>
    </>
  )
}
