import { SearchReply, SearchRequest } from '../../../proto/item_pb'
import { ItemClient } from '../../../proto/item_pb_service'

export const itemsInstance = () => new ItemClient('http://localhost:8080')
// 注文作成APIへリクエストする
export const itemSearchGrpc = async (client: ItemClient, data: SearchRequest) => {
  return await new Promise<SearchReply[]>((resolve, reject) => {
    // APIクライアントを利用して、gRPCエンドポイントにリクエストを実行する
    const dataList: SearchReply[] = []
    client
      .search(data)
      .on('data', (message) => {
        dataList.push(message)
      })
      .on('end', (status) => {
        console.log(dataList)
        console.log(status)
        if (status?.code === 0) {
          resolve(dataList)
        } else {
          reject(status)
        }
      })
  })
  // console.log(response.getOrder().toObject())
}
