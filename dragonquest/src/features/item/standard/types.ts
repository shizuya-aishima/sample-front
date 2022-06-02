import { RootState } from '../../../app/store'

export type StandardProps = {
  tabHandler: (event: React.SyntheticEvent, newValue: number) => void
  getTab: (state: RootState) => string
} & QuantityStandardProps &
  ValuationBasisProps

export type ExpectedValue = {
  greatSuccess: string
  success: string
  greatSuccessPrice: string
  successPrice: string
}

export type QuantityStandardProps = {
  priceHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  greatSuccessHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  successHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  getPrice: (state: RootState) => string
  getExpectedValue: (state: RootState) => ExpectedValue
}

export type ValuationBasisProps = {
  greatSuccessHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  greatSuccessPriceHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  successPriceHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  getExpectedValue: (state: RootState) => ExpectedValue
}
