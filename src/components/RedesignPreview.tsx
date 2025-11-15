import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, ExternalLink, Sparkles, CheckCircle2, Send } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface RedesignPreviewProps {
  htmlContent: string
  solvedProblems: string[]
  onBack: () => void
  onStartOver: () => void
  onRequestChanges?: (changes: string) => void
  isRegenerating?: boolean
}

export function RedesignPreview({ htmlContent, solvedProblems, onBack, onStartOver, onRequestChanges, isRegenerating = false }: RedesignPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [changeRequest, setChangeRequest] = useState('')
  const [showChangeInput, setShowChangeInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    // Check if HTML content is complete (has closing </html> tag)
    if (htmlContent.includes('</html>')) {
      setIsGenerating(false)
      setProgress(100)
      setCurrentProblemIndex(solvedProblems.length)
      // Show summary and modal after 1 second
      setTimeout(() => {
        setShowSummary(true)
        setShowChangeInput(true)
        setShowSuccessModal(true)
      }, 1000)
    } else if (htmlContent.length > 0) {
      // Even slower progress - targeting 50,000 chars and capping at 85%
      const estimatedProgress = Math.min(85, (htmlContent.length / 50000) * 100)
      setProgress(estimatedProgress)
      
      // Update current problem being solved based on progress
      const problemProgress = Math.floor((estimatedProgress / 85) * solvedProblems.length)
      setCurrentProblemIndex(Math.min(problemProgress, solvedProblems.length - 1))
    }
  }, [htmlContent, solvedProblems])
  
  const handleSubmitChanges = () => {
    if (changeRequest.trim() && onRequestChanges) {
      onRequestChanges(changeRequest.trim())
      setChangeRequest('')
      setShowChangeInput(false)
      setIsGenerating(true)
      setShowSummary(false)
    }
  }
  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'redesigned-website.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleOpenInNewTab = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    // Open in new tab with proper window size
    const newWindow = window.open(url, '_blank')
    // Ensure the window is maximized or properly sized
    if (newWindow) {
      newWindow.focus()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack} disabled={isGenerating}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  {isGenerating && <Sparkles className="w-5 h-5 animate-pulse text-primary" />}
                  {isGenerating ? 'Generating Redesign...' : 'Redesigned Website'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isGenerating ? 'AI is creating your new design in real-time' : 'Preview your new design'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleOpenInNewTab} disabled={isGenerating}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={isGenerating}>
                <Download className="w-4 h-4 mr-2" />
                Download HTML
              </Button>
              <Button onClick={onStartOver}>
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar and Current Problem */}
      {isGenerating && (
        <div className="bg-card border-b px-6 py-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <Progress value={progress} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {Math.round(progress)}%
              </div>
            </div>
            {isRegenerating ? (
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 mt-0.5 text-primary flex-shrink-0 animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">
                    Applying your requested changes...
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    AI is updating the website based on your feedback
                  </p>
                </div>
              </div>
            ) : solvedProblems.length > 0 && (
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 mt-0.5 text-primary flex-shrink-0 animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">
                    Solving Issue {currentProblemIndex + 1} of {solvedProblems.length}:
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {solvedProblems[currentProblemIndex]}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Preview */}
      <div className="flex-1 container mx-auto px-6 py-6">
        <Card className="h-full overflow-hidden relative">
          {htmlContent.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Sparkles className="w-16 h-16 mx-auto animate-pulse text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Initializing AI Generation</h3>
                  <p className="text-sm text-muted-foreground">Please wait while we start creating your website...</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {isGenerating && (
                <div className="absolute top-4 right-4 z-10 bg-card/95 backdrop-blur-sm border rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 animate-pulse text-primary" />
                    <span className="font-medium">Generating...</span>
                    <span className="text-muted-foreground">{htmlContent.length} chars</span>
                  </div>
                </div>
              )}
              <ScrollArea className="h-full">
                <iframe
                  key={htmlContent.length > 1000 ? 'stable' : 'loading'}
                  srcDoc={htmlContent}
                  className="w-full border-0 transition-opacity duration-300"
                  style={{ 
                    opacity: htmlContent.length > 500 ? 1 : 0.7,
                    minHeight: '100vh',
                    height: '100%'
                  }}
                  title="Redesigned Website Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </ScrollArea>
            </>
          )}
        </Card>
      </div>
      
      {/* Change Request Input - Now at Bottom */}
      {!isGenerating && showChangeInput && onRequestChanges && (
        <div className="bg-card border-t px-6 py-4">
          <div className="container mx-auto">
            <Card className="p-4 bg-gradient-to-br from-background to-muted/20">
              <Label htmlFor="change-request" className="text-base font-semibold mb-2 block">
                Want to make changes?
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                Describe any modifications you'd like to the redesigned website
              </p>
              <div className="flex gap-3">
                <Textarea
                  id="change-request"
                  placeholder="e.g., Make the header bigger, change the contact section to use a form, add more spacing between sections..."
                  value={changeRequest}
                  onChange={(e) => setChangeRequest(e.target.value)}
                  className="flex-1 min-h-[100px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey && changeRequest.trim()) {
                      handleSubmitChanges()
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleSubmitChanges}
                    disabled={!changeRequest.trim()}
                    size="lg"
                    className="h-full min-h-[100px] px-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Apply Changes
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Press Ctrl+Enter to submit quickly
              </p>
            </Card>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">
              Successfully Redesigned Website!
            </DialogTitle>
            <DialogDescription className="text-center">
              Fixed {solvedProblems.length} issue{solvedProblems.length > 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Issues Resolved:
              </h3>
              <ScrollArea className="max-h-[300px]">
                <ul className="space-y-2">
                  {solvedProblems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{problem}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSuccessModal(false)}
              >
                View Preview
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setShowSuccessModal(false)
                  handleOpenInNewTab()
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
