import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Sparkles, Palette, Zap, Loader2, Search, FileText, CheckCircle, TrendingUp, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface LandingPageProps {
  onSubmit: (url: string) => void
  isLoading: boolean
  loadingStage?: string
}

export function LandingPage({ onSubmit, isLoading, loadingStage }: LandingPageProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                Professional Website Transformation
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Transform Your Website<br />
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                  Into Something Better
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Advanced AI analyzes your website's content and structure, then redesigns it with improved UX, modern aesthetics, and industry-specific features.
              </p>
            </div>

            {/* URL Input */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <Card className="p-2 shadow-xl">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Enter your website URL (e.g., https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-14 text-lg border-0 focus-visible:ring-0"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading || !url.trim()}
                    className="h-14 px-8 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>Analyzing...</>
                    ) : (
                      <>
                        Transform Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
              <p className="text-sm text-muted-foreground text-center mt-4 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Free analysis • No signup required • Results in seconds
              </p>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Better UX</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5min</div>
                <div className="text-sm text-muted-foreground mt-1">Average Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground mt-1">Industries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Before & After Showcase */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See The Transformation</h2>
          <p className="text-xl text-muted-foreground">Real examples of websites redesigned with our AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Example 1: Restaurant */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Restaurant Website</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">Before</span>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="h-24 bg-gray-200 rounded" />
                  <div className="h-24 bg-gray-200 rounded" />
                </div>
                <div className="text-xs text-gray-500 mt-4">❌ Cluttered layout • Poor navigation • Hard to find menu</div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-2 border-primary">
            <div className="p-6 border-b bg-primary/5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Restaurant Website</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-green-600 text-white font-medium">After</span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-50 to-white">
              <div className="border-2 border-orange-300 rounded-lg overflow-hidden">
                <div className="h-12 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center px-4">
                  <div className="flex gap-4">
                    <div className="h-2 w-12 bg-white/30 rounded" />
                    <div className="h-2 w-12 bg-white/30 rounded" />
                  </div>
                </div>
                <div className="p-6 space-y-3 bg-white">
                  <div className="h-4 bg-orange-200 rounded w-2/3" />
                  <div className="h-2 bg-gray-200 rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg" />
                    <div className="h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg" />
                  </div>
                  <div className="mt-4 h-8 bg-orange-500 rounded-lg" />
                </div>
              </div>
              <div className="text-xs text-green-700 mt-4 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Clear CTA • Online ordering • Reservation system
              </div>
            </div>
          </Card>

          {/* Example 2: Professional Services */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Professional Services</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">Before</span>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/2" />
                <div className="space-y-2 mt-4">
                  <div className="h-2 bg-gray-200 rounded" />
                  <div className="h-2 bg-gray-200 rounded" />
                  <div className="h-2 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="text-xs text-gray-500 mt-4">❌ Outdated design • No trust signals • Complex forms</div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-2 border-primary">
            <div className="p-6 border-b bg-primary/5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Professional Services</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-green-600 text-white font-medium">After</span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
              <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
                <div className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center px-4 justify-between">
                  <div className="h-2 w-16 bg-white/30 rounded" />
                  <div className="flex gap-2">
                    <div className="h-2 w-12 bg-white/30 rounded" />
                    <div className="h-2 w-12 bg-white/30 rounded" />
                  </div>
                </div>
                <div className="p-6 space-y-4 bg-white">
                  <div className="h-5 bg-blue-200 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded" />
                    <div className="h-2 bg-gray-200 rounded w-5/6" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="h-16 bg-blue-100 rounded-lg" />
                    <div className="h-16 bg-blue-100 rounded-lg" />
                    <div className="h-16 bg-blue-100 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="text-xs text-green-700 mt-4 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Modern UI • Calendly booking • Trust badges
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">Three simple steps to a better website</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center space-y-4 border-2 hover:border-primary transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">1. AI Analysis</h3>
              <p className="text-muted-foreground">Our AI scans your website, understands the content, and identifies UX issues automatically</p>
            </div>
          </Card>

          <Card className="p-8 text-center space-y-4 border-2 hover:border-primary transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">2. Customize</h3>
              <p className="text-muted-foreground">Choose your colors, style preferences, and select which issues to fix with our intuitive controls</p>
            </div>
          </Card>

          <Card className="p-8 text-center space-y-4 border-2 hover:border-primary transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">3. Transform</h3>
              <p className="text-muted-foreground">Get a production-ready redesign with improved navigation, modern UI, and industry features</p>
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Website?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have improved their online presence with our AI-powered redesign tool
          </p>
          <Button 
            size="lg" 
            onClick={() => document.querySelector('input[type="url"]')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-14 px-8 text-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Analyzing Website</h3>
                <p className="text-muted-foreground">
                  {loadingStage || 'Fetching website content...'}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    loadingStage?.includes('Scraping') || loadingStage?.includes('Fetching') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {loadingStage?.includes('analyzing') ? '✓' : <Search className="w-3 h-3" />}
                  </div>
                  <span className={loadingStage?.includes('analyzing') ? 'text-muted-foreground' : ''}>
                    Scraping website content
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    loadingStage?.includes('analyzing') || loadingStage?.includes('additional pages')
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {loadingStage?.includes('insights') ? '✓' : <FileText className="w-3 h-3" />}
                  </div>
                  <span className={loadingStage?.includes('insights') ? 'text-muted-foreground' : ''}>
                    Analyzing additional pages
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    loadingStage?.includes('insights') || loadingStage?.includes('Identifying')
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span>
                    Identifying design problems
                  </span>
                </div>
              </div>

              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-progress-bar" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
