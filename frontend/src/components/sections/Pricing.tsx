'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { CheckIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Starter',
    price: 899,
    description: 'For growing creators who post 4-6 videos/month',
    features: [
      'Up to 6 Videos/month',
      '2 revisions per video',
      'Basic color grading',
      '72 hour turnaround',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: 1599,
    description: 'For established creators scaling their content',
    features: [
      'Up to 20 Videos/month',
      '5 revisions per video',
      'Advanced color grading',
      '48 hour turnaround',
      'Video call support',
      'Priority queue'
    ],
    popular: true
  },
  {
    name: 'Custom',
    price: null,
    description: 'For businesses and channels with unique needs',
    features: [
      '10 to 40+ Video Edits',
      '24h / 48h / 72h Delivery',
      'Title & thumbnail strategy',
      'Multi-channel assets',
      'Dedicated account manager',
      'Custom workflows'
    ],
    popular: false,
    custom: true
  }
]

const Pricing = () => {
  return (
    <section className="py-20 sm:py-24 bg-bg-primary relative overflow-hidden">
      <div className="orb -top-24 -right-20 w-72 h-72 bg-brand-red/15" />
      <div className="orb orb--slow -bottom-32 -left-24 w-80 h-80 bg-brand-red/10" />
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">Pricing</span>
          <h2 className="mb-4">Simple Plans</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Whether you're uploading weekly or scaling fast, we've got a plan 
            tailored to your content flow.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-brand-red text-text-primary px-4 py-1 rounded-lg text-sm font-semibold shadow-soft">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-2 border-brand-red shadow-medium' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-text-primary">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.price ? (
                      <>
                        <span className="text-4xl font-bold text-brand-red">${plan.price}</span>
                        <span className="text-text-secondary">/month</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-brand-red">Custom</span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">{plan.description}</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  fullWidth
                  href={plan.custom ? '/contact' : '/checkout'}
                  className="btn-bounce"
                >
                  {plan.custom ? 'Contact Us' : 'Choose Plan'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing