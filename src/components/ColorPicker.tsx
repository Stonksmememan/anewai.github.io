import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { ColorValue, hslToString } from '@/lib/colorUtils'

interface ColorPickerProps {
  label: string
  color: ColorValue
  onChange: (color: ColorValue) => void
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const colorString = hslToString(color)

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Label className="text-sm font-medium mb-2 block">{label}</Label>
        <div
          className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
          style={{ backgroundColor: colorString }}
        />
      </div>

      {/* Hue Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Hue</Label>
          <span className="text-xs font-mono text-muted-foreground">{color.hue}°</span>
        </div>
        <div className="relative h-8 rounded-md overflow-hidden" style={{
          background: 'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))'
        }}>
          <Slider
            value={[color.hue]}
            onValueChange={([hue]) => onChange({ ...color, hue })}
            max={360}
            step={1}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Saturation Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Saturation</Label>
          <span className="text-xs font-mono text-muted-foreground">{color.saturation}%</span>
        </div>
        <div className="relative h-8 rounded-md overflow-hidden" style={{
          background: `linear-gradient(to right, hsl(${color.hue}, 0%, ${color.lightness}%), hsl(${color.hue}, 100%, ${color.lightness}%))`
        }}>
          <Slider
            value={[color.saturation]}
            onValueChange={([saturation]) => onChange({ ...color, saturation })}
            max={100}
            step={1}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Lightness Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Lightness</Label>
          <span className="text-xs font-mono text-muted-foreground">{color.lightness}%</span>
        </div>
        <div className="relative h-8 rounded-md overflow-hidden" style={{
          background: `linear-gradient(to right, hsl(${color.hue}, ${color.saturation}%, 0%), hsl(${color.hue}, ${color.saturation}%, 50%), hsl(${color.hue}, ${color.saturation}%, 100%))`
        }}>
          <Slider
            value={[color.lightness]}
            onValueChange={([lightness]) => onChange({ ...color, lightness })}
            max={100}
            step={1}
            className="absolute inset-0"
          />
        </div>
      </div>
    </div>
  )
}
