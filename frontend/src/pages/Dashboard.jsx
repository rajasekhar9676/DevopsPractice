import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const Dashboard = () => {
  const [ideas, setIdeas] = useState([])
  const [sprints, setSprints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [ideasRes, sprintsRes] = await Promise.all([
        api.get('/ideas'),
        api.get('/validation')
      ])
      setIdeas(ideasRes.data)
      setSprints(sprintsRes.data)
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const getLatestIdea = () => {
    return ideas.length > 0 ? ideas[0] : null
  }

  const getSprintForIdea = (ideaId) => {
    return sprints.find(s => s.ideaId._id === ideaId || s.ideaId === ideaId)
  }

  const calculateProgress = (sprint) => {
    if (!sprint) return 0
    const days = [sprint.day1Status, sprint.day2Status, sprint.day3Status, sprint.day4Status, sprint.day5Status, sprint.day6Status, sprint.day7Status]
    const completed = days.filter(status => status === 'completed').length
    return Math.round((completed / 7) * 100)
  }

  const latestIdea = getLatestIdea()
  const latestSprint = latestIdea ? getSprintForIdea(latestIdea._id) : null
  const progress = calculateProgress(latestSprint)

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-text">Loading...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-danger/20 border border-danger rounded-xl text-danger">
            {error}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/idea-clarity"
            className="bg-secondary rounded-xl p-6 hover:bg-gray-700 transition-all border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-text mb-2">Idea Clarity</h3>
            <p className="text-gray-400 text-sm">
              {latestIdea ? 'Edit your idea' : 'Start defining your idea'}
            </p>
          </Link>
          {latestIdea && (
            <Link
              to={`/validation-sprint/${latestIdea._id}`}
              className="bg-secondary rounded-xl p-6 hover:bg-gray-700 transition-all border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-text mb-2">Validation Sprint</h3>
              <p className="text-gray-400 text-sm">
                {latestSprint ? 'Continue validation' : 'Start 7-day sprint'}
              </p>
            </Link>
          )}
        </div>

        {/* Idea Clarity Status */}
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-text mb-4">Idea Clarity Status</h2>
          {latestIdea ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-text">Idea defined</span>
              </div>
              <div className="bg-primary rounded-xl p-4">
                <h3 className="font-semibold text-text mb-2">Problem Statement</h3>
                <p className="text-gray-300 text-sm">{latestIdea.generatedProblemStatement}</p>
              </div>
              <div className="bg-primary rounded-xl p-4">
                <h3 className="font-semibold text-text mb-2">Positioning</h3>
                <p className="text-gray-300 text-sm">{latestIdea.generatedPositioning}</p>
              </div>
              <Link
                to="/idea-clarity"
                className="inline-block mt-4 px-4 py-2 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                Edit Idea
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-gray-400 mb-4">No idea defined yet</p>
              <Link
                to="/idea-clarity"
                className="inline-block px-4 py-2 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                Create Your First Idea
              </Link>
            </div>
          )}
        </div>

        {/* Validation Sprint Status */}
        {latestIdea && (
          <div className="bg-secondary rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-text mb-4">Validation Sprint Status</h2>
            {latestSprint ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text font-medium">Progress</span>
                    <span className="text-text font-semibold">{progress}%</span>
                  </div>
                  <div className="w-full bg-primary rounded-full h-3">
                    <div
                      className="bg-accent h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                    const status = latestSprint[`day${day}Status`]
                    return (
                      <div
                        key={day}
                        className={`p-3 rounded-xl text-center ${
                          status === 'completed' ? 'bg-success' : 'bg-primary'
                        }`}
                      >
                        <div className="text-xs font-semibold text-text">Day {day}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {status === 'completed' ? '✓' : '○'}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Link
                  to={`/validation-sprint/${latestIdea._id}`}
                  className="inline-block mt-4 px-4 py-2 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
                >
                  Continue Sprint
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-gray-400 mb-4">No validation sprint started</p>
                <Link
                  to={`/validation-sprint/${latestIdea._id}`}
                  className="inline-block px-4 py-2 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
                >
                  Start Validation Sprint
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Dashboard

