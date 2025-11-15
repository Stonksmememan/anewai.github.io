import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExternalLink, Truck } from 'lucide-react'
import { foodDeliveryHelpers } from '@/lib/integrations'

interface FoodDeliveryButtonsProps {
  restaurantName: string
  uberEatsId?: string
  doorDashId?: string
  grubHubUrl?: string
  showLabels?: boolean
}

export function FoodDeliveryButtons({ 
  restaurantName,
  uberEatsId,
  doorDashId,
  grubHubUrl,
  showLabels = true
}: FoodDeliveryButtonsProps) {
  
  const buttons = foodDeliveryHelpers.getDeliveryButtons(restaurantName, {
    uberEatsId,
    doorDashId,
    grubHubUrl
  })
  
  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <Truck className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h3 className="text-xl font-semibold mb-2">Order Online</h3>
        <p className="text-sm text-muted-foreground">
          Get {restaurantName} delivered to your door
        </p>
      </div>
      
      <div className="flex flex-col gap-3">
        {/* Uber Eats Button */}
        <Button
          onClick={() => window.open(buttons.uberEats.url, '_blank', 'noopener,noreferrer')}
          className="h-14 bg-[#06c167] hover:bg-[#05a257] text-white"
          size="lg"
        >
          <span className="text-2xl mr-2">{buttons.uberEats.icon}</span>
          <span className="flex-1 text-left font-semibold">
            {showLabels ? buttons.uberEats.label : 'Uber Eats'}
          </span>
          <ExternalLink className="w-4 h-4" />
        </Button>
        
        {/* DoorDash Button */}
        <Button
          onClick={() => window.open(buttons.doorDash.url, '_blank', 'noopener,noreferrer')}
          className="h-14 bg-[#ff3008] hover:bg-[#e62b07] text-white"
          size="lg"
        >
          <span className="text-2xl mr-2">{buttons.doorDash.icon}</span>
          <span className="flex-1 text-left font-semibold">
            {showLabels ? buttons.doorDash.label : 'DoorDash'}
          </span>
          <ExternalLink className="w-4 h-4" />
        </Button>
        
        {/* GrubHub Button (optional) */}
        {buttons.grubHub && (
          <Button
            onClick={() => window.open(buttons.grubHub.url, '_blank', 'noopener,noreferrer')}
            className="h-14 bg-[#f63440] hover:bg-[#dc2f3a] text-white"
            size="lg"
          >
            <span className="text-2xl mr-2">{buttons.grubHub.icon}</span>
            <span className="flex-1 text-left font-semibold">
              {showLabels ? buttons.grubHub.label : 'Grubhub'}
            </span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        Third-party delivery services may have additional fees
      </p>
    </Card>
  )
}
