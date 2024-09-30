// server.js

const path = require('path');
const grpc = require('@grpc/grpc-js');
const pino = require('pino');
const protoLoader = require('@grpc/proto-loader');
const charge = require('./charge'); // Assuming you have a charge.js for handling charge logic

const logger = pino({
  name: 'paymentservice-server',
  messageKey: 'message',
  formatters: {
    level(logLevelString) {
      return { severity: logLevelString };
    },
  },
});

class PaymentServiceServer {
  constructor(protoRoot, port = PaymentServiceServer.PORT) {
    this.port = port;

    // Load proto files
    this.packages = {
      hipsterShop: this.loadProto(path.join(protoRoot, 'demo.proto')),
      health: this.loadProto(path.join(protoRoot, 'grpc/health/v1/health.proto')),
    };

    this.server = new grpc.Server();
    this.loadAllProtos();
  }

  static ChargeServiceHandler(call, callback) {
    try {
      logger.info(`PaymentService#Charge invoked with request ${JSON.stringify(call.request)}`);
      const response = charge(call.request); // Assuming charge is defined in charge.js
      callback(null, response);
    } catch (err) {
      logger.error(err);
      callback(err);
    }
  }

  static CheckHandler(call, callback) {
    callback(null, { status: 'SERVING' });
  }

  listen() {
    this.server.bindAsync(
      `[::]:${this.port}`,
      grpc.ServerCredentials.createInsecure(),
      () => {
        logger.info(`PaymentService gRPC server started on port ${this.port}`);
        this.server.start();
      }
    );
  }

  loadProto(protoPath) {
    const packageDefinition = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    return grpc.loadPackageDefinition(packageDefinition);
  }

  loadAllProtos() {
    const hipsterShopPackage = this.packages.hipsterShop.hipstershop;
    const healthPackage = this.packages.health.grpc.health.v1;

    this.server.addService(
      hipsterShopPackage.PaymentService.service,
      {
        charge: PaymentServiceServer.ChargeServiceHandler.bind(this),
      }
    );

    this.server.addService(
      healthPackage.Health.service,
      {
        check: PaymentServiceServer.CheckHandler.bind(this),
      }
    );
  }
}

// Set port from environment variable or default to 50051
PaymentServiceServer.PORT = process.env.PORT || 50051;

// Start the server
const server = new PaymentServiceServer(path.join(__dirname, 'protos')); // Adjust proto path as needed
server.listen();
