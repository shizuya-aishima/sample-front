// proto定義の読み込み
const PROTO_PATH = __dirname + '/../../proto/item.proto'
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const { EventEmitter } = require('events')

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const messageService = grpc.loadPackageDefinition(packageDefinition).item.Item

console.log(messageService)
// PostMessageにより投稿されたメッセージをGetMessageStreamで返却するstreamに流すための中継器
const messageEventEmitter = new EventEmitter()
// 過去ログを保存する配列
const pastMessageList = []

// モック
function PostMessage(call, callback) {
  // 受け取ったメッセージを過去ログに保存する
  const message = call.request
  pastMessageList.push(message) // messageEventEmitter経由で、getMessageStreamで返却するstreamにメッセージを送る
  messageEventEmitter.emit('post', message)

  // レスポンスを返す
  callback(null, { status: 'ok' })
}
// モック
function GetMessageStream(call) {
  // 過去ログをstreamに流し込む
  pastMessageList.forEach((message) => call.write(message))
  // PostMessageが実行されるたびに、そのメッセージをstreamに流し込む
  const handler = (message) => call.write(message)
  messageEventEmitter.on('post', handler)
  // callback(null, { status: "Hello " });
}

// モック
function CreateRoom(call, callback) {
  // 受け取ったメッセージを過去ログに保存する
  const message = call.request
  console.log(message)
  console.log(message.room_name)
  // レスポンスを返す
  callback(null, { room_id: '1', room_name: message.room_name })
}

const data = {
  TEST: [
    {
      output: {
        id: '2f98ee1b-a57d-4787-adda-690faceb327d',
        name: 'TESTNAME',
        item_ids: [
          {
            id: 'a38868a6-7693-498f-9aaa-5fc475388148',
            name: 'TESTNAME',
            quantity: '20',
          },
          {
            id: 'a38868a6-7693-498f-9aaa-5fc475388148',
            name: '虹色のオーブ',
            quantity: '20',
          },
        ],
        expected: {
          greatSuccess: '20',
          success: '20',
          greatSuccessPrice: '20',
          successPrice: '20',
        },
      },
    },
    {
      output: {
        item_ids: [
          {
            id: 'a38868a6-7693-498f-9aaa-5fc475388148',
            name: 'TESTNAME',
            quantity: '20',
          },
        ],
        id: '2f98ee1b-a57d-4787-adda-690faceb327d',
        name: 'TESTNAME2',
        expected: {
          greatSuccess: '200',
          success: '200',
          greatSuccessPrice: '200',
          successPrice: '200',
        },
      },
    },
    {
      output: {
        item_ids: [
          {
            id: 'a38868a6-7693-498f-9aaa-5fc475388148',
            name: 'TESTNAME',
            quantity: '20',
          },
        ],
        id: '2f98ee1b-a57d-4787-adda-690faceb327d',
        name: 'TESTNAME2',
        expected: {
          greatSuccess: '200',
          success: '200',
          greatSuccessPrice: '200',
          successPrice: '200',
        },
      },
    },
    {
      output: {
        item_ids: [
          {
            id: 'a38868a6-7693-498f-9aaa-5fc475388148',
            name: 'TESTNAME',
            quantity: '20',
          },
        ],
        id: '2f98ee1b-a57d-4787-adda-690faceb327d',
        name: 'TESTNAME2',
        expected: {
          greatSuccess: '200',
          success: '200',
          greatSuccessPrice: '200',
          successPrice: '200',
        },
      },
    },
    {
      output: {
        item_ids: [
          {
            id: 'a38868a6-7693-498f-9aaa-5fc475388148',
            name: 'TESTNAME',
            quantity: '20',
          },
        ],
        id: '2f98ee1b-a57d-4787-adda-690faceb327d',
        name: 'TESTNAME2',
        expected: {
          greatSuccess: '200',
          success: '200',
          greatSuccessPrice: '200',
          successPrice: '200',
        },
      },
    },
  ],
}

// 検索モック
const search = (call) => {
  data['TEST'].forEach((e) => call.write(e.output))
  console.log(call)
  call.end()
}
// サーバの設定
function main() {
  const server = new grpc.Server()
  // モックの組み込み
  server.addService(messageService.service, {
    search: search,
  })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()
