import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

function getZainoUrl(): string {
  const url = process.env.ZAINO_GRPC_URL;
  if (!url) throw new Error('ZAINO_GRPC_URL is not configured');
  return url;
}

const PROTO_PATH = path.join(__dirname, '../../proto/service.proto');

let _client: grpc.Client | null = null;

function apiKeyInterceptor(
  options: grpc.InterceptorOptions,
  nextCall: grpc.NextCall,
) {
  return new grpc.InterceptingCall(nextCall(options), {
    start(metadata: grpc.Metadata, listener: grpc.Listener, next: Function) {
      if (process.env.ZAINO_GRPC_API_KEY) {
        metadata.set('x-api-key', process.env.ZAINO_GRPC_API_KEY);
      }
      next(metadata, listener);
    },
  });
}

function client(): any {
  if (_client) return _client;

  const pkgDef = protoLoader.loadSync(PROTO_PATH, {
    keepCase:  true,
    longs:     String,
    enums:     String,
    defaults:  true,
    oneofs:    true,
  });

  const proto = grpc.loadPackageDefinition(pkgDef) as Record<string, any>;
  const Ctor  = proto?.cash?.z?.wallet?.sdk?.rpc?.CompactTxStreamer as typeof grpc.Client;

  if (!Ctor) throw new Error('CompactTxStreamer not found in proto');

  const zainoUrl = getZainoUrl();
  const zainoAddr = zainoUrl.replace(/^https?:\/\//, '');
  const creds = zainoUrl.startsWith('https://')
    ? grpc.credentials.createSsl()
    : grpc.credentials.createInsecure();

  _client = new Ctor(zainoAddr, creds, { interceptors: [apiKeyInterceptor] });
  return _client;
}

export async function getLightdInfo(): Promise<{
  chainName: string;
  blockHeight: string;
  saplingActivationHeight: string;
}> {
  return new Promise((resolve, reject) => {
    client().GetLightdInfo({}, (err: grpc.ServiceError, res: any) => {
      if (err) reject(err); else resolve(res);
    });
  });
}

export async function getLatestBlock(): Promise<{ height: string; hash: Buffer }> {
  return new Promise((resolve, reject) => {
    client().GetLatestBlock({}, (err: grpc.ServiceError, res: any) => {
      if (err) reject(err); else resolve(res);
    });
  });
}

export async function getAddressUtxos(
  addresses: string[],
  startHeight = 0,
  maxEntries  = 200,
): Promise<Array<{ address: string; txid: Buffer; valueZat: number; height: string }>> {
  return new Promise((resolve, reject) => {
    client().GetAddressUtxos(
      { addresses, startHeight, maxEntries },
      (err: grpc.ServiceError, res: any) => {
        if (err) reject(err);
        else resolve(res?.addressUtxos ?? []);
      },
    );
  });
}

export async function getTaddressTransactions(
  address: string,
  startHeight: number,
  endHeight:   number,
): Promise<Array<{ data: Buffer; height: string }>> {
  return new Promise((resolve, reject) => {
    const txs: any[] = [];
    const stream = client().GetTaddressTransactions({
      address,
      range: { start: { height: startHeight }, end: { height: endHeight } },
    });
    stream.on('data',  (tx: any) => txs.push(tx));
    stream.on('end',   () => resolve(txs));
    stream.on('error', (err: Error) => reject(err));
  });
}
