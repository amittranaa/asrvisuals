import mongoose from 'mongoose'

const pricingPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  paymentUrl: {
    type: String,
    default: ''
  },
  highlight: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('PricingPlan', pricingPlanSchema)
