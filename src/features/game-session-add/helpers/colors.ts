export function getReadableTextClassForBackground(hex: string) {
  const rgb = hexToRgb(hex)
  const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b

  return luminance > 220 ? 'text-black' : 'text-white'
}

function hexToRgb(hex: string) {
  const c = hex.replace('#', '')
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  }
}
