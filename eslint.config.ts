import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  globalIgnores([
    'dist/**',
    'dist-ssr/**',
    'coverage/**',
    'src/components/ui/**',
    'src/api/client/**',
    'src/api/core/**',
    'src/api/generated/**',
    'docs/**',
  ]),
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,
)
