'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

type PortfolioProject = {
  title: string
  creator: string
  category: string
  image: string
  tags: string[]
  videoUrl?: string
}

const projects: PortfolioProject[] = [
  {
    title: 'Fast: Core Concepts',
    creator: 'GeorgeTech',
    category: 'Tutorial',
    image: '/images/project-2.jpg',
    tags: ['Educational', 'Tutorial'],
    videoUrl: 'https://www.youtube.com/embed/uKAzMUHWgOE?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
  },
  {
    title: 'Meet the Creator Micro 2',
    creator: 'Smith Will',
    category: 'Tech Review',
    image: '/images/project-3.jpg',
    tags: ['Review', 'Tech'],
    videoUrl: 'https://www.youtube.com/embed/Q9keCbxEJaw?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
  },
  {
    title: 'Ultimate Editing Workflow',
    creator: 'EditMaster',
    category: 'Tutorial',
    image: '/images/project-4.jpg',
    tags: ['Editing', 'Workflow'],
    videoUrl: 'https://www.youtube.com/embed/JUBTiJXWPNc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
  },
  {
    title: 'Cinematic Travel Compilation',
    creator: 'Wanderlust',
    category: 'Travel',
    image: '/images/project-5.jpg',
    tags: ['Cinematic', 'Travel'],
    videoUrl: 'https://www.youtube.com/embed/xrYzCAVuGV0?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
  }
]

const categories = ['All', 'Tech Review', 'Tutorial', 'Travel']

type PortfolioContent = {
  heading: string
  intro: string
  categories: string[]
  projects: PortfolioProject[]
}

type PortfolioVideoItem = {
  videoUrl?: string
}

const defaultContent: PortfolioContent = {
  heading: 'Our Best Work',
  intro: "From tech reviews to gameplay breakdowns — here's a glimpse of how we turn raw footage into binge-worthy content that resonates.",
  categories,
  projects
}

const Portfolio = ({
  content = defaultContent,
  videoOverrides
}: {
  content?: PortfolioContent
  videoOverrides?: PortfolioVideoItem[]
}) => {
  const [selectedCategory, setSelectedCategory] = useState(content.categories?.[0] || 'All')

  const activeProjects = content.projects?.length ? content.projects : defaultContent.projects
  const activeCategories = content.categories?.length ? content.categories : defaultContent.categories
  const mappedProjects = activeProjects.map((project, index) => ({
    ...project,
    videoUrl: videoOverrides?.[index]?.videoUrl || project.videoUrl
  }))

  const extraVideoProjects = (videoOverrides || [])
    .slice(activeProjects.length)
    .filter(item => item.videoUrl)
    .map((item, index) => ({
      title: `Featured Video ${activeProjects.length + index + 1}`,
      creator: 'CreatorFlow',
      category: 'Tutorial',
      image: '/images/project-2.jpg',
      tags: ['Featured'],
      videoUrl: item.videoUrl
    }))

  const mergedProjects = [...mappedProjects, ...extraVideoProjects]
  const videoProjects = mergedProjects.filter(
    (project): project is PortfolioProject & { videoUrl: string } => Boolean(project.videoUrl)
  )

  const filteredProjects = selectedCategory === 'All' 
    ? videoProjects 
    : videoProjects.filter(p => p.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="mb-4">{content.heading}</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {content.intro}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {activeCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brand-red text-text-primary font-semibold'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary border border-border-divider'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                  <iframe
                    src={project.videoUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Creator Tag */}
                  <div className="pointer-events-none absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm text-text-primary">
                    {project.creator}
                  </div>

                  {/* Tags */}
                  <div className="pointer-events-none absolute bottom-4 left-4 flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/75 backdrop-blur-sm px-2 py-1 rounded text-xs text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-red transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm">{project.creator} • {project.category}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" href="/portfolio">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio