# 2point0 - AI Website Redesign Generator

Transform any website into a modern, industry-tailored experience. Paste a URL, select your industry, customize colors, and get an instantly generated redesign with industry-specific features and integration placeholders.

## 🌟 Features

- 🔍 **Intelligent Website Analysis** - AI scrapes and understands your site's content and structure
- 🎨 **Custom Color Palettes** - Choose your own, let AI decide, or keep the original
- 🏢 **Industry-Specific Designs** - Tailored layouts for 10+ industries with built-in best practices
- 🔌 **Integration Placeholders** - Pre-built sections for Stripe, Uber Eats, Calendly, and 20+ services
- ✨ **AI Problem Detection** - Automatically identifies UI/UX issues in plain language
- 🎯 **5 Style Types** - Professional, Modern, Creative, Elegant, or Playful
- 🔄 **Iterative Refinement** - Request unlimited changes to perfect your redesign
- 📱 **Responsive by Default** - All designs work on mobile, tablet, and desktop

## 🏭 Supported Industries

| Industry | Built-In Features | Common Integrations |
|----------|------------------|-------------------|
| 🍽️ Restaurant | Reservations, online menu, special offers | Uber Eats, DoorDash |
| 💙 Non-Profit | Donation forms, campaign tracking, volunteer signup | Stripe, PayPal |
| 🦷 Dental | Appointment booking, patient forms, before/after gallery | Calendly, Square |
| 🛍️ E-commerce | Product catalog, cart, checkout | Stripe, PayPal |
| 💇 Salon/Spa | Service booking, stylist profiles, packages | Square Appointments |
| 💪 Fitness | Class schedule, memberships, trainer bios | Mindbody, Glofox |
| 🏠 Real Estate | Property listings, search filters, mortgage calculator | Google Maps, IDX |
| 📚 Education | Course catalog, enrollment, student portal | Teachable, Thinkific |
| 🏥 Healthcare | Appointment scheduling, telemedicine, patient portal | Doxy.me, SimplePractice |
| 🌐 General | Contact forms, portfolio, testimonials | Mailchimp |

## 🚀 Quick Start

### 1. Generate Your Redesign
```
1. Visit the app and paste any website URL
2. AI analyzes the site (5-30 seconds)
3. Select your industry from dropdown
4. Choose color palette (AI, Custom, or Original)
5. Pick a style type (Modern, Professional, etc.)
6. Select which problems to fix
7. Click "Generate Redesign"
```

### 2. Review & Iterate
- Preview your new site instantly
- Request specific changes in plain English
- Download the final HTML when satisfied

### 3. Connect Integrations (Optional)
See `INTEGRATION_SUMMARY.md` for:
- What's auto-generated vs what needs setup
- Which services to sign up for
- API keys and credentials needed
- Step-by-step integration guides

## 📚 Documentation

- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - Quick reference for all integrations
- **[INDUSTRY_FEATURES.md](./INDUSTRY_FEATURES.md)** - Detailed feature lists and setup instructions for each industry

## 💡 How It Works

1. **Scraping Phase** - AI fetches main page + up to 5 internal pages
2. **Analysis Phase** - AI identifies 3-5 key UX problems in simple language
3. **Design Phase** - AI generates a complete single-page HTML with:
   - Modern, responsive layout
   - Your chosen colors applied throughout
   - Industry-specific sections and features
   - Smooth scrolling navigation
   - Embedded CSS and JavaScript
4. **Refinement Phase** - Request changes and AI updates the design

## 🎨 Customization Options

### Color Modes
- **AI Choose** - AI selects optimal colors based on content
- **Custom** - Pick 3 colors with interactive color wheels
- **Keep Original** - Preserve the site's existing color scheme

### Style Types
- **Professional** - Clean, trustworthy, business-focused
- **Modern** - Sleek, minimal, lots of whitespace
- **Creative** - Bold, artistic, unique visuals
- **Elegant** - Sophisticated, refined, luxury feel
- **Playful** - Colorful, friendly, casual vibe

## 🔌 Integration Status

All generated websites include **placeholder UI elements** for common integrations. No external services required to generate the redesign - connect them later as needed.

### Commonly Used Services
| Service | Purpose | Cost | Setup Time |
|---------|---------|------|------------|
| Stripe | Payments | Free + 2.9% fees | 15 min |
| Calendly | Scheduling | Free tier | 5 min |
| Google Maps | Location | $200/mo free credit | 10 min |
| Mailchimp | Email marketing | Free (500 contacts) | 10 min |

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **AI:** Blink SDK (GPT-4.1 for generation, GPT-4.1-mini for analysis)
- **Icons:** Lucide React
- **Deployment:** Blink hosting (auto-deployed)

## 📦 Development Scripts

```bash
# Run all linting (includes CSS variable check)
npm run lint

# Check only CSS variables
npm run check:css-vars

# Individual linting
npm run lint:js    # ESLint
npm run lint:css   # Stylelint
```

## 🤝 Contributing

This project is designed to be extended with new industries and integrations. To add a new industry:

1. Add industry option to `DesignStudio.tsx` ToggleGroup
2. Add industry-specific features to `industryFeatures` object in `App.tsx`
3. Document features and integrations in `INDUSTRY_FEATURES.md`
4. Test generation with the new industry selected

## 📝 License

MIT License - feel free to use this for your own projects!

## 🆘 Support

Need help with integrations or having issues? Check:
- `INTEGRATION_SUMMARY.md` for common questions
- `INDUSTRY_FEATURES.md` for detailed integration guides
- Create an issue if you find bugs or have feature requests

---

**Built with [Blink](https://blink.new)** - The AI that builds fully functional apps