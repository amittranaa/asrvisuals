import { Router } from 'express'
import { getPricingPlans, getAllPricingPlans, createPricingPlan, updatePricingPlan, deletePricingPlan } from '../controllers/pricingController'
import { protect, authorize } from '../middleware/auth'

const router = Router()

router.get('/', getPricingPlans)
router.get('/admin', protect, authorize('admin'), getAllPricingPlans)
router.post('/', protect, authorize('admin'), createPricingPlan)
router.put('/:id', protect, authorize('admin'), updatePricingPlan)
router.delete('/:id', protect, authorize('admin'), deletePricingPlan)

export default router
