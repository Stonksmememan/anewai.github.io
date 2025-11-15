import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ColorPicker } from './ColorPicker'
import { ColorValue, hslToString } from '@/lib/colorUtils'
import { Sparkles, ArrowLeft, Palette, Loader2, ArrowRight } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Checkbox } from '@/components/ui/checkbox'

interface DesignStudioProps {
  websiteContent: string
  websiteMetadata: any
  websiteProblems: string[]
  onGenerate: (options: {
    colorMode: 'ai' | 'manual' | 'current'
    styleType: 'professional' | 'modern' | 'creative' | 'elegant' | 'playful'
    colors: {
      primary: ColorValue
      secondary: ColorValue
      tertiary: ColorValue
    }
    selectedProblems: string[]
    additionalChanges: string
    industry: string
  }) => void
  onBack: () => void
  isGenerating: boolean
}

export function DesignStudio({ 
  websiteContent, 
  websiteMetadata,
  websiteProblems,
  onGenerate, 
  onBack,
  isGenerating 
}: DesignStudioProps) {
  const [colorMode, setColorMode] = useState<'ai' | 'manual' | 'current'>('ai')
  const [styleType, setStyleType] = useState<'professional' | 'modern' | 'creative' | 'elegant' | 'playful'>('modern')
  const [primaryColor, setPrimaryColor] = useState<ColorValue>({ hue: 261, saturation: 75, lightness: 67 })
  const [secondaryColor, setSecondaryColor] = useState<ColorValue>({ hue: 271, saturation: 81, lightness: 56 })
  const [tertiaryColor, setTertiaryColor] = useState<ColorValue>({ hue: 166, saturation: 77, lightness: 70 })
  const [selectedProblems, setSelectedProblems] = useState<string[]>(websiteProblems)
  const [additionalChanges, setAdditionalChanges] = useState('')
  const [industry, setIndustry] = useState('general')

  const toggleProblem = (problem: string) => {
    setSelectedProblems(prev => 
      prev.includes(problem) 
        ? prev.filter(p => p !== problem)
        : [...prev, problem]
    )
  }

  const handleGenerate = () => {
    onGenerate({
      colorMode,
      styleType,
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: tertiaryColor
      },
      selectedProblems,
      additionalChanges,
      industry
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Design Studio
                </h1>
                <p className="text-sm text-muted-foreground">
                  {websiteMetadata?.title || 'Customize your redesign'}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-primary font-medium">Ready to generate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="space-y-8">
          {/* Industry Selection - Full Width */}
          <Card className="p-8 shadow-md border-2">
            <Label className="text-base font-semibold mb-4 block">Business Industry</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select your industry to get tailored features and integrations:
            </p>
            <ToggleGroup 
              type="single" 
              value={industry} 
              onValueChange={(value) => value && setIndustry(value)}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"
            >
              <ToggleGroupItem 
                value="general" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">General</span>
                <span className="text-xs mt-1 opacity-80">Standard website</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="restaurant" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Restaurant</span>
                <span className="text-xs mt-1 opacity-80">Reservations & ordering</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="nonprofit" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Non-Profit</span>
                <span className="text-xs mt-1 opacity-80">Donations & campaigns</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="dental" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Dental</span>
                <span className="text-xs mt-1 opacity-80">Appointments & records</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="ecommerce" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">E-commerce</span>
                <span className="text-xs mt-1 opacity-80">Shopping cart & checkout</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="salon" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Salon/Spa</span>
                <span className="text-xs mt-1 opacity-80">Booking & services</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="fitness" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Fitness</span>
                <span className="text-xs mt-1 opacity-80">Classes & memberships</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="realestate" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Real Estate</span>
                <span className="text-xs mt-1 opacity-80">Listings & tours</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="education" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Education</span>
                <span className="text-xs mt-1 opacity-80">Courses & enrollment</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="healthcare" 
                className="h-auto py-4 px-3 flex flex-col items-start data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span className="font-semibold">Healthcare</span>
                <span className="text-xs mt-1 opacity-80">Appointments & telemedicine</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 inline mr-2" />
              {industry === 'general' && 'Standard features: Contact forms, about page, portfolio/gallery sections'}
              {industry === 'restaurant' && 'Includes: Table reservation system, online menu ordering, Uber Eats & DoorDash integration buttons, special offers section'}
              {industry === 'nonprofit' && 'Includes: Online donation forms, campaign progress tracking, volunteer sign-up, impact stories showcase'}
              {industry === 'dental' && 'Includes: Online appointment booking, patient forms, insurance information, service descriptions, before/after gallery'}
              {industry === 'ecommerce' && 'Includes: Product catalog, shopping cart, checkout flow, customer reviews, wishlist functionality'}
              {industry === 'salon' && 'Includes: Service booking system, stylist profiles, price list, gallery of work, membership packages'}
              {industry === 'fitness' && 'Includes: Class schedule, membership tiers, trainer bios, online booking, progress tracking'}
              {industry === 'realestate' && 'Includes: Property listings, search filters, virtual tours, agent profiles, mortgage calculator'}
              {industry === 'education' && 'Includes: Course catalog, enrollment forms, student portal, instructor profiles, calendar'}
              {industry === 'healthcare' && 'Includes: Appointment scheduling, telemedicine integration, patient portal, insurance info, service descriptions'}
            </div>
          </Card>

          {/* Identified Problems - Full Width */}
          <Card className="p-8 shadow-md border-2">
            <Label className="text-lg font-bold mb-2 block flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Identified Issues with This Website
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select which issues you want the AI to fix:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {websiteProblems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors border-2 border-primary/20 bg-primary/5">
                  <Checkbox
                    id={`problem-${index}`}
                    checked={selectedProblems.includes(problem)}
                    onCheckedChange={() => toggleProblem(problem)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={`problem-${index}`}
                    className="text-sm font-semibold leading-relaxed cursor-pointer flex-1 text-foreground"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary shrink-0" />
                      <span>Solving Issue {index + 1} of {websiteProblems.length}:</span>
                    </span>
                    <div className="mt-1 font-medium text-foreground/90">
                      {problem}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Style Type - Full Width */}
          <Card className="p-8 shadow-md border-2">
            <Label className="text-lg font-bold mb-2 block flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Style Type
            </Label>
            <ToggleGroup 
              type="single" 
              value={styleType} 
              onValueChange={(value) => value && setStyleType(value as 'professional' | 'modern' | 'creative' | 'elegant' | 'playful')}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"
            >
              <ToggleGroupItem 
                value="professional" 
                className="h-12 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Professional
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="modern" 
                className="h-12 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Modern
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="creative" 
                className="h-12 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Creative
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="elegant" 
                className="h-12 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Elegant
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="playful" 
                className="h-12 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Playful
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="mt-3 text-sm text-muted-foreground">
              {styleType === 'professional' && '• Clean, trustworthy, business-focused design'}
              {styleType === 'modern' && '• Sleek, minimal, contemporary aesthetics'}
              {styleType === 'creative' && '• Bold, artistic, unique visual approach'}
              {styleType === 'elegant' && '• Sophisticated, refined, luxury feel'}
              {styleType === 'playful' && '• Colorful, friendly, casual vibe'}
            </div>
          </Card>

          {/* Color Palette and Preview - Conditional Layout */}
          <div className={`grid gap-8 ${colorMode === 'manual' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Color Palette */}
            <Card className="p-8 shadow-md border-2">
              <Label className="text-lg font-bold mb-2 block flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Color Palette
              </Label>
              
              {/* Color Mode Selection */}
              <div className="mb-6">
                <ToggleGroup 
                  type="single" 
                  value={colorMode} 
                  onValueChange={(value) => value && setColorMode(value as 'ai' | 'manual' | 'current')}
                  className="grid grid-cols-3 gap-2"
                >
                  <ToggleGroupItem 
                    value="ai" 
                    className="h-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    Let AI choose
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="manual" 
                    className="h-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    Custom
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="current" 
                    className="h-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    Keep Original
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Color Pickers (only show for manual mode) */}
              {colorMode === 'manual' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <ColorPicker
                      label="Color 1 - Primary"
                      color={primaryColor}
                      onChange={setPrimaryColor}
                    />
                  </div>
                  <div>
                    <ColorPicker
                      label="Color 2 - Secondary"
                      color={secondaryColor}
                      onChange={setSecondaryColor}
                    />
                  </div>
                  <div>
                    <ColorPicker
                      label="Color 3 - Tertiary"
                      color={tertiaryColor}
                      onChange={setTertiaryColor}
                    />
                  </div>
                </div>
              )}
              
              {colorMode === 'ai' && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  AI will intelligently choose a color palette that matches the website content and creates optimal visual harmony.
                </div>
              )}
              
              {colorMode === 'current' && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                  The redesign will preserve the original website's color scheme while improving the UI layout and structure.
                </div>
              )}
            </Card>

            {/* Color Preview - Only show for manual/custom mode */}
            {colorMode === 'manual' && (
              <Card className="p-8 shadow-md border-2">
                <Label className="text-lg font-bold mb-2 block flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Live Preview
                </Label>
              
              {/* Mock Website Preview */}
              <div className="space-y-4 border rounded-lg p-6" style={{ 
                backgroundColor: '#fff'
              }}>
                {/* Header */}
                <div className="h-16 rounded-lg flex items-center justify-between px-4" style={{
                  backgroundColor: hslToString(primaryColor)
                }}>
                  <div className="h-3 w-16 bg-white/30 rounded" />
                  <div className="flex gap-2">
                    <div className="h-3 w-12 bg-white/30 rounded" />
                    <div className="h-3 w-12 bg-white/30 rounded" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="h-4 w-32 rounded" style={{
                    backgroundColor: hslToString({ ...primaryColor, lightness: 85 })
                  }} />
                  <div className="h-3 w-48 rounded bg-muted" />
                </div>

                {/* CTA Button */}
                <div className="flex justify-center py-4">
                  <div 
                    className="h-12 w-40 rounded-lg flex items-center justify-center text-white font-medium text-sm"
                    style={{ backgroundColor: hslToString(secondaryColor) }}
                  >
                    Call to Action
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-32 rounded-lg border-2" style={{
                    borderColor: hslToString({ ...primaryColor, lightness: 80 })
                  }}>
                    <div className="h-16 rounded-t-lg" style={{
                      backgroundColor: hslToString({ ...primaryColor, lightness: 90 })
                    }} />
                    <div className="p-2 space-y-1">
                      <div className="h-2 bg-muted rounded w-3/4" />
                      <div className="h-2 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-32 rounded-lg border-2" style={{
                    borderColor: hslToString({ ...secondaryColor, lightness: 80 })
                  }}>
                    <div className="h-16 rounded-t-lg" style={{
                      backgroundColor: hslToString({ ...secondaryColor, lightness: 90 })
                    }} />
                    <div className="p-2 space-y-1">
                      <div className="h-2 bg-muted rounded w-3/4" />
                      <div className="h-2 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-32 rounded-lg border-2" style={{
                    borderColor: hslToString({ ...tertiaryColor, lightness: 80 })
                  }}>
                    <div className="h-16 rounded-t-lg" style={{
                      backgroundColor: hslToString({ ...tertiaryColor, lightness: 90 })
                    }} />
                    <div className="p-2 space-y-1">
                      <div className="h-2 bg-muted rounded w-3/4" />
                      <div className="h-2 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg mb-1"
                      style={{ backgroundColor: hslToString(primaryColor) }}
                    />
                    <div className="text-xs font-medium">Primary</div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {hslToString(primaryColor).match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)?.slice(1).join(', ') || ''}
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg mb-1"
                      style={{ backgroundColor: hslToString(secondaryColor) }}
                    />
                    <div className="text-xs font-medium">Secondary</div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {hslToString(secondaryColor).match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)?.slice(1).join(', ') || ''}
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg mb-1"
                      style={{ backgroundColor: hslToString(tertiaryColor) }}
                    />
                    <div className="text-xs font-medium">Tertiary</div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {hslToString(tertiaryColor).match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)?.slice(1).join(', ') || ''}
                    </div>
                  </div>
                </div>
              </div>
              </Card>
            )}
          </div>

          {/* Additional Changes - Full Width */}
          <Card className="p-8 shadow-md border-2">
            <Label htmlFor="changes" className="text-lg font-bold mb-2 block flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Additional Customizations
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Describe any specific changes or improvements you'd like to see
            </p>
            <Textarea
              id="changes"
              placeholder="Describe any specific changes you'd like to see..."
              value={additionalChanges}
              onChange={(e) => setAdditionalChanges(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </Card>

          {/* Generate Button - Full Width */}
          <Card className="p-8 shadow-lg border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Ready to Transform?</h3>
                <p className="text-sm text-muted-foreground">
                  Click below to generate your redesigned website with all selected customizations
                </p>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg"
                className="w-full h-16 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Redesign...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Website Redesign
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
