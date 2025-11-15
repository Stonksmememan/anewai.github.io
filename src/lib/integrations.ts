/**
 * Integration helpers for Stripe, Calendly, and food delivery services
 */

// Stripe integration helpers
export const stripeHelpers = {
  /**
   * Generate Stripe Checkout session URL
   * In production, this would call your backend to create a session
   */
  createCheckoutUrl: (config: {
    amount: number
    currency?: string
    description: string
    mode: 'payment' | 'donation' | 'subscription'
    successUrl?: string
    cancelUrl?: string
  }) => {
    const { amount, currency = 'USD', description, mode, successUrl, cancelUrl } = config
    
    // For now, we'll return a demo URL with the configuration encoded
    // In production, replace this with actual Stripe API call
    const params = new URLSearchParams({
      amount: amount.toString(),
      currency,
      description,
      mode,
      success_url: successUrl || window.location.href + '?success=true',
      cancel_url: cancelUrl || window.location.href + '?canceled=true'
    })
    
    return `https://checkout.stripe.com/demo?${params.toString()}`
  },
  
  /**
   * Generate donation button configuration
   */
  getDonationConfig: (campaignName: string, suggestedAmounts: number[] = [10, 25, 50, 100]) => ({
    campaignName,
    suggestedAmounts,
    currency: 'USD',
    mode: 'donation' as const
  }),
  
  /**
   * Generate product checkout configuration
   */
  getProductConfig: (productId: string, price: number, name: string) => ({
    productId,
    price,
    name,
    currency: 'USD',
    mode: 'payment' as const
  })
}

// Calendly integration helpers
export const calendlyHelpers = {
  /**
   * Generate Calendly embed URL
   * Replace with actual Calendly username
   */
  getEmbedUrl: (username: string = 'your-calendly-username', eventType?: string) => {
    const baseUrl = `https://calendly.com/${username}`
    return eventType ? `${baseUrl}/${eventType}` : baseUrl
  },
  
  /**
   * Get Calendly embed widget code
   */
  getEmbedWidget: (username: string = 'your-calendly-username', eventType?: string) => {
    const url = calendlyHelpers.getEmbedUrl(username, eventType)
    return {
      url,
      widgetConfig: {
        url,
        prefill: {},
        utm: {}
      }
    }
  },
  
  /**
   * Generate appointment types for different industries
   */
  getAppointmentTypes: (industry: string) => {
    const types: Record<string, string[]> = {
      dental: ['cleaning', 'consultation', 'emergency', 'checkup'],
      salon: ['haircut', 'coloring', 'styling', 'treatment'],
      fitness: ['personal-training', 'consultation', 'class'],
      healthcare: ['consultation', 'followup', 'telemedicine'],
      general: ['appointment', 'consultation', 'meeting']
    }
    return types[industry] || types.general
  }
}

// Food delivery integration helpers
export const foodDeliveryHelpers = {
  /**
   * Generate Uber Eats restaurant URL
   * In production, replace with actual restaurant UUID from Uber Eats
   */
  getUberEatsUrl: (restaurantId?: string, restaurantName?: string) => {
    if (restaurantId) {
      return `https://www.ubereats.com/store/${restaurantId}`
    }
    // If no ID, create a search URL
    const searchQuery = restaurantName ? encodeURIComponent(restaurantName) : 'restaurants'
    return `https://www.ubereats.com/search?q=${searchQuery}`
  },
  
  /**
   * Generate DoorDash restaurant URL
   * In production, replace with actual restaurant ID from DoorDash
   */
  getDoorDashUrl: (restaurantId?: string, restaurantName?: string) => {
    if (restaurantId) {
      return `https://www.doordash.com/store/${restaurantId}`
    }
    // If no ID, create a search URL
    const searchQuery = restaurantName ? encodeURIComponent(restaurantName) : 'restaurants'
    return `https://www.doordash.com/search?q=${searchQuery}`
  },
  
  /**
   * Generate delivery buttons for restaurant
   */
  getDeliveryButtons: (restaurantName?: string, config?: {
    uberEatsId?: string
    doorDashId?: string
    grubHubUrl?: string
  }) => ({
    uberEats: {
      url: foodDeliveryHelpers.getUberEatsUrl(config?.uberEatsId, restaurantName),
      label: 'Order on Uber Eats',
      icon: '🚗'
    },
    doorDash: {
      url: foodDeliveryHelpers.getDoorDashUrl(config?.doorDashId, restaurantName),
      label: 'Order on DoorDash',
      icon: '🏍️'
    },
    ...(config?.grubHubUrl && {
      grubHub: {
        url: config.grubHubUrl,
        label: 'Order on Grubhub',
        icon: '🍔'
      }
    })
  })
}

