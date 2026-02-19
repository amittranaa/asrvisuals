import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type BlogPost = {
  _id?: string
  title: string
  slug: string
  category: string
  published: boolean
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    api.get('/blog/admin').then((res) => setPosts(res.data.data || [])).catch(() => setPosts([]))
  }, [])

  return (
    <div>
      <Topbar title="Blog Posts" />
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Category</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id || post.slug}>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>{post.category}</td>
                <td>{post.published ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlogPage
