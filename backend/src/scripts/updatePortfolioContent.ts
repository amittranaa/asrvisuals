import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ContentBlock from '../models/ContentBlock'

dotenv.config()

const updatePortfolioContent = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables')
    }

    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri)
    console.log('Connected successfully')

    // Update home.portfolio
    const portfolioContent = {
      heading: 'Our Best Work',
      intro: "From tech reviews to gameplay breakdowns -- here's a glimpse of how we turn raw footage into binge-worthy content that resonates.",
      categories: ['All', 'Shorts Editing', 'Shorts Creative', 'Shorts Motion', 'Shorts Viral', 'Coming Soon'],
      projects: [
        {
          title: 'Shorts Highlight 1',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Shorts Editing',
          image: '/images/project-1.jpg',
          tags: ['Shorts', 'Editing'],
          videoUrl: 'https://www.youtube.com/embed/uKAzMUHWgOE?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          title: 'Shorts Highlight 2',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Shorts Creative',
          image: '/images/project-2.jpg',
          tags: ['Shorts', 'Creative'],
          videoUrl: 'https://www.youtube.com/embed/Q9keCbxEJaw?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          title: 'Shorts Highlight 3',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Shorts Motion',
          image: '/images/project-3.jpg',
          tags: ['Shorts', 'Motion'],
          videoUrl: 'https://www.youtube.com/embed/JUBTiJXWPNc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          title: 'Shorts Highlight 4',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Shorts Viral',
          image: '/images/project-4.jpg',
          tags: ['Shorts', 'Viral'],
          videoUrl: 'https://www.youtube.com/embed/xrYzCAVuGV0?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          title: 'Coming Soon',
          creator: 'ASR Visuals',
          views: 'New drops soon',
          category: 'Coming Soon',
          image: '/images/project-5.jpg',
          tags: ['Upcoming', 'Stay Tuned']
        }
      ]
    }

    console.log('Updating home.portfolio...')
    const portfolioResult = await ContentBlock.findOneAndUpdate(
      { key: 'home.portfolio' },
      { key: 'home.portfolio', data: portfolioContent },
      { upsert: true, new: true }
    )
    console.log('✅ home.portfolio updated successfully')

    // Update portfolio.videos
    const videosContent = {
      videoMode: 'manual',
      maxResults: 4,
      items: [
        {
          mode: 'manual',
          videoUrl: 'https://www.youtube.com/embed/uKAzMUHWgOE?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          mode: 'manual',
          videoUrl: 'https://www.youtube.com/embed/Q9keCbxEJaw?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          mode: 'manual',
          videoUrl: 'https://www.youtube.com/embed/JUBTiJXWPNc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          mode: 'manual',
          videoUrl: 'https://www.youtube.com/embed/xrYzCAVuGV0?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        }
      ]
    }

    console.log('Updating portfolio.videos...')
    const videosResult = await ContentBlock.findOneAndUpdate(
      { key: 'portfolio.videos' },
      { key: 'portfolio.videos', data: videosContent },
      { upsert: true, new: true }
    )
    console.log('✅ portfolio.videos updated successfully')

    console.log('\n✨ All portfolio content updated successfully!')
    
  } catch (error) {
    console.error('❌ Error updating portfolio content:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
    process.exit(0)
  }
}

updatePortfolioContent()
