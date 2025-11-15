# Industry-Specific Features & Integration Guide

This document outlines all features provided for each industry and what you need to provide for third-party integrations.

---

## 🍽️ Restaurant

### Features Provided (Auto-Generated in UI)
- ✅ **"Reserve a Table" Button** - Prominent CTA with table booking form section
- ✅ **Online Menu** - Clear sections (appetizers, entrees, desserts, drinks) with prices
- ✅ **"Order Online" Buttons** - Integration placeholders for delivery services
- ✅ **Special Offers Section** - Highlight deals and promotions
- ✅ **Hours & Contact Info** - Prominently displayed business hours and contact details
- ✅ **Photo Gallery** - Showcase dishes and restaurant ambiance

### Third-Party Integrations Required
#### 🚗 Uber Eats Integration
**What it does:** Allow customers to order directly through Uber Eats from your website

**What you need to provide:**
1. **Uber Eats Restaurant ID** - Found in your Uber Eats merchant dashboard
2. **Store URL** - Your public Uber Eats restaurant URL (e.g., `https://www.ubereats.com/store/your-restaurant-name/...`)

**How to integrate:**
- The generated UI includes a placeholder "Order on Uber Eats" button
- You'll need to replace the placeholder link with your actual Uber Eats store URL
- No API key required - it's a direct link to your Uber Eats page

#### 🚴 DoorDash Integration
**What it does:** Allow customers to order directly through DoorDash from your website

**What you need to provide:**
1. **DoorDash Restaurant ID** - Found in your DoorDash merchant portal
2. **Store URL** - Your public DoorDash restaurant URL (e.g., `https://www.doordash.com/store/your-restaurant-name/...`)

**How to integrate:**
- The generated UI includes a placeholder "Order on DoorDash" button
- You'll need to replace the placeholder link with your actual DoorDash store URL
- No API key required - it's a direct link to your DoorDash page

#### 📞 Table Reservation System (Optional Advanced Integration)
**Options:**
1. **Simple Form** - Already included! Collects name, phone, date, time, party size
2. **OpenTable Integration** - Requires OpenTable Partner account and widget code
3. **Resy Integration** - Requires Resy merchant account and booking widget

---

## 💙 Non-Profit

### Features Provided (Auto-Generated in UI)
- ✅ **"Donate Now" Button** - Prominent CTA with online donation form
- ✅ **Campaign Progress Tracking** - Visual progress bars showing fundraising goals
- ✅ **Volunteer Sign-Up Form** - Collect volunteer information and availability
- ✅ **Impact Stories Showcase** - Testimonials and success stories
- ✅ **Mission Statement** - Clear display of organization purpose
- ✅ **"Our Impact" Statistics** - Visual display of key metrics
- ✅ **Financial Transparency Section** - Show where funds go

### Third-Party Integrations Required
#### 💳 Payment Processing for Donations
**Option 1: Stripe Donations**
**What you need to provide:**
1. **Stripe Publishable Key** - From your Stripe dashboard (pk_live_... or pk_test_...)
2. **Stripe Secret Key** - From your Stripe dashboard (sk_live_... or sk_test_...)

**How to integrate:**
- Sign up at https://stripe.com
- Get your API keys from https://dashboard.stripe.com/apikeys
- The donation form will process payments through Stripe
- Stripe handles all PCI compliance and security

**Option 2: PayPal Donations**
**What you need to provide:**
1. **PayPal Business Email** - Your PayPal account email
2. **PayPal Hosted Button ID** - Created in PayPal dashboard

**How to integrate:**
- Log into PayPal Business account
- Create a "Donate" button at https://www.paypal.com/donate/buttons
- Copy the button ID or hosted button code

#### 📊 Campaign Management (Optional)
**Options:**
- Basic: Built-in progress tracking (no integration needed)
- Advanced: Mailchimp for donor email campaigns (requires Mailchimp API key)

---

## 🦷 Dental Practice

### Features Provided (Auto-Generated in UI)
- ✅ **"Book Appointment" Button** - Online scheduling form
- ✅ **Patient Forms Section** - New patient forms, medical history forms
- ✅ **Insurance Information** - List of accepted providers
- ✅ **Service Descriptions** - Detailed info on cleanings, cosmetic, orthodontics
- ✅ **Before/After Gallery** - Showcase cosmetic procedure results
- ✅ **Staff/Dentist Profiles** - Photos, bios, credentials

### Third-Party Integrations Required
#### 📅 Online Scheduling
**Option 1: Calendly**
**What you need to provide:**
1. **Calendly Username** - Your Calendly account name
2. **Event Type URL** - URL of your booking calendar

**How to integrate:**
- Sign up at https://calendly.com
- Create an event type (e.g., "Dental Appointment")
- Copy your scheduling link (e.g., `https://calendly.com/yourusername/dental-appointment`)
- No API key needed - embed link in booking button

**Option 2: Acuity Scheduling**
**What you need to provide:**
1. **Acuity Owner ID** - Found in your Acuity account settings
2. **Embed Code** - From Acuity's embedding options

