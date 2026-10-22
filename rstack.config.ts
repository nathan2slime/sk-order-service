import { define } from 'rstack';

define.test({
  testEnvironment: 'node',
  passWithNoTests: true,
});

const ignorePatterns = [
  '**/dist/**',
  '**/node_modules/**',
  'rspack.config.js',
  '**/prisma/**',
  '**/migrations/**',
];

define.fmt({
  ignorePatterns,
  printWidth: 100,
  singleQuote: true,
});

define.lint(({ js, ts, globalIgnores }) => [
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  globalIgnores(ignorePatterns),
]);
