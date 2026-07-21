import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, 'src/proto/service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const lightwalletd = protoDescriptor.cash.z.wallet.sdk.rpc;

const client = new lightwalletd.CompactTxStreamer(
  'lightwalletd.electriccoin.co:9067',
  grpc.credentials.createSsl()
);

client.GetLightdInfo({}, (error: any, response: any) => {
  if (error) {
    console.error("Error with SSL:", error);
    // try insecure
    const client2 = new lightwalletd.CompactTxStreamer(
      'lightwalletd.electriccoin.co:9067',
      grpc.credentials.createInsecure()
    );
    client2.GetLightdInfo({}, (error2: any, response2: any) => {
      if (error2) console.error("Error insecure:", error2);
      else console.log("Success insecure:", response2);
    });
  } else {
    console.log("Success SSL:", response);
  }
});
