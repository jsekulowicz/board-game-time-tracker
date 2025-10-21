import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi/openapi.yaml',
  output: './src/contract',
  client: 'fetch',
})
