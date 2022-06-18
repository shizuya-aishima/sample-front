// package: item
// file: item.proto

import * as item_pb from "./item_pb";
import {grpc} from "@improbable-eng/grpc-web";

type Itemcreate = {
  readonly methodName: string;
  readonly service: typeof Item;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof item_pb.CreateRequest;
  readonly responseType: typeof item_pb.CreateReply;
};

type Itemsearch = {
  readonly methodName: string;
  readonly service: typeof Item;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof item_pb.SearchRequest;
  readonly responseType: typeof item_pb.SearchReply;
};

type Itemupdate = {
  readonly methodName: string;
  readonly service: typeof Item;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof item_pb.UpdateRequest;
  readonly responseType: typeof item_pb.UpdateReply;
};

type Itemfind = {
  readonly methodName: string;
  readonly service: typeof Item;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof item_pb.ItemFindRequest;
  readonly responseType: typeof item_pb.ItemFindReply;
};

export class Item {
  static readonly serviceName: string;
  static readonly create: Itemcreate;
  static readonly search: Itemsearch;
  static readonly update: Itemupdate;
  static readonly find: Itemfind;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ItemClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  create(requestMessage: item_pb.CreateRequest, metadata?: grpc.Metadata): ResponseStream<item_pb.CreateReply>;
  search(requestMessage: item_pb.SearchRequest, metadata?: grpc.Metadata): ResponseStream<item_pb.SearchReply>;
  update(
    requestMessage: item_pb.UpdateRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: item_pb.UpdateReply|null) => void
  ): UnaryResponse;
  update(
    requestMessage: item_pb.UpdateRequest,
    callback: (error: ServiceError|null, responseMessage: item_pb.UpdateReply|null) => void
  ): UnaryResponse;
  find(
    requestMessage: item_pb.ItemFindRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: item_pb.ItemFindReply|null) => void
  ): UnaryResponse;
  find(
    requestMessage: item_pb.ItemFindRequest,
    callback: (error: ServiceError|null, responseMessage: item_pb.ItemFindReply|null) => void
  ): UnaryResponse;
}

