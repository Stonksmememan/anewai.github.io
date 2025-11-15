# API Setup Guide

This guide provides step-by-step instructions to obtain and configure the APIs needed for the website redesign tool's integrations.

---

## 🔷 Stripe API (Payment Processing)

Stripe enables payment processing, subscriptions, and donations on your redesigned websites.

### **What You Need:**
- Stripe Secret Key (server-side)
- Stripe Publishable Key (client-side)
- Stripe Webhook Secret (for webhook events)

### **Step-by-Step Setup:**

1. **Create a Stripe Account**
   - Go to [https://stripe.com](https://stripe.com)
   - Click "Start now" and sign up with your email
   - Complete account verification (may require business details)

2. **Get Your API Keys**
   - Log in to [https://dashboard.stripe.com](https://dashboard.stripe.com)
   - Navigate to **Developers → API Keys**
   - You'll see two keys:
     - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
     - **Secret Key** (starts with `sk_test_` or `sk_live_`)
   
   > **⚠️ Important:** Never expose your Secret Key in client-side code!

3. **Test Mode vs Live Mode**
   - Toggle between **Test mode** and **Live mode** in the top-right corner
   - Use Test mode for development (test cards work, no real charges)
   - Use Live mode for production (real credit cards, real money)

4. **Create a Checkout Session (for E-commerce)**
   - Go to **Products → Add Product**
   - Enter product name, description, and price
   - Click "Save product"
   - To create checkout sessions, you'll need to:
     - Set up a server endpoint (Blink Edge Function recommended)
     - Use the Stripe Node.js library to create sessions
     - Return the session URL to your frontend

5. **Set Up Webhooks (Optional but Recommended)**
   - Go to **Developers → Webhooks**
   - Click "Add endpoint"
   - Enter your webhook URL (e.g., `https://your-domain.com/api/stripe-webhook`)
   - Select events to listen for:
     - `checkout.session.completed` (successful payment)
     - `payment_intent.succeeded` (payment confirmed)
     - `customer.subscription.created` (new subscription)
   - Click "Add endpoint"
   - Copy the **Signing Secret** (starts with `whsec_`)

6. **Create a Forever-Free Coupon (for Testing in Live Mode)**
   - Go to **Products → Coupons**
   - Click "Create coupon"
   - Set:
     - Name: "Testing Coupon"
     - Discount: 100% off
     - Duration: Forever
     - Code: `TESTING` (or any code you prefer)
   - Save the coupon
   - Use this code during checkout to test with real cards without charges

### **Integration Code Example:**

```typescript
// Create a checkout session (server-side with Blink Edge Function)
import Stripe from 'npm:stripe'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16'
})

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Product Name',
        },
        unit_amount: 2000, // $20.00
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'https://your-site.com/success',
  cancel_url: 'https://your-site.com/cancel',
  customer_email: 'user@example.com', // Pre-fill email
  allow_promotion_codes: true, // Allow coupon codes
})

// Return session.url to frontend
```

### **Required Environment Variables:**
```env
STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
STRIPE_WEBHOOK_SECRET=whsec_... (if using webhooks)
```

### **Testing with Test Cards:**
- **Successful payment:** `4242 4242 4242 4242`
- **Declined payment:** `4000 0000 0000 0002`
- Any future expiry date and any 3-digit CVC

---

## 📅 Calendly API (Booking & Scheduling)

Calendly enables appointment booking, scheduling, and calendar integration on your redesigned websites.

### **What You Need:**
- Calendly username
- Event type URL

### **Step-by-Step Setup:**

1. **Create a Calendly Account**
   - Go to [https://calendly.com](https://calendly.com)
   - Click "Sign up" and create an account
   - Complete your profile (name, time zone, availability)

2. **Find Your Username**
   - Your username is in your Calendly URL
   - Example: `https://calendly.com/your-username`
   - The part after `/` is your username

3. **Create Event Types**
   - Log in to [https://calendly.com/event_types](https://calendly.com/event_types)
   - Click "Create New Event Type"
   - Choose a template:
     - **One-on-One**: Individual appointments
     - **Group**: Multiple people can book same time
     - **Round Robin**: Distribute bookings among team members
     - **Collective**: All team members must attend
   - Configure your event:
     - **Name:** "15-Minute Consultation"
     - **Duration:** 15, 30, 45, or 60 minutes
     - **Location:** Phone, Zoom, Google Meet, in-person, etc.
     - **Description:** What the meeting is about
   - Click "Save & Close"

4. **Get Your Event Type URL**
   - Go back to **Event Types**
   - Click on your event
   - Copy the URL from your browser
   - Format: `https://calendly.com/your-username/event-type-name`
   - Example: `https://calendly.com/john-smith/30min`

5. **Customize Booking Page (Optional)**
   - Click on event → **Edit**
   - Customize:
     - Branding (logo, colors)
     - Questions to ask invitees
     - Confirmation page message
     - Email reminders
     - Buffer time before/after events

6. **Embed Widget on Your Website**
   - Use the inline embed (full page)
   - Use the popup widget (button-triggered)
   - Use the popup text (link-triggered)

### **Integration Code Example:**

```tsx
// CalendlyEmbed.tsx (already included in your project)
import { useEffect } from 'react'

export function CalendlyEmbed({ 
  username, 
  eventType 
}: { 
  username: string
  eventType: string 
}) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget"
      data-url={`https://calendly.com/${username}/${eventType}`}
      style={{ minWidth: '320px', height: '630px' }}
    />
  )
}

// Usage:
<CalendlyEmbed username="john-smith" eventType="30min" />
```

### **No API Keys Required!**
Calendly embedding is free and doesn't require API keys for basic scheduling.

### **Advanced: Calendly API (Optional)**
If you need to programmatically create events or manage bookings:
1. Go to [https://calendly.com/integrations/api_webhooks](https://calendly.com/integrations/api_webhooks)
2. Generate a Personal Access Token
3. Use the token in your API requests: `Authorization: Bearer YOUR_TOKEN`
4. API Docs: [https://developer.calendly.com/](https://developer.calendly.com/)

---

## 🗺️ Google Maps API (Maps & Location Services)

Google Maps enables location display, directions, and place search on your redesigned websites.

### **What You Need:**
- Google Maps API Key
- Enabled APIs: Maps JavaScript API, Places API, Geocoding API

### **Step-by-Step Setup:**

1. **Create a Google Cloud Project**
   - Go to [https://console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account
   - Click "Select a project" → "New Project"
   - Enter project name (e.g., "Website Redesign")
   - Click "Create"

2. **Enable Required APIs**
   - Go to [https://console.cloud.google.com/apis/library](https://console.cloud.google.com/apis/library)
   - Search for and enable these APIs (click each, then click "Enable"):
     - **Maps JavaScript API** (display maps)
     - **Places API** (search for places)
     - **Geocoding API** (convert addresses to coordinates)
     - **Directions API** (get driving directions)

3. **Create an API Key**
   - Go to [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
   - Click "Create Credentials" → "API Key"
   - Your new API key will be displayed (starts with `AIza...`)
   - **Important:** Click "Restrict Key" immediately for security

4. **Restrict Your API Key (Security Best Practice)**
   - Click on your newly created API key
   - Under "API restrictions":
     - Select "Restrict key"
     - Check the APIs you enabled:
       - Maps JavaScript API
       - Places API
       - Geocoding API
       - Directions API
   - Under "Application restrictions":
     - Select "HTTP referrers (web sites)"
     - Add your domains:
       - `https://yourdomain.com/*`
       - `https://*.yourdomain.com/*`
       - `http://localhost:*` (for development)
   - Click "Save"

5. **Set Up Billing (Required)**
   - Google Maps requires a billing account (even for free tier)
   - Go to [https://console.cloud.google.com/billing](https://console.cloud.google.com/billing)
   - Click "Link a billing account" → "Create billing account"
   - Enter payment method (won't be charged unless you exceed free tier)
   - **Free tier includes:**
     - $200/month free credit
     - 28,000 map loads per month
     - 100,000 geocoding requests per month

6. **Monitor Usage**
   - Go to [https://console.cloud.google.com/google/maps-apis/metrics](https://console.cloud.google.com/google/maps-apis/metrics)
   - View API usage and costs
   - Set up budget alerts to avoid unexpected charges

### **Integration Code Example:**

```tsx
// Google Maps embed (simple, no code required)
<iframe
  width="100%"
  height="450"
  style={{ border: 0 }}
  loading="lazy"
  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Space+Needle,Seattle+WA`}
/>

// Or use Google Maps JavaScript API
<script src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`} async defer></script>

<script>
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.6205, lng: -122.3493 },
    zoom: 13,
  });
  
  new google.maps.Marker({
    position: { lat: 47.6205, lng: -122.3493 },
    map: map,
    title: "My Business Location"
  });
}
</script>
```

### **Required Environment Variables:**
```env
GOOGLE_MAPS_API_KEY=AIza...
```

### **Alternative: Embed Maps Without API Key**
For simple map embeds without interactivity:
1. Go to [https://www.google.com/maps](https://www.google.com/maps)
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Paste it into your website (no API key needed)

---

## 🚀 Quick Start Checklist

### For Stripe:
- [ ] Create Stripe account
- [ ] Get Secret Key and Publishable Key
- [ ] Set up test/live mode
- [ ] Create products (optional)
- [ ] Set up webhooks (optional)
- [ ] Create 100% off coupon for testing (optional)

### For Calendly:
- [ ] Create Calendly account
- [ ] Note your username
- [ ] Create event types
- [ ] Copy event type URLs
- [ ] Customize booking page (optional)

### For Google Maps:
- [ ] Create Google Cloud project
- [ ] Enable Maps JavaScript API, Places API, Geocoding API
- [ ] Create and restrict API key
- [ ] Set up billing account
- [ ] Add domains to API key restrictions

---

## 💡 Pro Tips

### Stripe:
- Use **Test mode** extensively before going live
- Set up webhooks to handle payment events reliably
- Create 100% off coupons for live testing without charges
- Use Stripe's built-in fraud detection
- Consider Stripe Tax for automatic tax calculations

### Calendly:
- Connect your calendar (Google Calendar, Office 365) to avoid double-bookings
- Set buffer times between meetings
- Use event questions to collect necessary information upfront
- Send automated reminders to reduce no-shows
- Consider Calendly's paid plans for team scheduling features

### Google Maps:
- Always restrict your API key to prevent unauthorized usage
- Use the free iframe embed for simple maps
- Use the JavaScript API for interactive maps
- Set up budget alerts to avoid unexpected charges
- Consider alternative map providers (Mapbox, Leaflet) if costs are a concern

---

## 🔒 Security Best Practices

1. **Never commit API keys to Git/GitHub**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Use different keys for development and production**
   - Test keys for development
   - Live/Production keys for production

3. **Restrict API keys by domain**
   - Only allow your domains to use the keys
   - Prevents unauthorized usage

4. **Regularly rotate API keys**
   - Especially if a key might be compromised
   - Update in all environments after rotation

5. **Monitor API usage**
   - Set up alerts for unusual activity
   - Review usage dashboards regularly

---

## 📞 Support Resources

### Stripe:
- Dashboard: [https://dashboard.stripe.com](https://dashboard.stripe.com)
- Documentation: [https://stripe.com/docs](https://stripe.com/docs)
- Support: [https://support.stripe.com](https://support.stripe.com)

### Calendly:
- Dashboard: [https://calendly.com](https://calendly.com)
- Help Center: [https://help.calendly.com](https://help.calendly.com)
- API Docs: [https://developer.calendly.com](https://developer.calendly.com)

### Google Maps:
- Console: [https://console.cloud.google.com](https://console.cloud.google.com)
- Documentation: [https://developers.google.com/maps](https://developers.google.com/maps)
- Support: [https://developers.google.com/maps/support](https://developers.google.com/maps/support)

---

## ❓ FAQ

**Q: Do I need to pay for these services?**
A: 
- Stripe: Free to use, but takes a fee per transaction (2.9% + $0.30)
- Calendly: Free tier available, paid plans start at $10/month
- Google Maps: $200/month free credit, then pay-as-you-go

**Q: Can I test without a credit card?**
A:
- Stripe: Yes, use test mode with test card numbers
- Calendly: Yes, free tier requires no payment
- Google Maps: No, requires billing account even for free tier

**Q: How do I know if my keys are working?**
A:
- Stripe: Make a test payment and check the dashboard
- Calendly: Try booking an appointment on your test site
- Google Maps: Load a map and check for errors in browser console

**Q: What if I exceed free tier limits?**
A:
- Stripe: You'll be charged per transaction, no overage fees
- Calendly: Upgrade to paid plan for more features
- Google Maps: You'll be charged for usage above free tier

---

## 🎯 Next Steps

Once you have your API keys:

1. **Add to Environment Variables**
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   CALENDLY_USERNAME=your-username
   GOOGLE_MAPS_API_KEY=AIza...
   ```

2. **Test in Development**
   - Use test credentials
   - Verify integrations work correctly

3. **Deploy to Production**
   - Switch to live/production keys
   - Test with real data
   - Monitor for errors

4. **Monitor and Optimize**
   - Check usage dashboards
   - Optimize API calls to reduce costs
   - Set up alerts for issues

---

Need help? Check the support resources above or reach out to each service's support team. Happy integrating! 🚀
