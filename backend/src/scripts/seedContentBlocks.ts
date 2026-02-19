import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ContentBlock from '../models/ContentBlock'

dotenv.config()

const contentBlocks = [
  {
    key: 'home.hero',
    data: {
      badge: 'Available for work',
      titleLine1: 'We Build Revenue Engines',
      titleLine2: 'Using Content, Ads, and Automation',
      subtitle: 'We help businesses scale revenue through strategic content, high-performance video editing, and data-driven advertising systems.',
      primaryCta: { label: 'Book a Strategy Call', href: 'https://cal.com/asrvisuals' },
      secondaryCta: { label: 'View Our Work', href: '#portfolio' },
      indicatorNumber: '(01)',
      indicatorLabel: 'VS.'
    }
  },
  {
    key: 'home.about',
    data: {
      heading: "We're the Editing Partners Behind the Creators Who Actually Grow with Results.",
      description: 'Fast, reliable, and obsessed with delivering scroll-stopping content that keeps your audience hooked and your channel growing.',
      achievements: [
        { icon: 'Video', text: '10+ years in industry' },
        { icon: 'Fast', text: 'Fast delivery' },
        { icon: 'Top', text: 'Top rated on Fiverr' }
      ],
      stats: [
        { value: '500+', label: 'Videos' },
        { value: '100+', label: 'Creators' },
        { value: '50M+', label: 'Views' }
      ],
      ctaLabel: 'Learn More About Us',
      ctaHref: '/about',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
    }
  },
  {
    key: 'home.services',
    data: {
      heading: 'What We Do Best',
      intro: 'We craft scroll-stopping edits that keep your audience hooked and your content looking top-tier.',
      items: [
        {
          title: 'Youtube Shorts Editing',
          description: 'We turn raw clips into high-retention, caption-packed vertical videos that pop on Reels, Shorts, and TikTok.',
          tags: ['Snappy Pacing', 'Viral-Ready', 'Subtitled']
        },
        {
          title: 'Long Form Edits',
          description: 'From vlogs to deep dives, we trim the fluff and tighten the pacing for maximum retention.',
          tags: ['Retention-Driven', 'Cinematic', 'Story-Focused']
        },
        {
          title: 'Thumbnail Design',
          description: "Custom thumbnails that demand clicks and capture your video's essence in one frame.",
          tags: ['Click Magnet', 'Brand Consistent', 'High-Contrast']
        },
        {
          title: 'Content Repurposing',
          description: 'One video, 10 pieces of content - cut into Shorts, Reels, quote cards, and teasers.',
          tags: ['Multi-Platform', 'Batch Delivery', 'Quick Turnaround']
        }
      ]
    }
  },
  {
    key: 'home.process',
    data: {
      label: '(02)',
      heading: 'Process',
      subheading: 'How we work with clients',
      steps: [
        {
          number: '01',
          title: 'Strategy & Discovery',
          description: 'We define your audience, messaging, creative angles, and growth objectives to build a clear content and ad strategy.'
        },
        {
          number: '02',
          title: 'Production & Execution',
          description: 'We plan, script, edit, and produce high-performing videos and marketing assets designed to attract and convert.'
        },
        {
          number: '03',
          title: 'Campaign Launch & Distribution',
          description: 'Meta ads and organic content are deployed strategically to generate awareness, inbound leads, and consistent engagement.'
        },
        {
          number: '04',
          title: 'Analytics & Scaling',
          description: 'We analyze performance data, improve creatives and funnels, and scale campaigns that drive predictable revenue growth.'
        }
      ]
    }
  },
  {
    key: 'home.portfolio',
    data: {
      heading: 'Our Best Work',
      intro: "From tech reviews to gameplay breakdowns -- here's a glimpse of how we turn raw footage into binge-worthy content that resonates.",
      categories: ['All', 'Tech Review', 'Tutorial', 'Travel', 'Gaming'],
      projects: [
        {
          title: "The Launch in Motion: Framer's Big Day",
          creator: 'Framer',
          views: '2M Views',
          category: 'Tech Review',
          image: '/images/project-1.jpg',
          tags: ['Cinematic', 'Product Launch']
        },
        {
          title: 'Master Framer Fast: Core Concepts',
          creator: 'GeorgeTech',
          views: '1.2M Views',
          category: 'Tutorial',
          image: '/images/project-2.jpg',
          tags: ['Educational', 'Tutorial']
        },
        {
          title: 'Meet the Creator Micro 2',
          creator: 'Smith Will',
          views: '4.2M Views',
          category: 'Product Review',
          image: '/images/project-3.jpg',
          tags: ['Review', 'Tech']
        },
        {
          title: 'Ultimate Editing Workflow',
          creator: 'EditMaster',
          views: '890K Views',
          category: 'Tutorial',
          image: '/images/project-4.jpg',
          tags: ['Editing', 'Workflow']
        },
        {
          title: 'Cinematic Travel Compilation',
          creator: 'Wanderlust',
          views: '3.1M Views',
          category: 'Travel',
          image: '/images/project-5.jpg',
          tags: ['Cinematic', 'Travel']
        },
        {
          title: 'Gaming Highlights 2024',
          creator: 'GamePro',
          views: '5.7M Views',
          category: 'Gaming',
          image: '/images/project-6.jpg',
          tags: ['Gaming', 'Highlights']
        }
      ]
    }
  },
  {
    key: 'home.pricing',
    data: {
      heading: 'Simple Plans',
      intro: "Whether you're uploading weekly or scaling fast, we've got a plan tailored to your content flow.",
      plans: []
    }
  },
  {
    key: 'home.testimonials',
    data: {
      label: '(03)',
      heading: 'Testimonials',
      subheading: 'Hear from those who trust us',
      items: [
        {
          quote: 'We got 31 calls in 30 days and booked 14 moves. I was honestly shocked and relieved. Calendar finally looked full again.',
          author: 'John Parker',
          company: 'Texas Moving LLC',
          image: '/testimonials/john.jpg'
        },
        {
          quote: 'Closed 9 flooring jobs in one month. These were real homeowners, not price shoppers. I felt confident hiring another installer.',
          author: 'Mark Robertson',
          company: 'Ohio Flooring',
          image: '/testimonials/mark.jpg'
        },
        {
          quote: 'We went from 2 quotes a week to 3 a day. Crews stayed fully booked, revenue stabilized, and I stopped stressing about slow weeks.',
          author: 'Mike Carter',
          company: '16th Street Fencing',
          image: '/testimonials/mike.jpg'
        }
      ]
    }
  },
  {
    key: 'home.faq',
    data: {
      label: '(04)',
      heading: 'FAQs',
      subheading: 'Answering your questions',
      items: [
        {
          question: 'What does ASR Visuals do?',
          answer: 'ASR Visuals helps businesses grow through strategic content creation, performance video editing, and paid advertising systems designed to generate customers.'
        },
        {
          question: 'Who is ASR Visuals for?',
          answer: 'We work with small and mid-sized businesses, local service companies, and brands looking to scale revenue using content and marketing.'
        }
      ]
    }
  },
  {
    key: 'home.blog',
    data: {
      heading: 'Creator Insights & Tips',
      intro: 'Stay ahead of the game with fresh insights on editing trends and YouTube growth strategies.',
      posts: [
        {
          title: '10 Editing Tricks That Will Double Your Retention',
          excerpt: 'Learn the secrets top creators use to keep viewers watching until the very end. Discover advanced cutting techniques, transitions, and pacing strategies.',
          author: 'Sarah Chen',
          date: 'Mar 15, 2024',
          readTime: '5 min read',
          category: 'Editing Tips',
          slug: 'editing-tricks-retention',
          tags: ['editing', 'retention', 'youtube', 'productivity']
        },
        {
          title: 'The Ultimate YouTube SEO Guide for 2024',
          excerpt: 'How we helped our clients grow their views by 300% using these simple SEO techniques. A data-driven approach to dominating YouTube search rankings.',
          author: 'Mike Ross',
          date: 'Mar 12, 2024',
          readTime: '8 min read',
          category: 'YouTube Growth',
          slug: 'youtube-seo-guide-2024',
          tags: ['seo', 'youtube', 'growth', 'optimization']
        },
        {
          title: 'From 0 to 100K: A Creator\'s Journey',
          excerpt: 'Case study: How consistent, high-quality editing helped a gaming channel explode. Real numbers, real strategies, real results.',
          author: 'Alex Thompson',
          date: 'Mar 10, 2024',
          readTime: '6 min read',
          category: 'Success Stories',
          slug: 'zero-to-hundredk-journey',
          tags: ['case-study', 'growth', 'gaming', 'strategy']
        }
      ]
    }
  },
  {
    key: 'home.cta',
    data: {
      heading: 'Start Generating Customers for Your Business',
      description: "Book a free strategy call and we'll design a 90-day customer acquisition roadmap for your business.",
      primaryCta: { label: 'Book Your Free Strategy Call', href: 'https://cal.com/asrvisuals' },
      secondaryCta: { label: 'Or Email Us for Custom Inquiry', href: '/contact' },
      trustItems: ['No commitment', '30-min call', 'Actionable roadmap', '90-day plan']
    }
  },
  {
    key: 'home.stats',
    data: {
      items: [
        { value: 500, label: 'Videos Delivered', suffix: '+' },
        { value: 100, label: 'Creators Served', suffix: '+' },
        { value: 50, label: 'Total Views', suffix: 'M+' },
        { value: 4.9, label: 'Stars Rating', suffix: '' }
      ]
    }
  },
  {
    key: 'page.about',
    data: {
      title: 'About ASR Visuals',
      description: 'We help brands grow with premium video editing, content strategy, and performance-focused creative that converts attention into customers.',
      cards: [
        {
          title: 'Clarity first',
          text: 'We plan content with clear hooks, structure, and outcomes so every edit has a job.'
        },
        {
          title: 'Speed without chaos',
          text: 'Tight turnaround and clean feedback loops so production stays consistent.'
        },
        {
          title: 'Performance-minded',
          text: 'We build creative that matches your goals, not just aesthetics.'
        }
      ],
      stats: [
        { label: 'Projects delivered', value: '500+' },
        { label: 'Client partners', value: '100+' },
        { label: 'Total views', value: '50M+' }
      ],
      primaryCtaLabel: 'Book a call',
      primaryCtaHref: 'https://cal.com/asrvisuals',
      secondaryCtaLabel: 'View services',
      secondaryCtaHref: '/services'
    }
  },
  {
    key: 'page.services',
    data: {
      title: 'Services',
      description: 'Production built to move fast. We deliver consistent, premium edits that keep your pipeline full and your audience engaged.',
      items: [
        {
          title: 'Short-form editing',
          text: 'High-retention edits for Reels, Shorts, and TikTok with strong hooks and punchy pacing.'
        },
        {
          title: 'Long-form editing',
          text: 'Story-driven edits that keep watch time high and make your message land clearly.'
        },
        {
          title: 'Thumbnail design',
          text: 'Scroll-stopping thumbnails built for CTR and consistent brand identity.'
        },
        {
          title: 'Content repurposing',
          text: 'Turn one video into a content system across multiple platforms.'
        }
      ],
      primaryCtaLabel: 'View pricing',
      primaryCtaHref: '/pricing',
      secondaryCtaLabel: 'Contact us',
      secondaryCtaHref: '/contact'
    }
  },
  {
    key: 'page.process',
    data: {
      title: 'How We Work',
      description: 'A simple, reliable system built to deliver quality and speed without chaos.',
      steps: [
        { title: 'Strategy & discovery', text: 'We clarify goals, audience, and content direction so every edit supports a result.' },
        { title: 'Production', text: 'We edit, refine, and deliver content with clean feedback and version control.' },
        { title: 'Distribution', text: 'We optimize formats and outputs so you can publish across platforms without friction.' },
        { title: 'Iteration', text: 'We learn from performance and refine the content system over time.' }
      ],
      primaryCtaLabel: 'Book a call',
      primaryCtaHref: 'https://cal.com/asrvisuals',
      secondaryCtaLabel: 'View portfolio',
      secondaryCtaHref: '/portfolio'
    }
  },
  {
    key: 'page.portfolio',
    data: {
      title: 'Our Best Work',
      description: 'Explore our portfolio of stunning video edits that have helped creators and brands achieve millions of views and engage their audiences.',
      categories: ['All', 'Long-form Edit', 'Short-form Content', 'Documentary Style', 'Educational Content', 'Paid Advertising', 'Event Coverage'],
      projects: []
    }
  },
  {
    key: 'page.pricing',
    data: {
      title: 'Pricing',
      description: 'Simple plans for consistent content production. Custom options available for teams with unique needs.',
      primaryCtaLabel: 'Book a call',
      primaryCtaHref: 'https://cal.com/asrvisuals',
      secondaryCtaLabel: 'Get a custom plan',
      secondaryCtaHref: '/contact'
    }
  },
  {
    key: 'page.contact',
    data: {
      title: 'Contact',
      description: 'Ready to grow? Book a call or send us a note. We usually respond within 24 hours.',
      email: 'asrvisualshelpline@gmail.com',
      phone: '+91 8102651176',
      instagramLabel: '@asr_visuals_',
      instagramUrl: 'https://www.instagram.com/asr_visuals_/',
      includeItems: [
        'Content goals and target audience',
        'Current volume and turnaround needs',
        'Links to existing content or references'
      ],
      primaryCtaLabel: 'Book a call',
      primaryCtaHref: 'https://cal.com/asrvisuals',
      secondaryCtaLabel: 'Back to home',
      secondaryCtaHref: '/'
    }
  },
  {
    key: 'page.faq',
    data: {
      title: 'FAQs',
      description: 'Answers to the most common questions about working with ASR Visuals.',
      items: [
        {
          q: 'What does ASR Visuals do?',
          a: 'We provide premium video editing, content strategy, and performance-focused creative for growing brands.'
        },
        {
          q: 'What is your typical turnaround time?',
          a: 'Most edits are delivered within 48-72 hours, depending on scope and volume.'
        }
      ]
    }
  },
  {
    key: 'page.blog',
    data: {
      title: 'Content',
      highlight: 'Creation',
      description: 'Learn professional video editing, YouTube growth strategies, content creation techniques, and creator psychology from industry experts.',
      posts: []
    }
  },
  {
    key: 'page.donate',
    data: {
      title: 'Support ASR Visuals',
      description: 'Your generous donations help us continue creating amazing content and improving our services. Every contribution, no matter the size, makes a difference!',
      upiId: 'asrvisuals@ptaxis',
      stripeUrl: 'https://buy.stripe.com/your-payment-link'
    }
  },
  {
    key: 'page.privacy',
    data: {
      title: 'Privacy Policy',
      description: 'We respect your privacy. This policy explains what data we collect and how we use it.',
      sections: [
        {
          title: 'Information we collect',
          text: 'We may collect contact details, project information, and communication history when you reach out to us or book a call.'
        },
        {
          title: 'How we use information',
          text: 'We use your information to respond to inquiries, deliver services, and improve our operations. We do not sell your data.'
        },
        {
          title: 'Data retention',
          text: 'We keep data only as long as necessary to provide services or meet legal requirements.'
        }
      ],
      contactEmail: 'asrvisualshelpline@gmail.com'
    }
  },
  {
    key: 'page.terms',
    data: {
      title: 'Terms of Service',
      description: 'These terms govern your use of the ASR Visuals website and services.',
      sections: [
        {
          title: 'Services',
          text: 'We provide video editing and content services based on the scope agreed during onboarding or a signed proposal.'
        },
        {
          title: 'Payments',
          text: 'Payment terms are outlined per plan or proposal. Work begins after payment confirmation unless stated otherwise.'
        },
        {
          title: 'Revisions',
          text: 'Revisions are included per plan. Additional revisions may be billed separately.'
        }
      ],
      contactEmail: 'asrvisualshelpline@gmail.com'
    }
  },
  {
    key: 'page.cookies',
    data: {
      title: 'Cookie Policy',
      description: 'This policy explains how we use cookies and similar technologies.',
      sections: [
        {
          title: 'What are cookies?',
          text: 'Cookies are small files stored on your device that help websites function and improve user experience.'
        },
        {
          title: 'How we use cookies',
          text: 'We use cookies for basic site functionality and analytics to understand page performance.'
        },
        {
          title: 'Managing cookies',
          text: 'You can control or delete cookies through your browser settings at any time.'
        }
      ]
    }
  }
]

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is required to seed content blocks')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)

  for (const block of contentBlocks) {
    await ContentBlock.findOneAndUpdate(
      { key: block.key },
      { data: block.data },
      { upsert: true, new: true }
    )
  }

  await mongoose.disconnect()
  console.log('Content blocks seeded successfully')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
