import { requestClient } from '#/api/request';

export namespace Demo02CategoryApi {
  /** Example Categorization Information */
  export interface Demo02Category {
    id: number; // Numbering
    name?: string; // Name
    parentId?: number; // Parent Numbering
    children?: Demo02Category[];
  }
}

/** Query example classification list */
export function getDemo02CategoryList(params: any) {
  return requestClient.get<Demo02CategoryApi.Demo02Category[]>(
    '/infra/demo02-category/list',
    { params },
  );
}

/** Query details for example categories */
export function getDemo02Category(id: number) {
  return requestClient.get<Demo02CategoryApi.Demo02Category>(
    `/infra/demo02-category/get?id=${id}`,
  );
}

/** New Example Category */
export function createDemo02Category(data: Demo02CategoryApi.Demo02Category) {
  return requestClient.post('/infra/demo02-category/create', data);
}

/** Modify Example Category */
export function updateDemo02Category(data: Demo02CategoryApi.Demo02Category) {
  return requestClient.put('/infra/demo02-category/update', data);
}

/** Delete Example Category */
export function deleteDemo02Category(id: number) {
  return requestClient.delete(`/infra/demo02-category/delete?id=${id}`);
}

/** Export example categories */
export function exportDemo02Category(params: any) {
  return requestClient.download('/infra/demo02-category/export-excel', {
    params,
  });
}