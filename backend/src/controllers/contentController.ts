import { Request, Response } from 'express'
import ContentBlock from '../models/ContentBlock'

export const getContentBlock = async (req: Request, res: Response) => {
  try {
    const { key } = req.params
    const block = await ContentBlock.findOne({ key })

    if (!block) {
      return res.status(404).json({ success: false, message: 'Content block not found' })
    }

    res.status(200).json({ success: true, data: block })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching content block' })
  }
}

export const getAllContentBlocks = async (_req: Request, res: Response) => {
  try {
    const blocks = await ContentBlock.find({}).sort({ updatedAt: -1 })
    res.status(200).json({ success: true, data: blocks })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching content blocks' })
  }
}

export const upsertContentBlock = async (req: Request, res: Response) => {
  try {
    const { key } = req.params
    const { data } = req.body

    const block = await ContentBlock.findOneAndUpdate(
      { key },
      { data, updatedBy: (req as any).user?.id },
      { new: true, upsert: true, runValidators: true }
    )

    res.status(200).json({ success: true, data: block })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating content block' })
  }
}
