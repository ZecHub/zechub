import { execSync } from 'node:child_process';

import { getPackagesSync } from '@vben/node-utils';

const { packages } = getPackagesSync();

const allowedScopes = [
  ...packages.map((pkg) => pkg.packageJson.name),
  'project',
  'style',
  'lint',
  'ci',
  'dev',
  'deploy',
  'other',
];

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, '');

/**
 * @type {import('cz-git').UserConfig}
 */
const userConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  prompt: {
    /** @use `pnpm commit :f` */
    alias: {
      b: 'build: bump dependencies',
      c: 'chore: update config',
      f: 'docs: fix typos',
      r: 'docs: update README',
      s: 'style: update code format',
    },
    allowCustomIssuePrefixs: false,
    // scopes: [...scopes, 'mock'],
    allowEmptyIssuePrefixs: false,
    customScopesAlign: scopeComplete ? 'bottom' : 'top',
    defaultScope: scopeComplete,
    // English
    typesAppend: [
      { name: 'workflow: workflow improvements', value: 'workflow' },
      { name: 'types:    type definition file changes', value: 'types' },
    ],

    // Cross-referenced version in Chinese and English
    // messages: {
    //   type: 'Select the type you want to submit:',
    //   Scope: 'Select a submission range (optional):',
    //   customScope: 'Please enter a custom submission range:',
    //   subject: 'fill a short refined description of the change:\n',
    //   body: 'Find a more detailed description of the changes (optional). Use a line break: \n',
    //   Breaking: 'Specify significant non-compatibility changes (optional). Use the "" line break: \n',
    //   FooterPrefixesSelect: 'Select a prefix for association (optional):',
    //   CustomFooterPrefixes: 'Input custom assue prefix:',
    //   For example: #31, #I3244:\n',
    //   confirmCommittee: 'Is it submitted or modified?',
    // },
    // types: [
    //   {value: 'feat', name: 'feat: Add function'},
    //   {value: 'fix', name: 'fix: fix defects'},
    //   {value: 'docs', name: 'docs: document changes'},
    //   {value:'style', name:'style: code format'},
    //   {value:'refactor', name:'refactor: re-engineering'}
    //   {value: 'perf', name: 'perf: optimize performance'},
    //   {value: 'test', name: 'test: Add missing test or changed test'},
    //   {value: 'Build', name: 'Build: Build Process, External Reliance Changes (e. g. Upgrade npm Package, Modify Packing Configuration, etc.) '},
    //   {value: 'ci', name: 'ci: Modify CI configuration, script'},
    //   {value:'revert', name:'revert: back roll 'committee'},
    //   {value: 'chore', name: 'chore: Changes to build processes or auxiliary tools and libraries (without prejudice to source files, test examples)'},
    //   {value: 'wip', name: 'wip: developing'}
    //   {value: 'worklow', name: 'workflow: workflow improvement'},
    //   {value: 'types', name: 'types: Type definition file modification'},
    // ],
    // If you don't fill it out, you're going to have to do it again, and you're going to have to do it again.
    // "CustomScopes Alias: 'Custom: Custom',
  },
  rules: {
    /**
     * type[scope]: [function] description
     *
     * ^^^^^^^^^^^^^^ empty line.
     * - Something here
     */
    'body-leading-blank': [2, 'always'],
    /**
     * type[scope]: [function] description
     *
     * - something here
     *
     * ^^^^^^^^^^^^^^
     */
    'footer-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description
     *      ^^^^^
     */
    'function-rules/scope-enum': [
      2, // level: error
      'always',
      (parsed) => {
        if (!parsed.scope || allowedScopes.includes(parsed.scope)) {
          return [true];
        }

        return [false, `scope must be one of ${allowedScopes.join(', ')}`];
      },
    ],
    /**
     * type[scope]: [function] description [No more than 108 characters]
     *      ^^^^^
     */
    'header-max-length': [2, 'always', 108],

    'scope-enum': [0],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    /**
     * type[scope]: [function] description
     * ^^^^
     */
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'types',
        'release',
      ],
    ],
  },
};

export default userConfig;
