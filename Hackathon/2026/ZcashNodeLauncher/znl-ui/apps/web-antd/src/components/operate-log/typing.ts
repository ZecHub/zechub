import type { SystemOperateLogApi } from '#/api/system/operate-log';

export interface OperateLogProps {
  logList: SystemOperateLogApi.OperateLog[]; // Operation Log List
}