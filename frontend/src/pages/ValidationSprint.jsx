import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const ValidationSprint = () => {
  const { ideaId } = useParams()
  const navigate = useNavigate()
  const [sprint, setSprint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeDay, setActiveDay] = useState(1)
  const [dayData, setDayData] = useState({
    day1: { content: '' },
    day2: { script: '' },
    day3: { notes: '' },
    day4: { notes: '' },
    day5: { notes: '' },
    day6: { objections: ['', '', '', '', ''] },
    day7: { offer: '' }
  })

  useEffect(() => {
    fetchSprint()
  }, [ideaId])

  const fetchSprint = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/validation/${ideaId}`)
      setSprint(response.data)
      
      // Load existing data
      if (response.data.uploadedProof) {
        response.data.uploadedProof.forEach(proof => {
          if (proof.day === 1) {
            setDayData(prev => ({ ...prev, day1: { content: proof.content } }))
          } else if (proof.day >= 3 && proof.day <= 5) {
            setDayData(prev => ({ ...prev, [`day${proof.day}`]: { notes: proof.content } }))
          }
        })
      }
      
      if (response.data.objections && response.data.objections.length > 0) {
        setDayData(prev => ({ ...prev, day6: { objections: response.data.objections } }))
      }
    } catch (err) {
      if (err.response?.status === 404) {
        // Sprint doesn't exist yet, will be created on start
      } else {
        setError('Failed to load sprint')
      }
    } finally {
      setLoading(false)
    }
  }

  const startSprint = async () => {
    try {
      const response = await api.post('/validation', { ideaId })
      setSprint(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start sprint')
    }
  }

  const updateDayStatus = async (day, status) => {
    try {
      const response = await api.put(`/validation/${ideaId}/day`, { day, status })
      setSprint(response.data)
    } catch (err) {
      setError('Failed to update status')
    }
  }

  const saveDayData = async (day, type, content) => {
    try {
      await api.post(`/validation/${ideaId}/proof`, { day, type, content })
      await fetchSprint()
    } catch (err) {
      setError('Failed to save data')
    }
  }

  const saveObjections = async () => {
    try {
      await api.put(`/validation/${ideaId}/objections`, {
        objections: dayData.day6.objections.filter(o => o.trim() !== '')
      })
      await fetchSprint()
    } catch (err) {
      setError('Failed to save objections')
    }
  }

  const calculateProgress = () => {
    if (!sprint) return 0
    const days = [
      sprint.day1Status,
      sprint.day2Status,
      sprint.day3Status,
      sprint.day4Status,
      sprint.day5Status,
      sprint.day6Status,
      sprint.day7Status
    ]
    const completed = days.filter(status => status === 'completed').length
    return Math.round((completed / 7) * 100)
  }

  const getDayStatus = (day) => {
    if (!sprint) return 'pending'
    return sprint[`day${day}Status`] || 'pending'
  }

  const dayTasks = {
    1: {
      title: 'Identify 20 Target Users',
      description: 'Upload a CSV or text file with 20 potential target users',
      action: async () => {
        const content = dayData.day1.content
        if (content.trim()) {
          await saveDayData(1, 'csv', content)
          await updateDayStatus(1, 'completed')
        }
      }
    },
    2: {
      title: 'Prepare Interview Script',
      description: 'Use the template below to prepare your interview questions',
      template: `1. Can you tell me about your current process for [problem]?
2. What tools or methods are you currently using?
3. What's the biggest frustration with your current approach?
4. How much time/money does this problem cost you?
5. What would an ideal solution look like?`,
      action: async () => {
        const script = dayData.day2.script
        if (script.trim()) {
          await saveDayData(2, 'script', script)
          await updateDayStatus(2, 'completed')
        }
      }
    },
    3: {
      title: 'Conduct Interviews (Day 1)',
      description: 'Conduct your first interviews and upload notes',
      action: async () => {
        const notes = dayData.day3.notes
        if (notes.trim()) {
          await saveDayData(3, 'notes', notes)
          await updateDayStatus(3, 'completed')
        }
      }
    },
    4: {
      title: 'Conduct Interviews (Day 2)',
      description: 'Continue conducting interviews and upload notes',
      action: async () => {
        const notes = dayData.day4.notes
        if (notes.trim()) {
          await saveDayData(4, 'notes', notes)
          await updateDayStatus(4, 'completed')
        }
      }
    },
    5: {
      title: 'Conduct Interviews (Day 3)',
      description: 'Final day of interviews, upload your notes',
      action: async () => {
        const notes = dayData.day5.notes
        if (notes.trim()) {
          await saveDayData(5, 'notes', notes)
          await updateDayStatus(5, 'completed')
        }
      }
    },
    6: {
      title: 'Extract Top 5 Objections',
      description: 'Based on your interviews, list the top 5 objections you heard',
      action: async () => {
        await saveObjections()
        await updateDayStatus(6, 'completed')
      }
    },
    7: {
      title: 'Refine Your Offer',
      description: 'Based on all feedback, refine your value proposition',
      action: async () => {
        const offer = dayData.day7.offer
        if (offer.trim()) {
          await saveDayData(7, 'offer', offer)
          await updateDayStatus(7, 'completed')
        }
      }
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-text">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!sprint) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary rounded-xl p-8 border border-gray-700 text-center">
            <h2 className="text-2xl font-semibold text-text mb-4">Start Validation Sprint</h2>
            <p className="text-gray-400 mb-6">
              Begin your 7-day validation journey to test your idea
            </p>
            <button
              onClick={startSprint}
              className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
            >
              Start Sprint
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  const progress = calculateProgress()
  const currentDay = dayTasks[activeDay]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {error && (
          <div className="p-4 bg-danger/20 border border-danger rounded-xl text-danger">
            {error}
          </div>
        )}

        {/* Progress Overview */}
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text">Validation Sprint Progress</h2>
            <span className="text-text font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-primary rounded-full h-3 mb-4">
            <div
              className="bg-accent h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const status = getDayStatus(day)
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    status === 'completed'
                      ? 'bg-success text-white'
                      : activeDay === day
                      ? 'bg-accent text-white'
                      : 'bg-primary text-gray-400'
                  }`}
                >
                  <div className="text-xs font-semibold">Day {day}</div>
                  <div className="text-xs mt-1">
                    {status === 'completed' ? '✓' : '○'}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Current Day Task */}
        <div className="bg-secondary rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-text mb-2">Day {activeDay}: {currentDay.title}</h2>
          <p className="text-gray-400 mb-6">{currentDay.description}</p>

          {activeDay === 1 && (
            <div className="space-y-4">
              <textarea
                value={dayData.day1.content}
                onChange={(e) => setDayData(prev => ({ ...prev, day1: { content: e.target.value } }))}
                rows={10}
                className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Paste your list of 20 target users here (CSV format or plain text)..."
              />
              <button
                onClick={currentDay.action}
                className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                Mark Complete
              </button>
            </div>
          )}

          {activeDay === 2 && (
            <div className="space-y-4">
              <textarea
                value={dayData.day2.script}
                onChange={(e) => setDayData(prev => ({ ...prev, day2: { script: e.target.value } }))}
                rows={15}
                className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={currentDay.template}
              />
              <button
                onClick={currentDay.action}
                className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                Mark Complete
              </button>
            </div>
          )}

          {(activeDay === 3 || activeDay === 4 || activeDay === 5) && (
            <div className="space-y-4">
              <textarea
                value={dayData[`day${activeDay}`].notes}
                onChange={(e) => setDayData(prev => ({ ...prev, [`day${activeDay}`]: { notes: e.target.value } }))}
                rows={15}
                className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your interview notes, key insights, and screenshots/links here..."
              />
              <button
                onClick={currentDay.action}
                className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                Mark Complete
              </button>
            </div>
          )}

          {activeDay === 6 && (
            <div className="space-y-4">
              {dayData.day6.objections.map((objection, index) => (
                <input
                  key={index}
                  type="text"
                  value={objection}
                  onChange={(e) => {
                    const newObjections = [...dayData.day6.objections]
                    newObjections[index] = e.target.value
                    setDayData(prev => ({ ...prev, day6: { objections: newObjections } }))
                  }}
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={`Objection ${index + 1}`}
                />
              ))}
              <button
                onClick={currentDay.action}
                className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                Mark Complete
              </button>
            </div>
          )}

          {activeDay === 7 && (
            <div className="space-y-4">
              <textarea
                value={dayData.day7.offer}
                onChange={(e) => setDayData(prev => ({ ...prev, day7: { offer: e.target.value } }))}
                rows={15}
                className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Refine your value proposition based on all the feedback you've gathered..."
              />
              <button
                onClick={currentDay.action}
                className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                Mark Complete
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ValidationSprint

