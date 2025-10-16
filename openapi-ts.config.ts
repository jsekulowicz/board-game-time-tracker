import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi/openapi.json',
  output: {
    path: './src/api/generated',
    format: 'prettier',
  },
  plugins: [
    {
      name: '@hey-api/typescript',
      enumStyle: 'asConst',
      inferTypes: true,
      output: {
        name: 'ApiTypes',
      },
    },
    {
      name: '@hey-api/client-fetch',
      output: {
        name: 'ApiClient',
      },
    },
  ],
  resolver: {
    baseDir: 'openapi',
  },
})
