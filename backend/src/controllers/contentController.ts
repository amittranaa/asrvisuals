import { Request, Response } from 'express'
import ContentBlock from '../models/ContentBlock'

type HomeAboutData = {
  videoUrl?: string
  videoMode?: 'auto' | 'manual'
}

type PortfolioVideoItem = {
  videoUrl?: string
  mode?: 'auto' | 'manual'
}

type PortfolioVideosData = {
  videoMode?: 'auto' | 'manual'
  maxResults?: number
  items?: PortfolioVideoItem[]
}

const buildYoutubeEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3`

type YoutubeSearchResponse = {
  items?: Array<{
    id?: {
      videoId?: string
    }
  }>
}

const getLatestYoutubeVideoUrl = async (): Promise<string | null> => {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    return null
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('channelId', channelId)
  url.searchParams.set('maxResults', '1')
  url.searchParams.set('order', 'date')
  url.searchParams.set('type', 'video')
  url.searchParams.set('key', apiKey)

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      return null
    }
    const data = (await response.json()) as YoutubeSearchResponse
    const videoId = data?.items?.[0]?.id?.videoId
    if (!videoId) {
      return null
    }
    return buildYoutubeEmbedUrl(videoId)
  } catch {
    return null
  }
}

const getLatestYoutubeVideoUrls = async (maxResults: number): Promise<string[]> => {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    return []
  }

  const safeMaxResults = Math.min(Math.max(maxResults, 1), 50)
  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('channelId', channelId)
  url.searchParams.set('maxResults', String(safeMaxResults))
  url.searchParams.set('order', 'date')
  url.searchParams.set('type', 'video')
  url.searchParams.set('key', apiKey)

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      return []
    }
    const data = (await response.json()) as YoutubeSearchResponse
    const items = data?.items || []
    return items
      .map((item: any) => item?.id?.videoId)
      .filter(Boolean)
      .map((videoId: string) => buildYoutubeEmbedUrl(videoId))
  } catch {
    return []
  }
}

export const getContentBlock = async (req: Request, res: Response) => {
  try {
    const { key } = req.params
    const block = await ContentBlock.findOne({ key })

    if (!block) {
      return res.status(404).json({ success: false, message: 'Content block not found' })
    }

    if (key === 'home.about') {
      const data = (block.data || {}) as HomeAboutData
      const shouldAuto = data.videoMode === 'auto' || !data.videoUrl

      if (shouldAuto) {
        const latestVideoUrl = await getLatestYoutubeVideoUrl()
        if (latestVideoUrl) {
          return res.status(200).json({
            success: true,
            data: {
              ...block.toObject(),
              data: {
                ...data,
                videoUrl: latestVideoUrl,
                videoMode: data.videoMode || 'auto'
              }
            }
          })
        }
      }
    }

    if (key === 'portfolio.videos') {
      const data = (block.data || {}) as PortfolioVideosData
      const shouldAuto = data.videoMode === 'auto' || !data.videoMode
      const maxResults = typeof data.maxResults === 'number' ? data.maxResults : 6

      if (shouldAuto) {
        const latestVideoUrls = await getLatestYoutubeVideoUrls(maxResults)
        if (latestVideoUrls.length) {
          const existingItems = data.items || []
          const maxItems = Math.max(latestVideoUrls.length, existingItems.length)
          const items = Array.from({ length: maxItems }).map((_, index) => {
            const existingItem = existingItems[index]
            if (existingItem?.mode === 'manual' && existingItem.videoUrl) {
              return { ...existingItem, videoUrl: existingItem.videoUrl, mode: 'manual' }
            }

            const autoUrl = latestVideoUrls[index]
            if (autoUrl) {
              return { videoUrl: autoUrl, mode: 'auto' as const }
            }

            if (existingItem?.videoUrl) {
              return { ...existingItem, videoUrl: existingItem.videoUrl, mode: existingItem.mode || 'manual' }
            }

            return { mode: 'auto' as const }
          })

          return res.status(200).json({
            success: true,
            data: {
              ...block.toObject(),
              data: {
                ...data,
                items,
                videoMode: data.videoMode || 'auto',
                maxResults
              }
            }
          })
        }
      }
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
