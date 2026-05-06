import '@jsekulowicz/ds-components/toast/define'
import { toast } from '@jsekulowicz/ds-components/toast'
import type { ErrorResponse } from '@/api/generated'

export async function errorHandlerInterceptor(response: Response): Promise<Response> {
  const cloned = response.clone()

  let data: unknown

  try {
    data = await cloned.json()
  } catch {
    data = null
  }

  const isErrorResponse = (obj: unknown): obj is ErrorResponse => {
    return typeof obj === 'object' && obj !== null && 'error' in obj && 'message' in obj && 'statusCode' in obj
  }

  if (!response.ok || (isErrorResponse(data) && data.error)) {
    if (isErrorResponse(data)) {
      if (data.meta?.toast) {
        toast.danger(data.title ?? data.error, { body: data.message })
      }

      if (data.meta?.log) {
        console.error(`[API Error] ${data.title ?? data.error}: ${data.message}`)
      }
    } else {
      console.error('[API Error] Unexpected response format:', data)
    }
  }

  return response
}
