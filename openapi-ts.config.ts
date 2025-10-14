import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: '.openapi/openapi.json',
  output: 'src/contract',
  client: 'fetch',
})
