import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type ContentBlock = {
  _id?: string
  key: string
  data: any
}

const ContentPage = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [selectedKey, setSelectedKey] = useState('')
  const [jsonValue, setJsonValue] = useState('')
  const [error, setError] = useState('')

  const loadBlocks = async () => {
    try {
      const response = await api.get('/content')
      const data = response.data.data || []
      setBlocks(data)
      if (data.length && !selectedKey) {
        setSelectedKey(data[0].key)
        setJsonValue(JSON.stringify(data[0].data, null, 2))
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load content')
    }
  }

  useEffect(() => {
    loadBlocks()
  }, [])

  const handleSelect = (key: string) => {
    setSelectedKey(key)
    const block = blocks.find((item) => item.key === key)
    setJsonValue(JSON.stringify(block?.data || {}, null, 2))
  }

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(jsonValue)
      await api.put(`/content/${selectedKey}`, { data: parsed })
      loadBlocks()
      setError('')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid JSON or save failed')
    }
  }

  const handleCreate = async () => {
    if (!selectedKey) return
    try {
      const parsed = JSON.parse(jsonValue)
      await api.put(`/content/${selectedKey}`, { data: parsed })
      loadBlocks()
      setError('')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Create failed')
    }
  }

  return (
    <div>
      <Topbar title="Content Blocks" />
      {error ? <div className="pill">{error}</div> : null}
      <div className="grid two">
        <div className="card">
          <h3>Content keys</h3>
          <div className="grid">
            {blocks.map((block) => (
              <button
                key={block.key}
                className="button secondary"
                onClick={() => handleSelect(block.key)}
              >
                {block.key}
              </button>
            ))}
            <div className="grid">
              <label>New key</label>
              <input
                value={selectedKey}
                onChange={(event) => setSelectedKey(event.target.value)}
                placeholder="homepage.hero"
              />
              <button className="button secondary" onClick={handleCreate}>
                Create / Update
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>JSON editor</h3>
          <textarea
            rows={18}
            value={jsonValue}
            onChange={(event) => setJsonValue(event.target.value)}
          />
          <button className="button primary" style={{ marginTop: '12px' }} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentPage
