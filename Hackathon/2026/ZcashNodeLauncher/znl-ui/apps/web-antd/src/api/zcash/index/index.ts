import { requestClient } from '#/api/request';

/** getRandomGlobeData */
export function getRandomGlobeData(params: any) {
  return requestClient.get<any>('/zcash/index/getRandomGlobeData', {
    params,
  });
}
