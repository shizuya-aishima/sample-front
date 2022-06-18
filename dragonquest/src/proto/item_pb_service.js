// package: item
// file: item.proto

var item_pb = require("./item_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Item = (function () {
  function Item() {}
  Item.serviceName = "item.Item";
  return Item;
}());

Item.create = {
  methodName: "create",
  service: Item,
  requestStream: false,
  responseStream: true,
  requestType: item_pb.CreateRequest,
  responseType: item_pb.CreateReply
};

Item.search = {
  methodName: "search",
  service: Item,
  requestStream: false,
  responseStream: true,
  requestType: item_pb.SearchRequest,
  responseType: item_pb.SearchReply
};

Item.update = {
  methodName: "update",
  service: Item,
  requestStream: false,
  responseStream: false,
  requestType: item_pb.UpdateRequest,
  responseType: item_pb.UpdateReply
};

Item.find = {
  methodName: "find",
  service: Item,
  requestStream: false,
  responseStream: false,
  requestType: item_pb.ItemFindRequest,
  responseType: item_pb.ItemFindReply
};

exports.Item = Item;

function ItemClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ItemClient.prototype.create = function create(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Item.create, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ItemClient.prototype.search = function search(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Item.search, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ItemClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Item.update, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ItemClient.prototype.find = function find(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Item.find, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ItemClient = ItemClient;

