'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Eye } from 'lucide-react'
import { useContentBlock } from '@/lib/useContentBlock'

type PortfolioProject = {
  id: number
  title: string
  category: string
  videoUrl?: string
  thumbnail: string
  description: string
  stats: { views: string; engagement: string }
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Product Launch Campaign',
    category: 'Long-form Edit',
    videoUrl: '', // Add: https://www.youtube.com/embed/VIDEO_ID?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3
    thumbnail: '/images/portfolio/project1.jpg',
    description: 'High-energy product launch video with motion graphics and compelling CTAs',
    stats: { views: '2.5M', engagement: '12%' }
  },
  {
    id: 2,
    title: 'Brand Story Documentary',
    category: 'Documentary Style',
    videoUrl: '', // Add: https://www.youtube.com/embed/VIDEO_ID?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3
    thumbnail: '/images/portfolio/project2.jpg',
    description: 'Emotional brand story that increased audience trust by 40%',
    stats: { views: '1.8M', engagement: '15%' }
  },
  {
    id: 3,
    title: 'Viral Short Series',
    category: 'Short-form Content',
    videoUrl: '', // Add: https://www.youtube.com/embed/VIDEO_ID?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3
    thumbnail: '/images/portfolio/project3.jpg',
    description: 'Series of 60-second shorts with 5M+ combined views',
    stats: { views: '5.2M', engagement: '18%' }
  },
  {
    id: 4,
    title: 'Tutorial Series',
    category: 'Educational Content',
    videoUrl: '', // Add: https://www.youtube.com/embed/VIDEO_ID?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3
    thumbnail: '/images/portfolio/project4.jpg',
    description: 'Step-by-step tutorials with clean graphics and annotations',
    stats: { views: '3.1M', engagement: '10%' }
  },
  {
    id: 5,
    title: 'Social Media Ads',
    category: 'Paid Advertising',
    videoUrl: '', // Add: https://www.youtube.com/embed/VIDEO_ID?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3
    thumbnail: '/images/portfolio/project5.jpg',
    description: 'High-converting ad creatives for Instagram and TikTok',
    stats: { views: '8.7M', engagement: '14%' }
  },
  {
    id: 6,
    title: 'Event Highlight Reel',
    category: 'Event Coverage',
    videoUrl: '', // Add: https://www.youtube.com/embed/VIDEO_ID?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3
    thumbnail: '/images/portfolio/project6.jpg',
    description: 'Dynamic event coverage with B-roll and testimonials',
    stats: { views: '950K', engagement: '11%' }
  }
]

const categories = ['All', 'Long-form Edit', 'Short-form Content', 'Documentary Style', 'Educational Content', 'Paid Advertising', 'Event Coverage']

type PortfolioPageContent = {
  title: string
  description: string
  categories: string[]
  projects: PortfolioProject[]
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

const defaultContent: PortfolioPageContent = {
  title: 'Our Best Work',
  description: 'Explore our portfolio of stunning video edits that have helped creators and brands achieve millions of views and engage their audiences.',
  categories,
  projects: portfolioProjects
}

export default function PortfolioPage() {
  const content = useContentBlock('page.portfolio', defaultContent)
  const videoContent = useContentBlock<PortfolioVideosContent>('portfolio.videos', {
    videoMode: 'auto',
    maxResults: 6,
    items: []
  })
  const [selectedCategory, setSelectedCategory] = useState(content.categories?.[0] || 'All')
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const activeProjects = content.projects?.length ? content.projects : portfolioProjects
  const activeCategories = content.categories?.length ? content.categories : categories
  const videoOverrides = videoContent.items || []
  const projectsWithVideos = activeProjects.map((project, index) => ({
    ...project,
    videoUrl: videoOverrides[index]?.videoUrl || project.videoUrl
  }))

  const filteredProjects = selectedCategory === 'All' 
    ? projectsWithVideos 
    : projectsWithVideos.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-bg-secondary py-24">
      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-semibold mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap gap-3"
        >
          {activeCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-brand-red text-white shadow-soft'
                  : 'bg-bg-primary border border-border-divider text-text-secondary hover:border-brand-red hover:text-brand-red'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => setSelectedVideo(project.id)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-brand-red/20 to-brand-red/5 overflow-hidden">
                {project.videoUrl ? (
                  <iframe
                    src={project.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-brand-red mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-text-secondary text-sm">Video Coming Soon</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-semibold mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-red transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Eye className="w-4 h-4" />
                    <span>{project.stats.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-red font-semibold">
                    <span>{project.stats.engagement} engagement</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate on your next project and create content that resonates with your audience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://cal.com/asrvisuals"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-hover px-8 py-3 text-base font-semibold text-white transition-all btn-bounce shadow-soft"
            >
              Book a Call
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-border-divider hover:border-brand-red bg-bg-primary px-8 py-3 text-base font-semibold text-text-primary transition-all"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
