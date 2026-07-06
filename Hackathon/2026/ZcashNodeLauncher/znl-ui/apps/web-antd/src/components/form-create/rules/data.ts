/* eslint-disable no-template-curly-in-string */
const selectRule = [
  {
    type: 'select',
    field: 'selectType',
    title: 'Selector Type',
    value: 'select',
    options: [
      { label: 'Down Parser', value: 'select' },
      { label: 'Single Box', value: 'radio' },
      { label: 'Multiple Boxes', value: 'checkbox' },
    ],
    // See https://www.form-create.com/v3/guide/control components combined, single and multi-boxes do not require multiple properties
    control: [
      {
        value: 'select',
        condition: '==',
        method: 'hidden',
        rule: [
          'multiple',
          'clearable',
          'collapseTags',
          'multipleLimit',
          'allowCreate',
          'filterable',
          'noMatchText',
          'remote',
          'remoteMethod',
          'reserveKeyword',
          'defaultFirstOption',
          'automaticDropdown',
        ],
      },
    ],
  },
  {
    type: 'switch',
    field: 'filterable',
    title: 'filterable',
  },
  {
    type: 'switch',
    field: 'multiple',
    title: 'Whether or not to choose more options',
  },
  {
    type: 'switch',
    field: 'disabled',
    title: 'disabled',
  },
  {
    type: 'switch',
    field: 'clearable',
    title: 'clearable',
  },
  {
    type: 'switch',
    field: 'collapseTags',
    title:
      'Whether selected values should be displayed as text in multiselection',
  },
  {
    type: 'inputNumber',
    field: 'multipleLimit',
    title:
      'The maximum number of items the user can select in multiple selections is 0 without limiting',
    props: { min: 0 },
  },
  {
    type: 'input',
    field: 'autocomplete',
    title: 'Autocomplete Properties',
  },
  { type: 'input', field: 'placeholder', title: 'Placeholders' },
  {
    type: 'switch',
    field: 'allowCreate',
    title: 'Allow users to create new entries',
  },
  {
    type: 'input',
    field: 'noMatchText',
    title: 'Text displayed when search conditions do not match',
  },
  { type: 'input', field: 'noDataText', title: 'Options are empty-time text' },
  {
    type: 'switch',
    field: 'reserveKeyword',
    title:
      'Whether to retain the current search keyword after one option is selected when multiple and searchable',
  },
  {
    type: 'switch',
    field: 'defaultFirstOption',
    title: 'Press back in the input box to select the first matching entry',
  },
  {
    type: 'switch',
    field: 'popperAppendToBody',
    title: 'Whether to insert a popup box into a body element',
    value: true,
  },
  {
    type: 'switch',
    field: 'automaticDropdown',
    title:
      'Whether or not to automatically popup the option menu after the focus is obtained in the input box for non-searchable Select',
  },
];

const apiSelectRule = [
  {
    type: 'input',
    field: 'url',
    title: 'URL',
    props: {
      placeholder: '/system/user/simple-list',
    },
  },
  {
    type: 'select',
    field: 'method',
    title: 'Type of request',
    value: 'GET',
    options: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
    ],
    control: [
      {
        value: 'GET',
        condition: '!=',
        method: 'hidden',
        rule: [
          {
            type: 'input',
            field: 'data',
            title: 'Request Arguments JSON Formatting',
            props: {
              autoSize: true,
              type: 'textarea',
              placeholder: '{"type": 1}',
            },
          },
        ],
      },
    ],
  },
  {
    type: 'input',
    field: 'labelField',
    title: 'Label Properties',
    info: 'You can use an el expression: ${Property} for complex data combinations. For example: ${nickname}-${id}',
    props: {
      placeholder: 'nickname',
    },
  },
  {
    type: 'input',
    field: 'valueField',
    title: 'Value Properties',
    info: 'You can use an el expression: ${Property} for complex data combinations. For example: ${nickname}-${id}',
    props: {
      placeholder: 'id',
    },
  },
  {
    type: 'input',
    field: 'parseFunc',
    title: 'Option Parsing Functions',
    info: `data 
    (data: any)=>{ label: string; value: any }[]`,
    props: {
      autoSize: true,
      rows: { minRows: 2, maxRows: 6 },
      type: 'textarea',
      placeholder: `
        function (data) {
            console.log(data)
            return data.list.map(item=> ({label: item.nickname,value: item.id}))
        }`,
    },
  },
  {
    type: 'switch',
    field: 'remote',
    info: 'Remote',
    title: 'Remote',
  },
  {
    type: 'input',
    field: 'remoteField',
    title: 'Request Parameters',
    info: 'The parameter name on which the remote request is requested, e.g., name',
  },
];

export { apiSelectRule, selectRule };
