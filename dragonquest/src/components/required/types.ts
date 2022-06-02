import { RootState } from '../../app/store'

export type RequiredProps = {
  getState: (state: RootState) => Materials[]
  materialsHandler: (
    index: number,
    key: keyof Materials,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  deleteMaterial: (index: number) => void
  addMaterial: () => void
}

export type Materials = {
  name: string
  quantity: string
  price: string
}
