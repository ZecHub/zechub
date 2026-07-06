import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace InfraCodegenApi {
  /** Code Generation Table Definition */
  export interface CodegenTable {
    id: number;
    tableId: number;
    isParentMenuIdValid: boolean;
    dataSourceConfigId: number;
    scene: number;
    tableName: string;
    tableComment: string;
    remark: string;
    moduleName: string;
    businessName: string;
    className: string;
    classComment: string;
    author: string;
    createTime: Date;
    updateTime: Date;
    templateType: number;
    parentMenuId: number;
  }

  /** Code Generation Field Definition */
  export interface CodegenColumn {
    id: number;
    tableId: number;
    columnName: string;
    dataType: string;
    columnComment: string;
    nullable: number;
    primaryKey: number;
    ordinalPosition: number;
    javaType: string;
    javaField: string;
    dictType: string;
    example: string;
    createOperation: number;
    updateOperation: number;
    listOperation: number;
    listOperationCondition: string;
    listOperationResult: number;
    htmlType: string;
  }

  /** Database table definition */
  export interface DatabaseTable {
    name: string;
    comment: string;
  }

  /** Code Generation Details */
  export interface CodegenDetail {
    table: CodegenTable;
    columns: CodegenColumn[];
  }

  /** Code Preview */
  export interface CodegenPreview {
    filePath: string;
    code: string;
  }

  /** Update Code Generation Request */
  export interface CodegenUpdateReqVO {
    table: any | CodegenTable;
    columns: CodegenColumn[];
  }

  /** Create code generation request */
  export interface CodegenCreateListReqVO {
    dataSourceConfigId?: number;
    tableNames: string[];
  }
}

/** Query list code generation table definition */
export function getCodegenTableList(dataSourceConfigId: number) {
  return requestClient.get<InfraCodegenApi.CodegenTable[]>(
    '/infra/codegen/table/list?',
    {
      params: { dataSourceConfigId },
    },
  );
}

/** Query list code generation table definition */
export function getCodegenTablePage(params: PageParam) {
  return requestClient.get<PageResult<InfraCodegenApi.CodegenTable>>(
    '/infra/codegen/table/page',
    { params },
  );
}

/** Query details to generate table definition */
export function getCodegenTable(tableId: number) {
  return requestClient.get<InfraCodegenApi.CodegenDetail>(
    '/infra/codegen/detail',
    {
      params: { tableId },
    },
  );
}

/** Modify Code Generation Table Definition */
export function updateCodegenTable(data: InfraCodegenApi.CodegenUpdateReqVO) {
  return requestClient.put('/infra/codegen/update', data);
}

/** Database-based table structure, synchronized database table and field definition */
export function syncCodegenFromDB(tableId: number) {
  return requestClient.put(
    '/infra/codegen/sync-from-db',
    {},
    {
      params: { tableId },
    },
  );
}

/** Preview Generate Code */
export function previewCodegen(tableId: number) {
  return requestClient.get<InfraCodegenApi.CodegenPreview[]>(
    '/infra/codegen/preview',
    {
      params: { tableId },
    },
  );
}

/** Download Generate Code */
export function downloadCodegen(tableId: number) {
  return requestClient.download('/infra/codegen/download', {
    params: { tableId },
  });
}

/** Get table definitions */
export function getSchemaTableList(params: any) {
  return requestClient.get<InfraCodegenApi.DatabaseTable[]>(
    '/infra/codegen/db/table/list',
    { params },
  );
}

/** Table definition for creating code generator based on database table structure */
export function createCodegenList(
  data: InfraCodegenApi.CodegenCreateListReqVO,
) {
  return requestClient.post('/infra/codegen/create-list', data);
}

/** Remove Code Generation Table Definition */
export function deleteCodegenTable(tableId: number) {
  return requestClient.delete('/infra/codegen/delete', {
    params: { tableId },
  });
}

/** Batch delete code generation table definition */
export function deleteCodegenTableList(tableIds: number[]) {
  return requestClient.delete(
    `/infra/codegen/delete-list?tableIds=${tableIds.join(',')}`,
  );
}