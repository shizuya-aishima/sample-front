#!/usr/bin/env bash

set -eu


# protoファイルがあるディレクトリへの相対パス
PROTO_SRC=../proto
# 生成したjs、tsファイルを格納したいディレクトリへの相対パス
PROTO_DEST=./src/proto

mkdir -p ${PROTO_DEST}

# protoc-gen-tsへのパス
PROTOC_GEN_TS_PATH="$(npm bin)/protoc-gen-ts"

protoc \
  --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
  --js_out="import_style=commonjs,binary:${PROTO_DEST}" \
  --ts_out="service=grpc-web:${PROTO_DEST}" \
  -I ${PROTO_SRC} $(find ${PROTO_SRC} -name "*.proto")
