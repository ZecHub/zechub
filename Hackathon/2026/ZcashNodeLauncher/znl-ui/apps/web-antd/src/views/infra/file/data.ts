import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { getRangePickerDefaultProps } from '#/utils';

/** Fields of Forms */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'file',
      label: 'File Upload',
      component: 'Upload',
      componentProps: {
        placeholder: 'Please select the file to upload',
      },
      rules: 'required',
    },
  ];
}

/** Search forms for the list */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'path',
      label: 'File Path',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the file path',
        clearable: true,
      },
    },
    {
      fieldName: 'type',
      label: 'File Type',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the file type',
        clearable: true,
      },
    },
    {
      fieldName: 'createTime',
      label: 'Created',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        clearable: true,
      },
    },
  ];
}

/** Fields in the List */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'name',
      title: 'Filename',
      minWidth: 150,
    },
    {
      field: 'path',
      title: 'File Path',
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'url',
      title: 'URL',
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'size',
      title: 'File Size',
      minWidth: 80,
      formatter: 'formatFileSize',
    },
    {
      field: 'type',
      title: 'File Type',
      minWidth: 120,
    },
    {
      field: 'file-content',
      title: 'File Contents',
      minWidth: 120,
      slots: {
        default: 'file-content',
      },
    },
    {
      field: 'createTime',
      title: 'Upload Time',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: 'Operation',
      width: 160,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}