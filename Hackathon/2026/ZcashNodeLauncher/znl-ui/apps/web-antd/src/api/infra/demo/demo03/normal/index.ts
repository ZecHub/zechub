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
    demo03courses?: Demo03Course[];
    demo03grade?: Demo03Grade;
  }
}

/** Query Student Pages */
export function getDemo03StudentPage(params: PageParam) {
  return requestClient.get<PageResult<Demo03StudentApi.Demo03Student>>(
    '/infra/demo03-student-normal/page',
    { params },
  );
}

/** Query student details */
export function getDemo03Student(id: number) {
  return requestClient.get<Demo03StudentApi.Demo03Student>(
    `/infra/demo03-student-normal/get?id=${id}`,
  );
}

/** New students */
export function createDemo03Student(data: Demo03StudentApi.Demo03Student) {
  return requestClient.post('/infra/demo03-student-normal/create', data);
}

/** Modification of students */
export function updateDemo03Student(data: Demo03StudentApi.Demo03Student) {
  return requestClient.put('/infra/demo03-student-normal/update', data);
}

/** Remove Students */
export function deleteDemo03Student(id: number) {
  return requestClient.delete(`/infra/demo03-student-normal/delete?id=${id}`);
}

/** Batch Remove Students */
export function deleteDemo03StudentList(ids: number[]) {
  return requestClient.delete(
    `/infra/demo03-student-normal/delete-list?ids=${ids.join(',')}`,
  );
}

/** Exporting students */
export function exportDemo03Student(params: any) {
  return requestClient.download('/infra/demo03-student-normal/export-excel', {
    params,
  });
}

// ==================== Sub-list (student courses)====================

/** List of student courses acquired */
export function getDemo03CourseListByStudentId(studentId: number) {
  return requestClient.get<Demo03StudentApi.Demo03Course[]>(
    `/infra/demo03-student-normal/demo03-course/list-by-student-id?studentId=${studentId}`,
  );
}

// ==================== Sub-watch (student class)====================

/** Access to student classes */
export function getDemo03GradeByStudentId(studentId: number) {
  return requestClient.get<Demo03StudentApi.Demo03Grade>(
    `/infra/demo03-student-normal/demo03-grade/get-by-student-id?studentId=${studentId}`,
  );
}