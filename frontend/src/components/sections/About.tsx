'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const About = () => {
  const achievements = [
    { icon: '🎥', text: '10+ years in industry' },
    { icon: '⚡', text: 'Fast Delivery' },
    { icon: '⭐', text: 'Top Rated on Fiverr' },
  ]

  return (
    <section id="about" className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">About</span>
            <h2 className="mb-6">
              We're the Editing Partners Behind the Creators Who Actually Grow with Results.
            </h2>
            <p className="text-text-secondary text-base sm:text-lg mb-8">
              Fast, Reliable and Obsessed with delivering scroll-stopping content 
              that keeps your audience hooked and your channel growing.
            </p>

            {/* Achievement Tags */}
            <div className="flex flex-wrap gap-4 mb-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg-secondary border border-border-divider flex items-center gap-2 px-4 py-2 rounded-md"
                >
                  <span>{item.icon}</span>
                  <span className="text-sm text-text-primary font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-bg-secondary border border-border-divider p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-brand-red">500+</div>
                <div className="text-xs text-text-secondary">Videos</div>
              </div>
              <div className="bg-bg-secondary border border-border-divider p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-brand-red">100+</div>
                <div className="text-xs text-text-secondary">Creators</div>
              </div>
              <div className="bg-bg-secondary border border-border-divider p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-brand-red">50M+</div>
                <div className="text-xs text-text-secondary">Views</div>
              </div>
            </div>

            <Button variant="primary" href="/about">
              Learn More About Us
            </Button>
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-bg-secondary border border-border-divider">
              {/* Add your YouTube video URL here */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3"
                title="About ASR Visuals"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Fallback placeholder if no video URL */}
              {/* Uncomment below and remove iframe if you want a placeholder */}
              {/* <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/10">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-text-secondary">Video Coming Soon</p>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About