/**
 * Generate HTML snippets for integrations
 */
export const integrationSnippets = {
  /**
   * Stripe donation button HTML
   */
  stripeDonation: (config: { amounts: number[], campaignName: string, description: string }) => `
    <div class="donation-section">
      <h3>${config.campaignName}</h3>
      <p>${config.description}</p>
      <div class="donation-amounts">
        ${config.amounts.map(amount => `
          <button onclick="window.open('${stripeHelpers.createCheckoutUrl({
            amount: amount * 100, // Convert to cents
            description: \`Donation to \${config.campaignName}\`,
            mode: 'donation'
          })}', '_blank')" class="donation-btn">
            $${amount}
          </button>
        `).join('')}
      </div>
    </div>
  `,
  
  /**
   * Stripe product checkout button HTML
   */
  stripeCheckout: (config: { productId: string, price: number, name: string }) => `
    <button onclick="window.open('${stripeHelpers.createCheckoutUrl({
      amount: config.price * 100,
      description: config.name,
      mode: 'payment'
    })}', '_blank')" class="checkout-btn">
      Buy Now - $${config.price}
    </button>
  `,
  
  /**
   * Calendly embed HTML
   */
  calendlyEmbed: (username: string, eventType?: string) => {
    const url = calendlyHelpers.getEmbedUrl(username, eventType)
    return `
      <div class="calendly-embed">
        <div class="calendly-inline-widget" 
             data-url="${url}" 
             style="min-width:320px;height:630px;">
        </div>
        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </div>
    `
  },
  
  /**
   * Food delivery buttons HTML
   */
  foodDeliveryButtons: (restaurantName: string, config?: {
    uberEatsId?: string
    doorDashId?: string
  }) => {
    const buttons = foodDeliveryHelpers.getDeliveryButtons(restaurantName, config)
    return `
      <div class="food-delivery-buttons">
        <a href="${buttons.uberEats.url}" target="_blank" rel="noopener noreferrer" class="delivery-btn uber-eats">
          <span>${buttons.uberEats.icon}</span>
          <span>${buttons.uberEats.label}</span>
        </a>
        <a href="${buttons.doorDash.url}" target="_blank" rel="noopener noreferrer" class="delivery-btn doordash">
          <span>${buttons.doorDash.icon}</span>
          <span>${buttons.doorDash.label}</span>
        </a>
      </div>
    `
  }
}

/**
 * Generate CSS for integration components
 */
export const integrationStyles = `
  /* Stripe Donation Buttons */
  .donation-section {
    padding: 2rem;
    border-radius: 0.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
  }
  
  .donation-amounts {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }
  
  .donation-btn {
    padding: 0.75rem 2rem;
    background: white;
    color: #667eea;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1.125rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .donation-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
  
  /* Stripe Checkout Button */
  .checkout-btn {
    padding: 1rem 2rem;
    background: #6772e5;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .checkout-btn:hover {
    background: #5469d4;
  }
  
  /* Calendly Embed */
  .calendly-embed {
    width: 100%;
    max-width: 900px;
    margin: 2rem auto;
  }
  
  /* Food Delivery Buttons */
  .food-delivery-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem 0;
  }
  
  .delivery-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .delivery-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }
  
  .delivery-btn.uber-eats {
    background: #06c167;
    color: white;
  }
  
  .delivery-btn.doordash {
    background: #ff3008;
    color: white;
  }
`
