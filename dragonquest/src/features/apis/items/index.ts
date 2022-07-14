import { grpc } from '@improbable-eng/grpc-web'
import {
  ItemFindReply,
  ItemFindRequest,
  SearchReply,
  SearchRequest,
  UpdateReply,
  UpdateRequest,
} from '../../../proto/item_pb'
import { ItemClient } from '../../../proto/item_pb_service'

const getUrl = () => {
  console.log(location.protocol + '//' + location.host + '/item')
  console.log(location.host === 'sample-front-slunvn5d4q-uc.a.run.app')
  return location.host === 'localhost:3000'
    ? 'http://localhost:8080'
    : location.protocol + '//' + location.host + '/grpc/item'
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
}

// 注文作成APIへリクエストする
export const itemUpdateGrpc = async (client: ItemClient, data: UpdateRequest) => {
  return await new Promise<void>((resolve, reject) => {
    // APIクライアントを利用して、gRPCエンドポイントにリクエストを実行する
    client.update(data, (error, responseMessage) => {
      if (error) {
        reject(error)
      }
      if (responseMessage) {
        resolve()
      }
    })
  })
}

export const itemFindGrpc = async (client: ItemClient, data: ItemFindRequest) => {
  return await new Promise<ItemFindReply>((resolve, reject) => {
    // APIクライアントを利用して、gRPCエンドポイントにリクエストを実行する
    client.find(data, (error, responseMessage) => {
      if (error) {
        reject(error)
      }
      if (responseMessage) {
        resolve(responseMessage)
      }
    })
  })
}

export const updateGrpc = async (client: ItemClient, data: UpdateRequest) => {
  return await new Promise<UpdateReply>((resolve, reject) => {
    // APIクライアントを利用して、gRPCエンドポイントにリクエストを実行する
    client.update(data, (error, responseMessage) => {
      if (error) {
        reject(error)
      }
      if (responseMessage) {
        resolve(responseMessage)
      }
    })
  })
}
