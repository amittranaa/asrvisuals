import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type PricingPlan = {
  _id?: string
  name: string
  price: string
  description: string
  features?: string[]
  paymentUrl?: string
  highlight?: boolean
  active?: boolean
  sortOrder?: number
}

const emptyPlan: PricingPlan = {
  name: '',
  price: '',
  description: '',
  features: [],
  paymentUrl: '',
  highlight: false,
  active: true,
  sortOrder: 0
}

const PricingPage = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [form, setForm] = useState<PricingPlan>(emptyPlan)
  const [featuresText, setFeaturesText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPlans = async () => {
    try {
      const response = await api.get('/pricing/admin')
      setPlans(response.data.data || [])
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load plans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlans()
  }, [])

  const handleChange = (key: keyof PricingPlan, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleEdit = (plan: PricingPlan) => {
    setForm({ ...plan })
    setFeaturesText((plan.features || []).join('\n'))
  }

  const handleSave = async () => {
    setError('')
    const payload = {
      ...form,
      features: featuresText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    }
    try {
      if (form._id) {
        await api.put(`/pricing/${form._id}`, payload)
      } else {
        await api.post('/pricing', payload)
      }
      setForm(emptyPlan)
      setFeaturesText('')
      loadPlans()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save plan')
    }
  }

  const handleDelete = async (planId?: string) => {
    if (!planId) return
    setError('')
    try {
      await api.delete(`/pricing/${planId}`)
      loadPlans()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete plan')
    }
  }

  return (
    <div>
      <Topbar title="Pricing Plans" />
      {error ? <div className="pill">{error}</div> : null}
      <div className="grid two">
        <div className="card">
          <h3>Plans</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id || plan.name}>
                    <td>{plan.name}</td>
                    <td>{plan.price}</td>
                    <td>{plan.active ? 'Yes' : 'No'}</td>
                    <td>
                      <button className="button secondary" onClick={() => handleEdit(plan)}>
                        Edit
                      </button>
                      <button
                        className="button secondary"
                        style={{ marginLeft: '8px' }}
                        onClick={() => handleDelete(plan._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="card">
          <h3>{form._id ? 'Edit Plan' : 'New Plan'}</h3>
          <div className="grid">
            <div className="grid">
              <label>Name</label>
              <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="grid">
              <label>Price</label>
              <input value={form.price} onChange={(e) => handleChange('price', e.target.value)} />
            </div>
            <div className="grid">
              <label>Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
            <div className="grid">
              <label>Features (one per line)</label>
              <textarea
                rows={5}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="Up to 6 videos/month"
              />
            </div>
            <div className="grid">
              <label>Payment link (Razorpay)</label>
              <input
                value={form.paymentUrl || ''}
                onChange={(e) => handleChange('paymentUrl', e.target.value)}
                placeholder="https://rzp.io/..."
              />
            </div>
            <div className="grid">
              <label>Sort order</label>
              <input
                type="number"
                value={form.sortOrder || 0}
                onChange={(e) => handleChange('sortOrder', Number(e.target.value))}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={!!form.active}
                  onChange={(e) => handleChange('active', e.target.checked)}
                />{' '}
                Active
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={!!form.highlight}
                  onChange={(e) => handleChange('highlight', e.target.checked)}
                />{' '}
                Highlight
              </label>
            </div>
            <button className="button primary" onClick={handleSave}>
              Save plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
