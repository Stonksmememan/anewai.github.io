import { useState } from 'react'
import { createClient } from '@blinkdotnew/sdk'
import { LandingPage } from './components/LandingPage'
import { DesignStudio } from './components/DesignStudio'
import { RedesignPreview } from './components/RedesignPreview'
import { ColorValue } from '@/lib/colorUtils'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'

const blink = createClient({
  projectId: 'ai-website-redesign-generator-pxs4kuxv',
  authRequired: false // Don't require auth for public website analyzer
})

type AppState = 'landing' | 'design-studio' | 'preview'

interface WebsiteData {
  content: string
  metadata: any
  problems: string[]
}

function App() {
  const [state, setState] = useState<AppState>('landing')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState('')
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null)
  const [redesignedHTML, setRedesignedHTML] = useState('')
  const [solvedProblems, setSolvedProblems] = useState<string[]>([])
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [designOptions, setDesignOptions] = useState<any>(null)
  const { toast } = useToast()

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true)
    setLoadingStage('Fetching website content...')
    try {
      // Validate URL
      let validUrl = url.trim()
      
      // Check if URL is the placeholder or invalid
      if (!validUrl || validUrl === 'https://example.com' || validUrl === 'http://example.com') {
        toast({
          title: 'Invalid URL',
          description: 'Please enter a real website URL (not example.com)',
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }
      
      // Add https:// if no protocol specified
      if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
        validUrl = 'https://' + validUrl
      }
      
      // Validate URL format
      try {
        new URL(validUrl)
      } catch {
        toast({
          title: 'Invalid URL',
          description: 'Please enter a valid website URL (e.g., https://yoursite.com)',
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }
      
      // Scrape the main website page
      setLoadingStage('Scraping main page...')
      const { markdown, metadata, links } = await blink.data.scrape(validUrl)
      
      // Extract internal navigation links (limit to first 5 to avoid overwhelming)
      const baseUrl = new URL(validUrl)
      const linkUrls = (links || []).map((link: any) => typeof link === 'string' ? link : link.url)
      const internalLinks = linkUrls
        .filter((link: string) => {
          try {
            const linkUrl = new URL(link, validUrl)
            return linkUrl.hostname === baseUrl.hostname && 
                   linkUrl.pathname !== baseUrl.pathname &&
                   !link.includes('#') // Skip anchor links
          } catch {
            return false
          }
        })
        .slice(0, 5) // Limit to 5 additional pages
      
      // Scrape additional pages if found
      let additionalContent = ''
      if (internalLinks.length > 0) {
        setLoadingStage(`Analyzing ${internalLinks.length} additional pages...`)
        
        for (let i = 0; i < internalLinks.length; i++) {
          const link = internalLinks[i]
          try {
            setLoadingStage(`Analyzing page ${i + 1} of ${internalLinks.length}...`)
            const { markdown: pageMarkdown } = await blink.data.scrape(link)
            additionalContent += `\n\n--- PAGE: ${link} ---\n${pageMarkdown}`
          } catch (error) {
            console.error(`Failed to scrape ${link}:`, error)
          }
        }
      }
      
      // Always use fallback problems initially while AI analyzes
      const fallbackProblems = [
        'The menu is confusing and makes it hard to find things',
        'Text and headings don\'t stand out enough from each other',
        'Colors don\'t work well together and some text is hard to read',
        'Important buttons are hard to notice'
      ]
      
      // Set initial website data with fallback problems immediately
      setWebsiteData({
        content: markdown + additionalContent,
        metadata: {
          ...metadata,
          originalUrl: validUrl,
          scrapedPages: [validUrl, ...internalLinks]
        },
        problems: fallbackProblems
      })
      setState('design-studio')
      
      toast({
        title: 'Analysis complete!',
        description: `Website analyzed. Identified ${fallbackProblems.length} common issues to improve.`,
      })
      
      // Try to get AI-generated problems in background (optional enhancement)
      // If this fails, user still has fallback problems to work with
      try {
        setLoadingStage('Identifying design problems with AI...')
        
        const problemPrompt = `You are a UX/UI expert analyzing a website. Based on the following website content and metadata, identify 3-5 key problems or areas for improvement.

WEBSITE CONTENT:
${markdown + additionalContent}

WEBSITE METADATA:
Title: ${metadata?.title || 'Unknown'}
Description: ${metadata?.description || 'N/A'}

Analyze the website and identify 3-5 specific problems that normal users (not designers) would understand. Write each problem in simple, plain language that anyone can quickly grasp.

IMPORTANT: Avoid technical jargon. Write problems as if explaining to someone who doesn't know design terms.

Focus on:
- Hard to find things or confusing menus
- Text that's hard to read or colors that don't work well
- Things that are annoying or difficult to use
- Content that's messy or disorganized
- Problems on phones or small screens
- Buttons or links that are hard to spot
- Too much information or unclear structure

Return ONLY a JSON array of 3-5 problem strings. Each problem should be written in everyday language (1-2 sentences max).

GOOD Examples (simple language): 
["The menu has too many options, making it hard to find what you're looking for", "Important buttons blend into the background and are easy to miss", "Text is crammed together with no spacing, making it tiring to read"]

BAD Examples (too technical):
["Navigation lacks hierarchical structure and information architecture", "Insufficient visual hierarchy in CTA elements", "Typography lacks adequate leading and kerning"]

Return ONLY the JSON array, no explanations.`
        
        const { text: problemsText } = await blink.ai.generateText({
          prompt: problemPrompt,
          model: 'gpt-4.1-mini'
        })
        
        // Parse the problems from AI response
        let problems: string[] = []
        try {
          // Extract JSON array from response
          const jsonMatch = problemsText.match(/\[[\s\S]*\]/)
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0])
            // Validate that we got an array of strings
            if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
              problems = parsed
            }
          }
        } catch (parseError) {
          console.log('Could not parse AI problems, using fallback:', parseError)
        }
        
        // If we successfully got AI problems, update the website data
        if (problems.length >= 3 && problems.length <= 5) {
          setWebsiteData(prev => prev ? {
            ...prev,
            problems: problems
          } : null)
          
          toast({
            title: 'AI insights ready!',
            description: `Found ${problems.length} specific issues with this website.`,
          })
        } else if (problems.length > 5) {
          // Trim to 5 if we got too many
          const trimmedProblems = problems.slice(0, 5)
          setWebsiteData(prev => prev ? {
            ...prev,
            problems: trimmedProblems
          } : null)
          
          toast({
            title: 'AI insights ready!',
            description: `Found ${trimmedProblems.length} specific issues with this website.`,
          })
        }
      } catch (problemError) {
        console.log('AI problem identification failed, using default problems:', problemError)
        // User already has fallback problems, so no need to show error
      }
    } catch (error: any) {
      let errorMessage = 'Failed to analyze website. Please check the URL and try again.'
      
      // Provide more specific error messages
      if (error?.message?.includes('Network request failed') || error?.message?.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the website. Please check your internet connection.'
      } else if (error?.message?.includes('file_processing_error') || error?.message?.includes('Internal server error')) {
        errorMessage = 'This website cannot be analyzed. Try a different URL or a simpler website.'
      } else if (error?.status === 404) {
        errorMessage = 'Website not found. Please verify the URL is correct.'
      } else if (error?.status === 403 || error?.status === 401) {
        errorMessage = 'Access denied. This website may block automated access.'
      } else if (error?.code === 'NETWORK_ERROR' && error?.status === 500) {
        errorMessage = 'Server error while analyzing website. The site may be blocking automated access or has complex features we cannot process. Try a simpler, more standard website.'
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
      console.error('Error scraping website:', error)
    } finally {
      setIsLoading(false)
      setLoadingStage('')
    }
  }

  const handleGenerateRedesign = async (options: {
    colorMode: 'ai' | 'manual' | 'current'
    styleType: 'professional' | 'modern' | 'creative' | 'elegant' | 'playful'
    colors: {
      primary: ColorValue
      secondary: ColorValue
      tertiary: ColorValue
    }
    selectedProblems: string[]
    additionalChanges: string
    industry: string
  }) => {
    setIsLoading(true)
    setIsRegenerating(false)
    // Store options for potential regeneration
    setDesignOptions(options)
    // Navigate to preview immediately with empty content
    setState('preview')
    setRedesignedHTML('')
    
    try {
      const { colors, colorMode, styleType, selectedProblems, additionalChanges, industry } = options
      setSolvedProblems(selectedProblems)
      
      const scrapedPages = websiteData?.metadata?.scrapedPages || []
      const pagesList = scrapedPages.length > 1 
        ? `\n\nThis website has ${scrapedPages.length} pages that were analyzed:\n${scrapedPages.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}`
        : ''

      // Build style guidelines based on styleType
      const styleGuidelines = {
        professional: '- Clean, trustworthy, business-focused design\n   - Use professional typography (sans-serif fonts)\n   - Corporate color scheme with strong hierarchy\n   - Conservative layouts with clear sections\n   - Emphasis on credibility and authority',
        modern: '- Sleek, minimal, contemporary aesthetics\n   - Lots of whitespace and breathing room\n   - Bold typography with modern fonts\n   - Asymmetric layouts and creative use of space\n   - Subtle animations and micro-interactions',
        creative: '- Bold, artistic, unique visual approach\n   - Vibrant colors and expressive design elements\n   - Experimental layouts and unconventional grids\n   - Eye-catching typography and graphics\n   - Emphasis on visual storytelling',
        elegant: '- Sophisticated, refined, luxury feel\n   - Serif fonts and classic typography\n   - Muted, sophisticated color palette\n   - Generous spacing and balanced proportions\n   - Subtle gradients and premium aesthetics',
        playful: '- Colorful, friendly, casual vibe\n   - Fun illustrations and rounded shapes\n   - Bright, cheerful color combinations\n   - Playful animations and interactions\n   - Approachable and welcoming design'
      }

      // Build color instruction based on mode
      let colorInstructions = ''
      if (colorMode === 'ai') {
        colorInstructions = '3. Intelligently choose a color palette that:\n   - Matches the website content and brand identity\n   - Creates optimal visual harmony and accessibility\n   - Uses modern, professional colors\n   - Ensures proper contrast ratios for readability'
      } else if (colorMode === 'current') {
        colorInstructions = '3. Preserve the original website\'s color scheme:\n   - Extract and maintain the existing primary, secondary, and accent colors\n   - Keep the current color relationships and hierarchy\n   - Ensure colors are applied consistently throughout the redesign'
      } else {
        colorInstructions = `3. Use this exact color palette:
   - Primary: hsl(${colors.primary.hue}, ${colors.primary.saturation}%, ${colors.primary.lightness}%)
   - Secondary: hsl(${colors.secondary.hue}, ${colors.secondary.saturation}%, ${colors.secondary.lightness}%)
   - Tertiary: hsl(${colors.tertiary.hue}, ${colors.tertiary.saturation}%, ${colors.tertiary.lightness}%)`
      }

      const problemsList = selectedProblems.length > 0
        ? `\n\nKEY PROBLEMS TO SOLVE:\n${selectedProblems.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nYou MUST address each of these problems in your redesign.`
        : ''

      // Build industry-specific feature requirements
      const industryFeatures: Record<string, string> = {
        restaurant: `\n\nINDUSTRY-SPECIFIC FEATURES (Restaurant):\n- Add a prominent "Reserve a Table" button/section with table booking capability\n- Include an online menu with clear sections (appetizers, entrees, desserts, drinks)\n- Add "Order Online" section with TWO buttons:\n  * Uber Eats button: Green (#06c167) with car emoji 🚗, links to https://www.ubereats.com/search?q=[restaurant-name]\n  * DoorDash button: Red (#ff3008) with motorcycle emoji 🏍️, links to https://www.doordash.com/search?q=[restaurant-name]\n  * Make buttons large (at least 50px tall), side-by-side, with clear labels\n  * Open in new tab with target="_blank"\n- Include special offers/deals section\n- Add hours of operation and contact information prominently\n- Include a photo gallery of dishes and restaurant ambiance`,
        nonprofit: `\n\nINDUSTRY-SPECIFIC FEATURES (Non-Profit):\n- Add prominent "Donate Now" section with:\n  * Multiple donation amount buttons ($10, $25, $50, $100, $250)\n  * Make buttons white text on gradient purple/blue background (#667eea to #764ba2)\n  * Each button should trigger: window.open('https://donate.stripe.com/test_...[campaign-name]', '_blank')\n  * Add "Custom Amount" button as alternative\n  * Style as large, prominent call-to-action above the fold\n- Include campaign progress tracking with visual progress bars\n- Add volunteer sign-up form and opportunities section\n- Include impact stories showcase with testimonials\n- Add mission statement and "Our Impact" statistics\n- Include transparency section with financial information`,
        dental: `\n\nINDUSTRY-SPECIFIC FEATURES (Dental Practice):\n- Add "Book Appointment" button that embeds Calendly:\n  * Create a prominent CTA button in header and dedicated section\n  * Embed Calendly widget in appointment section: <div class="calendly-inline-widget" data-url="https://calendly.com/your-practice-name/appointment" style="min-width:320px;height:630px;"></div>\n  * Add script: <script src="https://assets.calendly.com/assets/external/widget.js" async></script>\n  * Include appointment types: Cleaning, Consultation, Emergency, Check-up\n- Include patient forms section (new patient forms, medical history)\n- Add insurance information and accepted providers\n- Include detailed service descriptions (cleanings, cosmetic, orthodontics)\n- Add before/after gallery for cosmetic procedures\n- Include staff/dentist profiles with credentials`,
        ecommerce: `\n\nINDUSTRY-SPECIFIC FEATURES (E-commerce):\n- Add product catalog with grid layout and filters\n- Include shopping cart icon with item count\n- Add "Buy Now" buttons on each product that trigger:\n  * window.open('https://checkout.stripe.com/...[product-id]', '_blank')\n  * Style buttons: Blue (#6772e5) background, white text, rounded corners\n  * Display price prominently on product cards\n- Include customer reviews and ratings for products\n- Add wishlist functionality\n- Include search bar for product discovery`,
        salon: `\n\nINDUSTRY-SPECIFIC FEATURES (Salon/Spa):\n- Add online booking system with Calendly embed:\n  * Embed widget: <div class="calendly-inline-widget" data-url="https://calendly.com/salon-name/appointment" style="min-width:320px;height:630px;"></div>\n  * Include service types: Haircut, Coloring, Styling, Treatment\n  * Add script: <script src="https://assets.calendly.com/assets/external/widget.js" async></script>\n- Include stylist/therapist profiles with specialties\n- Add detailed service menu with prices\n- Include gallery of work (hairstyles, treatments)\n- Add membership/package options\n- Include product shop section for retail items`,
        fitness: `\n\nINDUSTRY-SPECIFIC FEATURES (Fitness Center):\n- Add class schedule with time slots and instructor names\n- Include membership tiers with pricing comparison and Stripe checkout:\n  * Add "Join Now" buttons for each tier\n  * Buttons trigger: window.open('https://checkout.stripe.com/...[membership-tier]', '_blank')\n  * Highlight recommended tier with special styling\n- Add trainer bios with certifications\n- Include online booking for classes with Calendly:\n  * Embed for personal training sessions\n  * Class booking with available time slots\n- Add progress tracking/member portal section\n- Include facility tour and equipment showcase`,
        realestate: `\n\nINDUSTRY-SPECIFIC FEATURES (Real Estate):\n- Add property listings with grid/list view\n- Include advanced search filters (price, beds, baths, location)\n- Add virtual tour links for properties\n- Include agent profiles with contact information\n- Add mortgage calculator tool\n- Include neighborhood information and map integration`,
        education: `\n\nINDUSTRY-SPECIFIC FEATURES (Education):\n- Add course catalog with detailed descriptions\n- Include enrollment forms and application process\n- Add student portal login section\n- Include instructor profiles with credentials\n- Add academic calendar and important dates\n- Include resources section for current students`,
        healthcare: `\n\nINDUSTRY-SPECIFIC FEATURES (Healthcare):\n- Add appointment scheduling system with Calendly:\n  * Embed widget: <div class="calendly-inline-widget" data-url="https://calendly.com/practice-name/consultation" style="min-width:320px;height:630px;"></div>\n  * Include appointment types: Consultation, Follow-up, Telemedicine\n  * Add Calendly script tag\n- Include telemedicine/virtual visit integration\n- Add patient portal login for records access\n- Include insurance information and billing\n- Add detailed service descriptions and specialties\n- Include provider profiles with credentials and experience`,
        general: ''
      }

      const industryRequirements = industryFeatures[industry] || ''

      const prompt = `You are an expert web designer. I need you to create a complete, self-contained SINGLE-PAGE HTML file for a redesigned website.

ORIGINAL WEBSITE CONTENT:
${websiteData?.content}${pagesList}

WEBSITE METADATA:
Title: ${websiteData?.metadata?.title || 'Unknown'}
Description: ${websiteData?.metadata?.description || 'N/A'}
Original URL: ${websiteData?.metadata?.originalUrl || 'N/A'}${problemsList}${industryRequirements}

DESIGN REQUIREMENTS:
1. Create a completely new, modern UI design with better UX that solves the identified problems above
2. STYLE TYPE: ${styleType.toUpperCase()}
   ${styleGuidelines[styleType]}
${colorInstructions}
4. Additional changes requested: ${additionalChanges || 'None'}

CRITICAL INSTRUCTIONS FOR NAVIGATION:
- This MUST be a SINGLE-PAGE application - all content on one scrollable page
- Convert ALL pages into sections with IDs (e.g., <section id="about">, <section id="services">)
- Create a FIXED navigation bar at the top with smooth scroll anchor links (href="#about", href="#services", etc.)
- ALL links must be INTERNAL anchor links (#section-name) - NO external links to the original website
- Use JavaScript smooth scrolling: document.querySelectorAll('a[href^="#"]').forEach(...)
- Organize content into clear sections with proper headings and spacing
- Each section should represent a page or major content area from the original site

DESIGN INSTRUCTIONS:
- Create ONE complete HTML file with embedded CSS and JavaScript
- Keep ALL original content and information from the website
- Make the layout modern, clean, and user-friendly
- Use the specified colors throughout the design (primary for headers/CTAs, secondary for accents, tertiary for highlights)
- Ensure responsive design that works on mobile and desktop
- Include smooth transitions, hover effects, and smooth scroll behavior
- Make navigation and content hierarchy clear and intuitive
- Add a sticky/fixed header with navigation links
- DO NOT include any explanations, just return the raw HTML

Return ONLY the complete HTML code, starting with <!DOCTYPE html>`

      // Use streaming to show real-time generation
      let accumulatedHTML = ''
      
      await blink.ai.streamText(
        {
          prompt,
          model: 'gpt-4.1'
        },
        (chunk) => {
          accumulatedHTML += chunk
          setRedesignedHTML(accumulatedHTML)
        }
      )

      // Extract HTML from response (in case it's wrapped in markdown code blocks)
      let htmlContent = accumulatedHTML
      const htmlMatch = accumulatedHTML.match(/```html\n?([\s\S]*?)\n?```/)
      if (htmlMatch) {
        htmlContent = htmlMatch[1]
      } else if (accumulatedHTML.includes('```')) {
        const codeMatch = accumulatedHTML.match(/```\n?([\s\S]*?)\n?```/)
        if (codeMatch) {
          htmlContent = codeMatch[1]
        }
      }

      setRedesignedHTML(htmlContent)
      
      toast({
        title: 'Redesign complete!',
        description: 'Your new website is ready to view.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate redesign. Please try again.',
        variant: 'destructive'
      })
      console.error('Error generating redesign:', error)
      setState('design-studio')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (state === 'design-studio') {
      setState('landing')
      setWebsiteData(null)
    } else if (state === 'preview') {
      setState('design-studio')
    }
  }

  const handleStartOver = () => {
    setState('landing')
    setWebsiteData(null)
    setRedesignedHTML('')
    setDesignOptions(null)
    setIsRegenerating(false)
  }

  const handleRequestChanges = async (changeRequest: string) => {
    if (!websiteData || !redesignedHTML || !designOptions) return
    
    setIsRegenerating(true)
    setIsLoading(true)
    
    try {
      const { colors, colorMode, styleType } = designOptions
      
      // Build color instruction based on mode
      let colorInstructions = ''
      if (colorMode === 'ai') {
        colorInstructions = 'Use the color palette you previously selected that matches the website content'
      } else if (colorMode === 'current') {
        colorInstructions = 'Maintain the original website\'s color scheme from the previous redesign'
      } else {
        colorInstructions = `Use the same color palette as before:
   - Primary: hsl(${colors.primary.hue}, ${colors.primary.saturation}%, ${colors.primary.lightness}%)
   - Secondary: hsl(${colors.secondary.hue}, ${colors.secondary.saturation}%, ${colors.secondary.lightness}%)
   - Tertiary: hsl(${colors.tertiary.hue}, ${colors.tertiary.saturation}%, ${colors.tertiary.lightness}%)`
      }

      const prompt = `You are an expert web designer. You previously created this redesigned website, and now the user wants to make changes.

CURRENT WEBSITE HTML:
${redesignedHTML}

USER'S REQUESTED CHANGES:
${changeRequest}

DESIGN SPECIFICATIONS TO MAINTAIN:
- Style Type: ${styleType}
- ${colorInstructions}

INSTRUCTIONS:
1. Take the current HTML and apply ONLY the user's requested changes
2. Maintain all existing content and structure unless specifically asked to change it
3. Keep the same style type and color palette unless requested otherwise
4. Ensure the result is still a complete, self-contained single-page HTML file
5. Keep responsive design and all existing functionality
6. DO NOT include any explanations, just return the raw HTML

Return ONLY the complete updated HTML code, starting with <!DOCTYPE html>`

      // Use streaming to show real-time regeneration
      let accumulatedHTML = ''
      
      await blink.ai.streamText(
        {
          prompt,
          model: 'gpt-4.1'
        },
        (chunk) => {
          accumulatedHTML += chunk
          setRedesignedHTML(accumulatedHTML)
        }
      )

      // Extract HTML from response (in case it's wrapped in markdown code blocks)
      let htmlContent = accumulatedHTML
      const htmlMatch = accumulatedHTML.match(/```html\n?([\s\S]*?)\n?```/)
      if (htmlMatch) {
        htmlContent = htmlMatch[1]
      } else if (accumulatedHTML.includes('```')) {
        const codeMatch = accumulatedHTML.match(/```\n?([\s\S]*?)\n?```/)
        if (codeMatch) {
          htmlContent = codeMatch[1]
        }
      }

      setRedesignedHTML(htmlContent)
      
      toast({
        title: 'Changes applied!',
        description: 'Your website has been updated with the requested changes.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to apply changes. Please try again.',
        variant: 'destructive'
      })
      console.error('Error regenerating with changes:', error)
    } finally {
      setIsLoading(false)
      setIsRegenerating(false)
    }
  }

  return (
    <>
      {state === 'landing' && (
        <LandingPage 
          onSubmit={handleUrlSubmit} 
          isLoading={isLoading}
          loadingStage={loadingStage}
        />
      )}
      
      {state === 'design-studio' && websiteData && (
        <DesignStudio
          websiteContent={websiteData.content}
          websiteMetadata={websiteData.metadata}
          websiteProblems={websiteData.problems}
          onGenerate={handleGenerateRedesign}
          onBack={handleBack}
          isGenerating={isLoading}
        />
      )}
      
      {state === 'preview' && (
        <RedesignPreview
          htmlContent={redesignedHTML}
          solvedProblems={solvedProblems}
          onBack={handleBack}
          onStartOver={handleStartOver}
          onRequestChanges={handleRequestChanges}
          isRegenerating={isRegenerating}
        />
      )}
      
      <Toaster />
      <SonnerToaster />
    </>
  )
}

export default App