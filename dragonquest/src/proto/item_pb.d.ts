// package: item
// file: item.proto

import * as jspb from "google-protobuf";

export class CreateRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  clearItemIdsList(): void;
  getItemIdsList(): Array<Bean>;
  setItemIdsList(value: Array<Bean>): void;
  addItemIds(value?: Bean, index?: number): Bean;

  getPrice(): number;
  setPrice(value: number): void;

  hasExpected(): boolean;
  clearExpected(): void;
  getExpected(): ExpectedValue | undefined;
  setExpected(value?: ExpectedValue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    name: string,
    itemIdsList: Array<Bean.AsObject>,
    price: number,
    expected?: ExpectedValue.AsObject,
  }
}

export class CreateReply extends jspb.Message {
  getStatus(): StatusMap[keyof StatusMap];
  setStatus(value: StatusMap[keyof StatusMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreateReply): CreateReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateReply;
  static deserializeBinaryFromReader(message: CreateReply, reader: jspb.BinaryReader): CreateReply;
}

export namespace CreateReply {
  export type AsObject = {
    status: StatusMap[keyof StatusMap],
  }
}

export class SearchRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchRequest): SearchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchRequest;
  static deserializeBinaryFromReader(message: SearchRequest, reader: jspb.BinaryReader): SearchRequest;
}

export namespace SearchRequest {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class Bean extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getQuantity(): number;
  setQuantity(value: number): void;

  getPrice(): number;
  setPrice(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bean.AsObject;
  static toObject(includeInstance: boolean, msg: Bean): Bean.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Bean, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bean;
  static deserializeBinaryFromReader(message: Bean, reader: jspb.BinaryReader): Bean;
}

export namespace Bean {
  export type AsObject = {
    id: string,
    name: string,
    quantity: number,
    price: number,
  }
}

export class SearchReply extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  clearItemIdsList(): void;
  getItemIdsList(): Array<Bean>;
  setItemIdsList(value: Array<Bean>): void;
  addItemIds(value?: Bean, index?: number): Bean;

  hasExpected(): boolean;
  clearExpected(): void;
  getExpected(): ExpectedValue | undefined;
  setExpected(value?: ExpectedValue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchReply.AsObject;
  static toObject(includeInstance: boolean, msg: SearchReply): SearchReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchReply;
  static deserializeBinaryFromReader(message: SearchReply, reader: jspb.BinaryReader): SearchReply;
}

export namespace SearchReply {
  export type AsObject = {
    id: string,
    name: string,
    itemIdsList: Array<Bean.AsObject>,
    expected?: ExpectedValue.AsObject,
  }
}

export class UpdateRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  clearItemIdsList(): void;
  getItemIdsList(): Array<Bean>;
  setItemIdsList(value: Array<Bean>): void;
  addItemIds(value?: Bean, index?: number): Bean;

  hasExpected(): boolean;
  clearExpected(): void;
  getExpected(): ExpectedValue | undefined;
  setExpected(value?: ExpectedValue): void;

  getPrice(): number;
  setPrice(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequest;
  static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
  export type AsObject = {
    id: string,
    name: string,
    itemIdsList: Array<Bean.AsObject>,
    expected?: ExpectedValue.AsObject,
    price: number,
  }
}

export class UpdateReply extends jspb.Message {
  getStatus(): StatusMap[keyof StatusMap];
  setStatus(value: StatusMap[keyof StatusMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateReply.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateReply): UpdateReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateReply;
  static deserializeBinaryFromReader(message: UpdateReply, reader: jspb.BinaryReader): UpdateReply;
}

export namespace UpdateReply {
  export type AsObject = {
    status: StatusMap[keyof StatusMap],
  }
}

export class ItemFindRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemFindRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ItemFindRequest): ItemFindRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemFindRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemFindRequest;
  static deserializeBinaryFromReader(message: ItemFindRequest, reader: jspb.BinaryReader): ItemFindRequest;
}

export namespace ItemFindRequest {
  export type AsObject = {
    id: string,
  }
}

export class ItemFindReply extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  clearItemIdsList(): void;
  getItemIdsList(): Array<Bean>;
  setItemIdsList(value: Array<Bean>): void;
  addItemIds(value?: Bean, index?: number): Bean;

  hasExpected(): boolean;
  clearExpected(): void;
  getExpected(): ExpectedValue | undefined;
  setExpected(value?: ExpectedValue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemFindReply.AsObject;
  static toObject(includeInstance: boolean, msg: ItemFindReply): ItemFindReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemFindReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemFindReply;
  static deserializeBinaryFromReader(message: ItemFindReply, reader: jspb.BinaryReader): ItemFindReply;
}

export namespace ItemFindReply {
  export type AsObject = {
    id: string,
    name: string,
    price: number,
    itemIdsList: Array<Bean.AsObject>,
    expected?: ExpectedValue.AsObject,
  }
}

export class ExpectedValue extends jspb.Message {
  getGreatsuccess(): number;
  setGreatsuccess(value: number): void;

  getSuccess(): number;
  setSuccess(value: number): void;

  getGreatsuccessprice(): number;
  setGreatsuccessprice(value: number): void;

  getSuccessprice(): number;
  setSuccessprice(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExpectedValue.AsObject;
  static toObject(includeInstance: boolean, msg: ExpectedValue): ExpectedValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExpectedValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExpectedValue;
  static deserializeBinaryFromReader(message: ExpectedValue, reader: jspb.BinaryReader): ExpectedValue;
}

export namespace ExpectedValue {
  export type AsObject = {
    greatsuccess: number,
    success: number,
    greatsuccessprice: number,
    successprice: number,
  }
}

export interface StatusMap {
  PENDING: 0;
  FINISH: 1;
}

export const Status: StatusMap;

