export type SearchProps = {
  itemName: string
}

export type SerachBoxProps = {
  searchHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  doSearch: () => void
}
