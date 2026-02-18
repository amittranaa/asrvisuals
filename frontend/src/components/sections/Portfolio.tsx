'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { PlayIcon } from '@heroicons/react/24/solid'

const projects = [
  {
    title: 'The Launch in Motion: Framer\'s Big Day',
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

const categories = ['All', 'Tech Review', 'Tutorial', 'Travel', 'Gaming']

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

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
          <h2 className="mb-4">Our Best Work</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            From tech reviews to gameplay breakdowns — here's a glimpse of how we turn raw footage 
            into binge-worthy content that resonates.
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
          {categories.map((category) => (
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
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                  {/* Thumbnail Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-bg-secondary">
                    <div className="absolute inset-0 bg-text-primary/35 group-hover:bg-text-primary/20 transition-colors duration-300" />
                  </div>

                  {/* Play Button Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: hoveredProject === index ? 1 : 0,
                      scale: hoveredProject === index ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-brand-red rounded-lg flex items-center justify-center">
                      <PlayIcon className="w-8 h-8 text-text-primary ml-1" />
                    </div>
                  </motion.div>

                  {/* Creator Tag */}
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm text-text-primary">
                    {project.creator}
                  </div>

                  {/* Views Tag */}
                  <div className="absolute top-4 right-4 bg-brand-red text-text-primary px-3 py-1 rounded-lg text-sm font-semibold">
                    {project.views}
                  </div>

                  {/* Tags */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
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