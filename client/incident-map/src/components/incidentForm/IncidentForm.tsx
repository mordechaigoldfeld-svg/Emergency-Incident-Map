import { useEffect, useState } from 'react'
import { createIncidentApi, updateIncidentApi } from '../../api/incidentApi'
import type { createdIncident } from '../../types/incidentTypes';

interface IncidentFormProps {
  location: { lat: number; lng: number }
  initialData?: createdIncident | null
  onClose: () => void
  onSuccess: () => void
}

export default function IncidentForm({ location, onClose, onSuccess, initialData }: IncidentFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<'fire' | 'flood' | 'accident' | 'medical' | 'other'>('accident')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('open')
  const isEditMode = Boolean(initialData)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setCategory(initialData.category)
    } else {
      setTitle('')
      setDescription('')
      setCategory('accident')
    }

  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {

      if (isEditMode && initialData) {
        const updateBody = {
          title,
          description,
          category,
          status
        }
        await updateIncidentApi(updateBody, initialData._id)

      } else {

        await createIncidentApi({
          title,
          description,
          category,
          location,
          status: 'open'
        })


      }

      onSuccess()

    } catch (err: any) {
      setError(err.response?.data?.message || 'ERROR')
    } finally {
      setLoading(false)
    }
  }








  return (
    <div className="incident-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{isEditMode ? 'update incident' : 'new incident'}</h3>
        <button type="button" onClick={onClose}>✕</button>
      </div>

      <p style={{ fontSize: '13px', color: '#666' }}>
        מיקום: {location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>כותרת האירוע:</label>
          <input
            type="text"
            required={!isEditMode}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="למשל: תאונת דרכים"
          />
        </div>

        <div>
          <label>תיאור:</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="פרטים נוספים..."
          />
        </div>

        <div>
          <label>קטגוריה:</label>
          <select value={category} onChange={(e: any) => setCategory(e.target.value)}>
            <option value="accident">תאונה</option>
            <option value="fire">שריפה</option>
            <option value="flood">הצפה</option>
            <option value="medical">אירוע רפואי</option>
            <option value="other">אחר</option>
          </select>
        </div>
        {isEditMode && <div>
          <label>status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">open</option>
            <option value="in_progress">in progress</option>
            <option value="closed">closed</option>
          </select>
        </div>}

        <div style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'שולח...' : 'שמור דיווח'}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            ביטול
          </button>
        </div>
      </form>
    </div>
  )
}