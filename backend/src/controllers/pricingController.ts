import { Request, Response } from 'express'
import PricingPlan from '../models/PricingPlan'

export const getPricingPlans = async (_req: Request, res: Response) => {
  try {
    const plans = await PricingPlan.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 })
    res.status(200).json({ success: true, data: plans })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pricing plans' })
  }
}

export const getAllPricingPlans = async (_req: Request, res: Response) => {
  try {
    const plans = await PricingPlan.find({}).sort({ sortOrder: 1, createdAt: 1 })
    res.status(200).json({ success: true, data: plans })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pricing plans' })
  }
}

export const createPricingPlan = async (req: Request, res: Response) => {
  try {
    const plan = await PricingPlan.create(req.body)
    res.status(201).json({ success: true, data: plan })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating pricing plan' })
  }
}

export const updatePricingPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const plan = await PricingPlan.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Pricing plan not found' })
    }

    res.status(200).json({ success: true, data: plan })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating pricing plan' })
  }
}

export const deletePricingPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const plan = await PricingPlan.findByIdAndDelete(id)

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Pricing plan not found' })
    }

    res.status(200).json({ success: true, message: 'Pricing plan deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting pricing plan' })
  }
}
