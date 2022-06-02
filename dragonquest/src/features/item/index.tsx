import { Box, Button, Paper, Typography } from '@mui/material'
import { createTheme } from '@mui/system'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { RequiredItem } from '../../components/required'
import { Materials } from '../../components/required/types'
import { calculation, itemActions, ItemStateOnchange } from './itemSlice'
import { Standard } from './standard'
import { ExpectedValue } from './standard/types'

export const Item: React.FC = () => {
  // const priceData = useAppSelector((state: RootState) => state.item)
  const dispatch = useAppDispatch()

  const theme = createTheme()

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

  return (
    <>
      <Paper>
        <Typography variant='h3'>{'利益計算ツール'}</Typography>
        {/* <Typography>
          99個で￥
          {(castNum(useAppSelector((state: RootState) => state.item.price)) * 99).toLocaleString()}
        </Typography> */}
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
          <Standard
            getExpectedValue={(state: RootState) => state.item.expectedValue}
            getPrice={(state: RootState) => state.item.price}
            getTab={(state: RootState) => state.item.tab}
            greatSuccessHandler={greatSuccessHandler}
            greatSuccessPriceHandler={greatSuccessPriceHandler}
            priceHandler={priceHandler}
            successHandler={successHandler}
            successPriceHandler={successPriceHandler}
            tabHandler={tabHandler}
          />
        </Paper>
        <Button variant='contained' onClick={() => dispatch(calculation())}>
          計算
        </Button>
        <Paper sx={{ textAlign: 'left', m: theme.spacing(2) }}>
          <CalculationResults />
        </Paper>
      </Paper>
    </>
  )
}

const CalculationResults = () => {
  const results = useAppSelector((state: RootState) => state.item.results)
  const tab = useAppSelector((state: RootState) => state.item.tab)

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
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant='h5'>30回作製すると</Typography>
        <Typography variant='h6'>利益の出る大成功数(MIN)：{Math.ceil(results.x2)}回</Typography>
        <Typography variant='h6'>利益の出る成功数(MAX)：{Math.floor(results.y2)}回</Typography>
      </Box>
      <TabPanel value={Number(tab)} index={0}>
        <Typography variant='h5'>99個作ると</Typography>
        <Typography variant='h6'>利益の出る大成功数：{Math.ceil(results.x)}回</Typography>
        <Typography variant='h6'>利益の出る成功数：{Math.floor(results.y)}回</Typography>
      </TabPanel>
    </>
  )
}
