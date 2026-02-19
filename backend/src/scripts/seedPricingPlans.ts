import dotenv from 'dotenv'
import mongoose from 'mongoose'
import PricingPlan from '../models/PricingPlan'

dotenv.config()

const pricingPlans = [
  {
    name: 'Starter',
    price: '650',
    description: 'For growing creators who post consistently each month.',
    features: [
      'Up to 6 videos/month',
      '2 revisions per video',
      'Basic color grading',
      '72 hour turnaround',
      'Email support'
    ],
    paymentUrl: '/contact',
    highlight: false,
    active: true,
    sortOrder: 1
  },
  {
    name: 'Pro',
    price: '1400',
    description: 'For established creators scaling their content.',
    features: [
      'Up to 20 videos/month',
      '5 revisions per video',
      'Advanced color grading',
      '48 hour turnaround',
      'Priority support'
    ],
    paymentUrl: '/contact',
    highlight: true,
    active: true,
    sortOrder: 2
  }
]

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is required to seed pricing plans')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)

  for (const plan of pricingPlans) {
    await PricingPlan.findOneAndUpdate(
      { name: plan.name },
      plan,
      { upsert: true, new: true }
    )
  }

  await mongoose.disconnect()
  console.log('Pricing plans seeded successfully')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
