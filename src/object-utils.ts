export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj)

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop as keyof T]
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value as object)
    }
  })

  return obj as Readonly<T>
}
