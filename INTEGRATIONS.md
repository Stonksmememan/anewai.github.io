# Integration Guide

This document explains how the AI website generator integrates with **Stripe**, **Calendly**, and **food delivery services** (Uber Eats, DoorDash).

## 🎯 Overview

When users select an industry type, the AI automatically includes appropriate integration buttons and widgets in the generated website HTML. These integrations are **embedded directly in the generated HTML** and work immediately without requiring additional setup.

## 💳 Stripe Payments

### Non-Profit Donations
For **Non-Profit** websites, the AI automatically generates:
- Multiple donation amount buttons ($10, $25, $50, $100, $250)
- Styled with gradient purple/blue background (#667eea to #764ba2)
- White text buttons that open Stripe checkout in new tab
- Custom amount option for flexible donations

**Example HTML Generated:**
```html
<button onclick="window.open('https://donate.stripe.com/test_campaign', '_blank')" 
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  $25
</button>
```

### E-commerce Checkout
For **E-commerce** websites, the AI adds:
- "Buy Now" buttons on each product
- Blue (#6772e5) background with white text
- Opens Stripe checkout with product ID in new tab
- Price displayed prominently on product cards

**Example HTML Generated:**
```html
<button onclick="window.open('https://checkout.stripe.com/product-id', '_blank')"
        style="background: #6772e5; color: white;">
  Buy Now - $49.99
</button>
```

### Fitness Memberships
For **Fitness Center** websites, the AI includes:
- "Join Now" buttons for each membership tier
- Opens Stripe checkout for subscription plans
- Highlighted recommended tier with special styling

**How to Use:**
1. Generate website for your industry
2. The AI embeds Stripe buttons automatically
3. Replace demo URLs with real Stripe checkout links
4. Test by clicking buttons (opens in new tab as required)

**Setup Your Stripe URLs:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create products/prices
3. Get checkout session URLs
4. Replace `https://checkout.stripe.com/...` in generated HTML with your URLs

---

## 📅 Calendly Booking

### Industries with Calendly
The following industries automatically get Calendly appointment booking:
- **Dental** (Cleaning, Consultation, Emergency, Check-up)
- **Salon/Spa** (Haircut, Coloring, Styling, Treatment)
- **Fitness** (Personal training sessions, Class booking)
- **Healthcare** (Consultation, Follow-up, Telemedicine)

### What Gets Generated
The AI automatically embeds:
```html
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/your-username/appointment" 
     style="min-width:320px;height:630px;">
</div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Setup Your Calendly
1. Create account at [Calendly](https://calendly.com)
2. Set up your event types (e.g., "appointment", "consultation")
3. Get your Calendly URL (e.g., `https://calendly.com/yourname/appointment`)
4. Replace `your-username/appointment` in generated HTML
5. Widget works immediately after replacement

**Features:**
- Inline booking widget embedded in page
- Appointment type selection
- Automatic timezone detection
- Email notifications
- Calendar integration (Google, Outlook, etc.)

---

## 🍕 Food Delivery (Restaurant Industry)

### What Gets Generated
For **Restaurant** websites, the AI automatically creates:

**Uber Eats Button:**
- Green (#06c167) background
- Car emoji 🚗
- Links to `https://www.ubereats.com/search?q=[restaurant-name]`
- Opens in new tab

**DoorDash Button:**
- Red (#ff3008) background
- Motorcycle emoji 🏍️
- Links to `https://www.doordash.com/search?q=[restaurant-name]`
- Opens in new tab

**Example HTML Generated:**
```html
<a href="https://www.ubereats.com/search?q=Restaurant+Name" 
   target="_blank" 
   style="background: #06c167; color: white; padding: 1rem 1.5rem;">
  🚗 Order on Uber Eats
</a>

<a href="https://www.doordash.com/search?q=Restaurant+Name" 
   target="_blank"
   style="background: #ff3008; color: white; padding: 1rem 1.5rem;">
  🏍️ Order on DoorDash
</a>
```

### How to Get Your Restaurant IDs

**Uber Eats:**
1. Partner with Uber Eats at [restaurant.uber.com](https://restaurant.uber.com)
2. Get your restaurant UUID from partner dashboard
3. Replace search URL with: `https://www.ubereats.com/store/[your-uuid]`

**DoorDash:**
1. Partner with DoorDash at [get.doordash.com](https://get.doordash.com)
2. Get your restaurant ID from merchant portal
3. Replace search URL with: `https://www.doordash.com/store/[your-id]`

**Default Behavior:**
- If no restaurant ID provided, links to search with restaurant name
- Users can still find and order from your restaurant
- Perfect for testing before official partnership

---

## 🔧 Using Integration Components

While the AI automatically embeds integrations in HTML, you can also use the React components directly:

### Stripe Donation Component
```tsx
import { StripeDonation } from '@/components/integrations'

<StripeDonation
  campaignName="Save the Forest"
  description="Help us protect endangered habitats"
  amounts={[10, 25, 50, 100, 250]}
/>
```

### Stripe Checkout Component
```tsx
import { StripeCheckout } from '@/components/integrations'

<StripeCheckout
  productId="prod_123"
  productName="Premium Package"
  price={99}
  description="Full access to all features"
  features={["Feature 1", "Feature 2", "Feature 3"]}
/>
```

### Calendly Embed Component
```tsx
import { CalendlyEmbed } from '@/components/integrations'

<CalendlyEmbed
  username="your-calendly-username"
  eventType="appointment"
  inline={true}
/>
```

### Food Delivery Buttons Component
```tsx
import { FoodDeliveryButtons } from '@/components/integrations'

<FoodDeliveryButtons
  restaurantName="Your Restaurant"
  uberEatsId="optional-uuid"
  doorDashId="optional-id"
/>
```

---

## 📝 Summary

All integrations are **automatically included** in the AI-generated HTML based on the selected industry:

| Industry | Stripe | Calendly | Food Delivery |
|----------|--------|----------|---------------|
| Restaurant | ❌ | ❌ | ✅ (Uber Eats + DoorDash) |
| Non-Profit | ✅ (Donations) | ❌ | ❌ |
| Dental | ❌ | ✅ | ❌ |
| E-commerce | ✅ (Checkout) | ❌ | ❌ |
| Salon/Spa | ❌ | ✅ | ❌ |
| Fitness | ✅ (Memberships) | ✅ | ❌ |
| Healthcare | ❌ | ✅ | ❌ |

**Next Steps:**
1. Generate your website with appropriate industry
2. Review the embedded integration buttons/widgets
3. Replace demo URLs with your real service URLs
4. Test all integrations in new tab (as required for Stripe)
5. Deploy your completed website!

For questions or issues, see the main [README.md](./README.md) or [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md).