**How to integrate:**
- Sign up at https://acuityscheduling.com
- Configure appointment types
- Get embed code from Settings > Embedding

#### 📋 Patient Forms (Optional)
**Option 1: Google Forms** - Free, easy to set up (no integration needed)
**Option 2: JotForm** - Professional forms with HIPAA compliance ($39/mo for HIPAA)

---

## 🛍️ E-commerce

### Features Provided (Auto-Generated in UI)
- ✅ **Product Catalog** - Grid layout with product cards
- ✅ **Shopping Cart Icon** - With item count badge
- ✅ **Checkout Flow Section** - Payment options display
- ✅ **Customer Reviews** - Product ratings and reviews
- ✅ **Wishlist Functionality** - Save items for later
- ✅ **Search Bar** - Product search capability

### Third-Party Integrations Required
#### 💰 Payment Processing
**Stripe Checkout (Recommended)**
**What you need to provide:**
1. **Stripe Publishable Key** (pk_live_... or pk_test_...)
2. **Stripe Secret Key** (sk_live_... or sk_test_...)
3. **Product IDs** - Created in Stripe dashboard for each product

**How to integrate:**
- Sign up at https://stripe.com
- Create products at https://dashboard.stripe.com/products
- Get API keys from https://dashboard.stripe.com/apikeys
- Full checkout flow integrated via Stripe Checkout

#### 📦 Inventory Management (Optional)
**Options:**
1. **Shopify Integration** - Requires Shopify store and API credentials
2. **WooCommerce** - If using WordPress backend
3. **Manual** - Product data stored in your database (no external integration)

---

## 💇 Salon/Spa

### Features Provided (Auto-Generated in UI)
- ✅ **Online Booking System** - Appointment scheduling interface
- ✅ **Stylist/Therapist Profiles** - Photos, bios, specialties
- ✅ **Service Menu with Prices** - Detailed service listings
- ✅ **Gallery of Work** - Before/after photos, hairstyles, treatments
- ✅ **Membership/Package Options** - Subscription or package deals
- ✅ **Product Shop Section** - Retail product sales

### Third-Party Integrations Required
#### 📅 Booking System
**Square Appointments (Recommended)**
**What you need to provide:**
1. **Square Application ID**
2. **Square Access Token**
3. **Square Location ID**

**How to integrate:**
- Sign up at https://squareup.com/us/en/appointments
- Get API credentials from https://developer.squareup.com/apps
- Configure services and staff availability
- API handles all booking logic

**Alternative: Vagaro**
**What you need to provide:**
1. **Vagaro Business ID**
2. **Booking Widget Code**

**How to integrate:**
- Sign up at https://www.vagaro.com
- Get embed code from Settings > Online Booking

---

## 💪 Fitness Center

### Features Provided (Auto-Generated in UI)
- ✅ **Class Schedule** - Time slots with instructor names
- ✅ **Membership Tiers** - Pricing comparison table
- ✅ **Trainer Bios** - Photos, certifications, specialties
- ✅ **Online Booking** - For classes and personal training
- ✅ **Progress Tracking/Member Portal** - Login section for members
- ✅ **Facility Tour** - Photos and equipment showcase

### Third-Party Integrations Required
#### 📊 Membership Management
**Mindbody (Industry Standard)**
**What you need to provide:**
1. **Mindbody Site ID**
2. **Mindbody API Key**
3. **Mindbody Source Credentials**

**How to integrate:**
- Sign up at https://www.mindbodyonline.com
- Request API access from account settings
- Get Site ID from Settings > Business Information
- API credentials from Developer > API Credentials

**Alternative: Glofox**
**What you need to provide:**
1. **Glofox Gym ID**
2. **Glofox Booking Widget Code**

---

## 🏠 Real Estate

### Features Provided (Auto-Generated in UI)
- ✅ **Property Listings** - Grid/list view of properties
- ✅ **Advanced Search Filters** - Price, beds, baths, location
- ✅ **Virtual Tour Links** - For each property
- ✅ **Agent Profiles** - Contact info and specialties
- ✅ **Mortgage Calculator** - Built-in calculator tool
- ✅ **Neighborhood Information** - Area details and map

### Third-Party Integrations Required
#### 🗺️ Map Integration
**Google Maps API**
**What you need to provide:**
1. **Google Maps API Key** - From Google Cloud Console

**How to integrate:**
- Go to https://console.cloud.google.com
- Enable Maps JavaScript API
- Create API key from Credentials section
- Restrict key to your domain for security

#### 🏘️ MLS/IDX Integration (Optional)
**What you need:**
1. **MLS Board Membership**
2. **IDX Feed Provider** (e.g., IDX Broker, Showcase IDX)
3. **Provider API Credentials**

**Note:** This requires real estate license and MLS membership

---

## 📚 Education

### Features Provided (Auto-Generated in UI)
- ✅ **Course Catalog** - Detailed course descriptions
- ✅ **Enrollment Forms** - Application process
- ✅ **Student Portal Login** - Login section for current students
- ✅ **Instructor Profiles** - Photos, credentials, bios
- ✅ **Academic Calendar** - Important dates and events
- ✅ **Resources Section** - Materials for current students

