import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Blog from '@/components/sections/Blog'
import CTA from '@/components/sections/CTA'
import Stats from '@/components/sections/Stats'
import { getContentBlock } from '@/lib/content'

type PricingApiPlan = {
  name: string
  price: string
  description: string
  paymentUrl?: string
  highlight?: boolean
  active?: boolean
}

type PortfolioVideoItem = {
  videoUrl?: string
  mode?: 'auto' | 'manual'
}

type PortfolioVideosContent = {
  videoMode?: 'auto' | 'manual'
  maxResults?: number
  items?: PortfolioVideoItem[]
}

const parsePrice = (value: string) => {
  const cleaned = value?.replace(/[^0-9.]/g, '')
  return cleaned ? Number(cleaned) : null
}

const getPricingPlans = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) {
    return [] as PricingApiPlan[]
  }

  try {
    const response = await fetch(`${baseUrl}/pricing`, { next: { revalidate: 60 } })
    if (!response.ok) {
      return [] as PricingApiPlan[]
    }
    const json = await response.json()
    return (json.data || []) as PricingApiPlan[]
  } catch {
    return [] as PricingApiPlan[]
  }
}

export default async function Home() {
  const heroContent = await getContentBlock('home.hero', null as any)
  const aboutContent = await getContentBlock('home.about', null as any)
  const servicesContent = await getContentBlock('home.services', null as any)
  const processContent = await getContentBlock('home.process', null as any)
  const portfolioContent = await getContentBlock('home.portfolio', null as any)
  const portfolioVideos = await getContentBlock<PortfolioVideosContent>('portfolio.videos', {
    videoMode: 'auto',
    maxResults: 6,
    items: []
  })
  const pricingContent = await getContentBlock('home.pricing', null as any)
  const testimonialsContent = await getContentBlock('home.testimonials', null as any)
  const faqContent = await getContentBlock('home.faq', null as any)
  const blogContent = await getContentBlock('home.blog', null as any)
  const ctaContent = await getContentBlock('home.cta', null as any)
  const statsContent = await getContentBlock('home.stats', null as any)

  const pricingPlans = await getPricingPlans()
  const pricingPlansNormalized = pricingPlans.map((plan: any) => ({
    name: plan.name,
    price: parsePrice(plan.price),
    description: plan.description,
    features: plan.features || [],
    popular: Boolean(plan.highlight),
    custom: plan.name.toLowerCase() === 'custom',
    paymentUrl: plan.paymentUrl || ''
  }))

  const pricingMerged = pricingPlansNormalized.length
    ? { ...(pricingContent || {}), plans: pricingPlansNormalized }
    : pricingContent

  const portfolioVideoOverrides = portfolioVideos?.items || []

  return (
    <>
      <Hero content={heroContent || undefined} />
      <Stats content={statsContent || undefined} />
      <About content={aboutContent || undefined} />
      <Services content={servicesContent || undefined} />
      <Process content={processContent || undefined} />
      <Portfolio content={portfolioContent || undefined} videoOverrides={portfolioVideoOverrides} />
      <Pricing content={pricingMerged || undefined} />
      <Testimonials content={testimonialsContent || undefined} />
      <FAQ content={faqContent || undefined} />
      <Blog content={blogContent || undefined} />
      <CTA content={ctaContent || undefined} />
    </>
  )
}