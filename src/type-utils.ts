export function invertMap<K extends string | number | symbol, V extends string | number | symbol>(obj: Record<K, V>): Record<V, K> {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])) as Record<V, K>
}
