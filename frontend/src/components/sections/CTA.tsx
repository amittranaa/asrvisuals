'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { CalendarIcon } from '@heroicons/react/24/outline'

const CTA = () => {
  return (
    <section className="py-20 sm:py-24 bg-bg-primary relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/20 to-transparent" />
      <div className="orb -top-20 -right-24 w-64 h-64 bg-brand-red/20" />
      <div className="orb orb--slow -bottom-24 -left-20 w-72 h-72 bg-brand-red/15" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(to right, rgb(217, 4, 41) 1px, transparent 1px),
                          linear-gradient(to bottom, rgb(217, 4, 41) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Start Generating Customers for Your Business
          </h2>
          
          <p className="text-xl text-text-secondary mb-8">
            Book a free strategy call and we'll design a 90-day customer acquisition 
            roadmap for your business.
          </p>

          {/* CTA Button */}
          <Button variant="primary" size="large" href="https://cal.com/asrvisuals" className="inline-flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Book Your Free Strategy Call
          </Button>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {['No commitment', '30-min call', 'Actionable roadmap', '90-day plan'].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span className="text-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 rounded-md">
              Or Email Us for Custom Inquiry
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA