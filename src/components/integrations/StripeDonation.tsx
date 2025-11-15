import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, CreditCard } from 'lucide-react'
import { stripeHelpers } from '@/lib/integrations'

interface StripeDonationProps {
  campaignName: string
  description: string
  amounts?: number[]
  customAmount?: boolean
}

export function StripeDonation({ 
  campaignName, 
  description, 
  amounts = [10, 25, 50, 100, 250],
  customAmount = true 
}: StripeDonationProps) {
  
  const handleDonation = (amount: number) => {
    const url = stripeHelpers.createCheckoutUrl({
      amount: amount * 100, // Convert to cents
      description: `Donation to ${campaignName}`,
      mode: 'donation',
      successUrl: `${window.location.origin}?donation=success&amount=${amount}`,
      cancelUrl: window.location.href
    })
    
    // Open in new tab (required for Stripe checkout)
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-primary to-purple-600 text-white p-8 text-center">
        <Heart className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">{campaignName}</h3>
        <p className="text-white/90">{description}</p>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Select an amount to donate:
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          {amounts.map((amount) => (
            <Button
              key={amount}
              onClick={() => handleDonation(amount)}
              variant="outline"
              size="lg"
              className="h-20 text-lg font-semibold hover:bg-primary hover:text-primary-foreground"
            >
              ${amount}
            </Button>
          ))}
        </div>
        
        {customAmount && (
          <div className="text-center">
            <Button
              onClick={() => {
                const amount = prompt('Enter custom donation amount (USD):')
                if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
                  handleDonation(Number(amount))
                }
              }}
              variant="secondary"
              className="w-full md:w-auto"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Custom Amount
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
