/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Removed Google Cloud Profiler references

if (process.env.ENABLE_TRACING === "1") {
  console.log("Tracing enabled.");
  const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
  const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
  const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');
  const { registerInstrumentations } = require('@opentelemetry/instrumentation');
  const { OTLPTraceExporter } = require("@opentelemetry/exporter-otlp-grpc");

  const provider = new NodeTracerProvider();
  const collectorUrl = process.env.COLLECTOR_SERVICE_ADDR;

  provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({ url: collectorUrl })));
  provider.register();

  registerInstrumentations({
    instrumentations: [new GrpcInstrumentation()],
  });
} else {
  console.log("Tracing disabled.");
}

const path = require('path');
const HipsterShopServer = require('./server');

const PORT = process.env['PORT'] || 50051; // Default to 50051 if PORT is not set
const PROTO_PATH = path.join(__dirname, '/proto/'); // Ensure this is declared only once

const server = new HipsterShopServer(PROTO_PATH, PORT);

server.listen();