### Third-Party Integrations Required
#### 📖 Learning Management System (Optional)
**Options:**
1. **Teachable** - All-in-one course platform
   - Need: Teachable subdomain or custom domain
   - How: Sign up at https://teachable.com
   
2. **Thinkific** - Course hosting platform
   - Need: Thinkific site name
   - How: Sign up at https://www.thinkific.com

3. **Canvas LMS** - Enterprise solution
   - Need: Canvas institution URL and API token
   - How: Contact Canvas for institutional access

#### 💳 Payment for Courses
**Stripe** - Same setup as E-commerce section above

---

## 🏥 Healthcare

### Features Provided (Auto-Generated in UI)
- ✅ **Appointment Scheduling** - Online booking system
- ✅ **Telemedicine Integration** - Virtual visit section
- ✅ **Patient Portal Login** - Access medical records
- ✅ **Insurance Information** - Accepted plans and billing info
- ✅ **Service Descriptions** - Detailed specialty information
- ✅ **Provider Profiles** - Doctor credentials and experience

### Third-Party Integrations Required
#### 🩺 Electronic Health Records (EHR)
**IMPORTANT:** Healthcare integrations require HIPAA compliance

**Option 1: Simple Practice**
**What you need to provide:**
1. **SimplePractice API Key**
2. **Practice ID**

**How to integrate:**
- Sign up at https://www.simplepractice.com
- Request API access from account settings
- Requires HIPAA Business Associate Agreement (BAA)

**Option 2: Doxy.me (Telemedicine)**
**What you need to provide:**
1. **Doxy.me Room URL** (e.g., doxy.me/yourdoctor)

**How to integrate:**
- Sign up at https://doxy.me (free basic plan available)
- Create virtual waiting room
- Embed room URL in telemedicine section
- Doxy.me is HIPAA-compliant

#### ⚠️ HIPAA Compliance Notes
- Any patient data storage requires HIPAA compliance
- Use secure, HIPAA-compliant hosting (not regular hosting)
- Requires Business Associate Agreements (BAAs) with all vendors
- Patient portal requires encryption and secure authentication

---

## 🌐 General (No Industry)

### Features Provided (Auto-Generated in UI)
- ✅ **Contact Forms** - Standard inquiry forms
- ✅ **About Page Section** - Company information
- ✅ **Portfolio/Gallery** - Showcase work or products
- ✅ **Testimonials** - Customer reviews
- ✅ **FAQ Section** - Common questions
- ✅ **Newsletter Signup** - Email collection

### Optional Integrations
#### 📧 Email Marketing
**Mailchimp**
**What you need:**
1. **Mailchimp API Key**
2. **Audience/List ID**

**How to integrate:**
- Sign up at https://mailchimp.com
- Get API key from Account > Extras > API Keys
- Get Audience ID from Audience > Settings

---

## 🚀 Quick Start Checklist

### For ALL Industries:
- [ ] Choose your industry from the dropdown
- [ ] Select color palette and style type
- [ ] Generate initial redesign

### After Generation:
- [ ] Review the generated website
- [ ] Identify which integration placeholders you want to activate
- [ ] Sign up for necessary third-party services (see above)
- [ ] Collect API keys/credentials from service dashboards
- [ ] Provide credentials to connect integrations

### Common Services You May Need:
1. **Stripe** (Payments) - https://stripe.com - Get pk_live and sk_live keys
2. **Google Maps** (Location) - https://console.cloud.google.com - Get Maps API key
3. **Calendly** (Scheduling) - https://calendly.com - Get your booking URL
4. **Mailchimp** (Email) - https://mailchimp.com - Get API key and List ID

---

## ❓ FAQ

**Q: Are integrations required to generate a redesign?**
A: No! The AI will generate a fully functional UI with placeholders. You can add integrations later.

**Q: Which integrations require payment?**
A: Most basic tiers are free or have free trials. Paid services: Square ($0/mo + transaction fees), Stripe (free + 2.9% + $0.30 per transaction), Mindbody ($129+/mo)

**Q: Do I need technical knowledge to integrate?**
A: Basic integrations (embedding URLs/widgets) require no coding. Advanced API integrations may need a developer.

**Q: What if my service isn't listed?**
A: Request custom integration in the "Additional Changes" field during generation. The AI can add placeholder sections for any service.

**Q: Are integrations HIPAA/PCI compliant?**
A: Services mentioned (Stripe, Doxy.me, SimplePractice) are compliant when properly configured. Always verify compliance requirements for your specific use case.

---

## 📝 Notes

- All features marked with ✅ are **automatically generated** in the HTML/CSS - no setup required
- Integration placeholders are included by default - you only need to provide credentials to activate them
- Links will be set to "#" placeholders until you provide actual URLs/credentials
- The AI generates functional forms - you'll need to connect them to your backend/services
- Industry selection enhances UI design to match industry standards and best practices

**Need help with a specific integration?** Provide the service name and your current setup in the "Additional Changes" field when generating your redesign.
