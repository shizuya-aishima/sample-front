import { grpc } from '@improbable-eng/grpc-web'
import { SearchReply, SearchRequest } from '../../../proto/item_pb'
import { ItemClient } from '../../../proto/item_pb_service'

const getUrl = () => {
  console.log(location.protocol + '//' + location.host + '/item')
  console.log(location.host === 'sample-front-slunvn5d4q-uc.a.run.app')
  return location.host === 'localhost:3000'
    ? 'http://localhost:8080'
    : location.protocol + '//' + location.host + '/item'
}

export const itemsInstance = () => new ItemClient(getUrl())
// 注文作成APIへリクエストする
export const itemSearchGrpc = async (client: ItemClient, data: SearchRequest) => {
  return await new Promise<SearchReply[]>((resolve, reject) => {
    // APIクライアントを利用して、gRPCエンドポイントにリクエストを実行する
    const dataList: SearchReply[] = []
    const metadata = new grpc.Metadata()
    // metadata.append('Access-Control-Allow-Origin', '*')
    client
      .search(data, metadata)
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
