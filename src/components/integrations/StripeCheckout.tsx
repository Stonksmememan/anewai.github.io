import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, CreditCard } from 'lucide-react'
import { stripeHelpers } from '@/lib/integrations'

interface StripeCheckoutProps {
  productId: string
  productName: string
  price: number
  description?: string
  image?: string
  features?: string[]
  currency?: string
}

export function StripeCheckout({ 
  productId,
  productName, 
  price, 
  description,
  image,
  features = [],
  currency = 'USD'
}: StripeCheckoutProps) {
  
  const handleCheckout = () => {
    const url = stripeHelpers.createCheckoutUrl({
      amount: price * 100, // Convert to cents
      description: productName,
      mode: 'payment',
      currency,
      successUrl: `${window.location.origin}?purchase=success&product=${productId}`,
      cancelUrl: window.location.href
    })
    
    // Open in new tab (required for Stripe checkout)
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <div className="aspect-video w-full bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{productName}</CardTitle>
            {description && (
              <CardDescription className="mt-2">{description}</CardDescription>
            )}
          </div>
          <Badge variant="secondary" className="text-lg font-bold">
            ${price}
          </Badge>
        </div>
      </CardHeader>
      
      {features.length > 0 && (
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      
      <CardFooter className="flex gap-2">
        <Button 
          onClick={handleCheckout}
          className="flex-1"
          size="lg"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
        <Button 
          variant="outline"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
