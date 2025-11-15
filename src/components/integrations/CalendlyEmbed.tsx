import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ExternalLink } from 'lucide-react'
import { calendlyHelpers } from '@/lib/integrations'

interface CalendlyEmbedProps {
  username: string
  eventType?: string
  inline?: boolean
  prefill?: {
    name?: string
    email?: string
    customAnswers?: Record<string, string>
  }
}

export function CalendlyEmbed({ 
  username, 
  eventType, 
  inline = true,
  prefill 
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const url = calendlyHelpers.getEmbedUrl(username, eventType)
  
  useEffect(() => {
    if (!inline || !containerRef.current) return
    
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    
    // Initialize widget after script loads
    script.onload = () => {
      if (window.Calendly && containerRef.current) {
        window.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
          prefill: prefill || {},
          utm: {}
        })
      }
    }
    
    return () => {
      document.body.removeChild(script)
    }
  }, [url, inline, prefill])
  
  const handleOpenCalendly = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
  if (!inline) {
    return (
      <Card className="p-8 text-center">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">Schedule an Appointment</h3>
        <p className="text-muted-foreground mb-6">
          Choose a time that works best for you
        </p>
        <Button onClick={handleOpenCalendly} size="lg">
          <Calendar className="w-4 h-4 mr-2" />
          Book Now
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    )
  }
  
  return (
    <div className="w-full">
      <div 
        ref={containerRef}
        className="calendly-inline-widget"
        style={{ minWidth: '320px', height: '630px' }}
      />
      <div className="text-center mt-4">
        <Button variant="outline" onClick={handleOpenCalendly}>
          <ExternalLink className="w-4 h-4 mr-2" />
          Open in new window
        </Button>
      </div>
    </div>
  )
}

// Extend Window interface for Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
        prefill?: Record<string, any>
        utm?: Record<string, any>
      }) => void
    }
  }
}
