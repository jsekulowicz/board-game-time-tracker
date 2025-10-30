import type { ResolvedRequestOptions } from '../generated/client/types.gen'
import { toast } from 'vue-sonner'

export async function errorHandlerInterceptor(response: Response, request: Request, resolvedOptions: ResolvedRequestOptions) {
  // Clone so the body can be read twice
  const cloned = response.clone()

  let data: any
  try {
    data = await cloned.json()
  } catch {
    data = null
  }

  if (!response.ok || data?.error) {
    if (data?.meta?.toast) {
      toast(data.title, { description: data.message })
    }

    if (data?.meta?.log) {
      console.error('📜 Logging error:', data)
    }
  }

  return response
}
