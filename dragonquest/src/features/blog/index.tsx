import { Typography } from '@mui/material'
import React from 'react'

export const Blog = () => {
  type Props = {
    children?: React.ReactNode
  }
  const MainTest: React.FC<Props> = (props) => {
    return <Typography variant='h6'>{props.children}</Typography>
  }
  return (
    <>
      <Typography variant='h3'>目的</Typography>
      <MainTest>個人で好きなアーキテクチャを試す場として作成していく。</MainTest>
      <MainTest>
        また、ドラゴンクエストXの最適な利益を算出できるツールとして利用できるようにアップデートを続けていく。
      </MainTest>
      <Typography></Typography>
    </>
  )
}
