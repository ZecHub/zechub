import type { Dayjs } from 'dayjs';

import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace ZcashNodeServerApi {
  /** Node Server Information */
  export interface NodeServer {
    id: number; // ID
    host: string; // host
    name: string; // Name
    port: number; // default: 21
    username: string; // username
    password: string; // password
    nodeType?: null | string; // Pruning Node/ Full Node
    proxyType: string; // proxy type
    proxyHost: string; // proxy host
    proxyPort?: number; // proxy port
    proxyUsername: string; // proxy username
    proxyPassword: string; // proxy password
    serverStatus: string; // online / lost
    serverError: string; // network not reachable / incorrect password / Exception
    serverStatusCheckTime: Dayjs | string; // server status check time
    installationStatus: string; // not installed / installed
    installationLog: string; // ssh output
    installationStatusCheckTime: Dayjs | string; // installation status check time
    nodeStatus: string; // started / stopped
    nodeError: string; // node start error
    nodeStatusCheckTime: Dayjs | string; // node status check time
    sort?: number; // Show Order
    remark: string; // Remarks
    refreshServerStatus: boolean;
  }
}

/** Query Node Server Pagination */
export function getNodeServerPage(params: PageParam) {
  return requestClient.get<PageResult<ZcashNodeServerApi.NodeServer>>(
    '/zcash/node-server/page',
    { params },
  );
}

/** Query Node Server Details */
export function getNodeServer(id: number) {
  return requestClient.get<ZcashNodeServerApi.NodeServer>(
    `/zcash/node-server/get?id=${id}`,
  );
}

/** Create Node Server */
export function createNodeServer(data: ZcashNodeServerApi.NodeServer) {
  return requestClient.post('/zcash/node-server/create', data);
}

/** Update Node Server */
export function updateNodeServer(data: ZcashNodeServerApi.NodeServer) {
  return requestClient.put('/zcash/node-server/update', data);
}

/** Delete Node Server */
export function deleteNodeServer(id: number) {
  return requestClient.delete(`/zcash/node-server/delete?id=${id}`);
}

/** Batch Delete Node Server */
export function deleteNodeServerList(ids: number[]) {
  return requestClient.delete(
    `/zcash/node-server/delete-list?ids=${ids.join(',')}`,
  );
}

/** Export Node Server */
export function exportNodeServer(params: any) {
  return requestClient.download('/zcash/node-server/export-excel', { params });
}

/** refresh status */
export function refreshNodeServerStatus(data: ZcashNodeServerApi.NodeServer) {
  return requestClient.post('/zcash/node-server/refresh-status', data);
}

/** start */
export function startNodeServer(data: ZcashNodeServerApi.NodeServer) {
  return requestClient.post('/zcash/node-server/start', data);
}

/** stop */
export function stopNodeServer(data: ZcashNodeServerApi.NodeServer) {
  return requestClient.post('/zcash/node-server/stop', data);
}

/** install */
export function installNodeServer(data: any) {
  return requestClient.post('/zcash/node-server/install', data);
}

/** uninstall */
export function uninstallNodeServer(data: ZcashNodeServerApi.NodeServer) {
  return requestClient.post('/zcash/node-server/uninstall', data);
}

/** getNodesGlobeData */
export function getNodesGlobeData(params: any) {
  return requestClient.get<PageResult<any>>(
    '/zcash/node-server/getNodesGlobeData',
    { params },
  );
}

/** getInstallationScripts */
export function getInstallationScripts(params: any) {
  return requestClient.get<any>('/zcash/node-server/getInstallationScripts', {
    params,
  });
}
