export interface ColorValue {
  hue: number
  saturation: number
  lightness: number
}

export function hslToString(color: ColorValue): string {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`
}
