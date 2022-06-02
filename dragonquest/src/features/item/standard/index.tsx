import { Box, Tab, Tabs, TextField } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { QuantityStandardProps, StandardProps, ValuationBasisProps } from './types'

export const Standard: React.FC<StandardProps> = (props) => {
  const tab = useAppSelector(props.getTab)

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={Number(tab)} onChange={props.tabHandler} aria-label='basic tabs example'>
          <Tab label='個数評価' {...a11yProps(0)} />
          <Tab label='星評価' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel key={0} value={Number(tab)} index={0}>
        <QuantityStandard {...props} />
      </TabPanel>
      <TabPanel key={1} value={Number(tab)} index={1}>
        <ValuationBasis {...props} />
      </TabPanel>
    </>
  )
}

const QuantityStandard: React.FC<QuantityStandardProps> = (props) => {
  const price = useAppSelector(props.getPrice)
  const expectedValue = useAppSelector(props.getExpectedValue)
  return (
    <>
      <TextField
        key={'生成アイテム単価'}
        value={price}
        label='生成アイテム単価'
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          type: 'number',
          // readOnly: true
        }}
        onChange={props.priceHandler}
      />
      <TextField
        key={'大成功'}
        value={expectedValue.greatSuccess}
        label='大成功'
        onChange={props.greatSuccessHandler}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          type: 'number',
          // readOnly: true
        }}
      />
      <TextField
        value={expectedValue.success}
        label='成功'
        key='成功'
        onChange={props.successHandler}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          type: 'number',
          // readOnly: true
        }}
      />
    </>
  )
}

const ValuationBasis: React.FC<ValuationBasisProps> = (props) => {
  const expectedValue = useAppSelector(props.getExpectedValue)
  return (
    <>
      <TextField
        value={expectedValue.greatSuccessPrice}
        label='星3'
        onChange={props.greatSuccessPriceHandler}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          type: 'number',
          // readOnly: true
        }}
      />
      <TextField
        value={expectedValue.successPrice}
        label='星2~1'
        onChange={props.successPriceHandler}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          type: 'number',
          // readOnly: true
        }}
      />
    </>
  )
}
