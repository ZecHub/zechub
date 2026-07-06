import type { Dayjs } from 'dayjs';

import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace Demo03StudentApi {
  /** Student course information */
  export interface Demo03Course {
    id: number; // Numbering
    studentId?: number; // Student ID
    name?: string; // Name
    score?: number; // Scores
  }

  /** Student Class Information */
  export interface Demo03Grade {
    id: number; // Numbering
    studentId?: number; // Student ID
    name?: string; // Name
    teacher?: string; // Headmaster.
  }

  /** Student Information */
  export interface Demo03Student {
    id: number; // Numbering
    name?: string; // Name
    sex?: number; // Gender
    birthday?: Dayjs | string; // Date of birth
    description?: string; // Introduction
  }
}

/** Query Student Pages */
export function getDemo03StudentPage(params: PageParam) {
  return requestClient.get<PageResult<Demo03StudentApi.Demo03Student>>(
    '/infra/demo03-student-erp/page',
    { params },
  );
}

/** Query student details */
export function getDemo03Student(id: number) {
  return requestClient.get<Demo03StudentApi.Demo03Student>(
    `/infra/demo03-student-erp/get?id=${id}`,
  );
}

/** New students */
export function createDemo03Student(data: Demo03StudentApi.Demo03Student) {
  return requestClient.post('/infra/demo03-student-erp/create', data);
}

/** Modification of students */
export function updateDemo03Student(data: Demo03StudentApi.Demo03Student) {
  return requestClient.put('/infra/demo03-student-erp/update', data);
}

/** Remove Students */
export function deleteDemo03Student(id: number) {
  return requestClient.delete(`/infra/demo03-student-erp/delete?id=${id}`);
}

/** Batch Remove Students */
export function deleteDemo03StudentList(ids: number[]) {
  return requestClient.delete(
    `/infra/demo03-student-erp/delete-list?ids=${ids.join(',')}`,
  );
}

/** Exporting students */
export function exportDemo03Student(params: any) {
  return requestClient.download('/infra/demo03-student-erp/export-excel', {
    params,
  });
}

// ==================== Sub-list (student courses)====================

/** Access to student courses by page */
export function getDemo03CoursePage(params: PageParam) {
  return requestClient.get<PageResult<Demo03StudentApi.Demo03Course>>(
    `/infra/demo03-student-erp/demo03-course/page`,
    { params },
  );
}
/** New student courses */
export function createDemo03Course(data: Demo03StudentApi.Demo03Course) {
  return requestClient.post(
    `/infra/demo03-student-erp/demo03-course/create`,
    data,
  );
}

/** Revision of the student curriculum */
export function updateDemo03Course(data: Demo03StudentApi.Demo03Course) {
  return requestClient.put(
    `/infra/demo03-student-erp/demo03-course/update`,
    data,
  );
}

/** Remove Student Course */
export function deleteDemo03Course(id: number) {
  return requestClient.delete(
    `/infra/demo03-student-erp/demo03-course/delete?id=${id}`,
  );
}

/** Batch Remove Students Course */
export function deleteDemo03CourseList(ids: number[]) {
  return requestClient.delete(
    `/infra/demo03-student-erp/demo03-course/delete-list?ids=${ids.join(',')}`,
  );
}

/** Access to student courses */
export function getDemo03Course(id: number) {
  return requestClient.get<Demo03StudentApi.Demo03Course>(
    `/infra/demo03-student-erp/demo03-course/get?id=${id}`,
  );
}

// ==================== Sub-watch (student class)====================

/** Access to Student Class Pages */
export function getDemo03GradePage(params: PageParam) {
  return requestClient.get<PageResult<Demo03StudentApi.Demo03Grade>>(
    `/infra/demo03-student-erp/demo03-grade/page`,
    { params },
  );
}
/** New classes for students */
export function createDemo03Grade(data: Demo03StudentApi.Demo03Grade) {
  return requestClient.post(
    `/infra/demo03-student-erp/demo03-grade/create`,
    data,
  );
}

/** Revision of pupils'classes */
export function updateDemo03Grade(data: Demo03StudentApi.Demo03Grade) {
  return requestClient.put(
    `/infra/demo03-student-erp/demo03-grade/update`,
    data,
  );
}

/** Remove student classes */
export function deleteDemo03Grade(id: number) {
  return requestClient.delete(
    `/infra/demo03-student-erp/demo03-grade/delete?id=${id}`,
  );
}

/** Bulk to remove student classes */
export function deleteDemo03GradeList(ids: number[]) {
  return requestClient.delete(
    `/infra/demo03-student-erp/demo03-grade/delete-list?ids=${ids.join(',')}`,
  );
}

/** Access to student classes */
export function getDemo03Grade(id: number) {
  return requestClient.get<Demo03StudentApi.Demo03Grade>(
    `/infra/demo03-student-erp/demo03-grade/get?id=${id}`,
  );
}