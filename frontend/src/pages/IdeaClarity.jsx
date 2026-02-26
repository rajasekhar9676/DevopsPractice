import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

const IdeaClarity = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [existingIdea, setExistingIdea] = useState(null)
  const [formData, setFormData] = useState({
    targetCustomer: '',
    problem: '',
    alternatives: '',
    whyPay: '',
    unfairAdvantage: ''
  })
  const [results, setResults] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchExistingIdea()
  }, [])

  const fetchExistingIdea = async () => {
    try {
      const response = await api.get('/ideas')
      if (response.data.length > 0) {
        const idea = response.data[0]
        setExistingIdea(idea)
        setFormData({
          targetCustomer: idea.targetCustomer || '',
          problem: idea.problem || '',
          alternatives: idea.alternatives || '',
          whyPay: idea.whyPay || '',
          unfairAdvantage: idea.unfairAdvantage || ''
        })
        setResults({
          problemStatement: idea.generatedProblemStatement,
          icp: idea.generatedICP,
          positioning: idea.generatedPositioning
        })
      }
    } catch (err) {
      console.error('Failed to fetch idea:', err)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      let response
      if (existingIdea) {
        response = await api.put(`/ideas/${existingIdea._id}`, formData)
      } else {
        response = await api.post('/ideas', formData)
      }

      setResults({
        problemStatement: response.data.generatedProblemStatement,
        icp: response.data.generatedICP,
        positioning: response.data.generatedPositioning
      })
      setStep(6) // Show results
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save idea')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Target Customer' },
    { number: 2, title: 'Painful Problem' },
    { number: 3, title: 'Current Alternatives' },
    { number: 4, title: 'Why Would They Pay?' },
    { number: 5, title: 'Unfair Advantage' }
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-danger/20 border border-danger rounded-xl text-danger">
            {error}
          </div>
        )}

        {step <= 5 ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((s) => (
                  <div
                    key={s.number}
                    className={`flex-1 text-center ${
                      s.number <= step ? 'text-accent' : 'text-gray-500'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2 ${
                        s.number < step
                          ? 'bg-success text-white'
                          : s.number === step
                          ? 'bg-accent text-white'
                          : 'bg-secondary text-gray-500'
                      }`}
                    >
                      {s.number < step ? '✓' : s.number}
                    </div>
                    <div className="text-xs">{s.title}</div>
                  </div>
                ))}
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all"
                  style={{ width: `${(step / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-secondary rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold text-text mb-6">
                {steps[step - 1].title}
              </h2>

              {step === 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Who is your target customer?
                  </label>
                  <textarea
                    value={formData.targetCustomer}
                    onChange={(e) => handleChange('targetCustomer', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g., Small business owners who struggle with inventory management..."
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What painful problem are they facing?
                  </label>
                  <textarea
                    value={formData.problem}
                    onChange={(e) => handleChange('problem', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g., They lose track of inventory, leading to stockouts and overstocking..."
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What are the current alternatives they use?
                  </label>
                  <textarea
                    value={formData.alternatives}
                    onChange={(e) => handleChange('alternatives', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g., Excel spreadsheets, manual tracking, or expensive enterprise software..."
                  />
                </div>
              )}

              {step === 4 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Why would they pay for your solution?
                  </label>
                  <textarea
                    value={formData.whyPay}
                    onChange={(e) => handleChange('whyPay', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g., It saves them 10 hours per week and reduces inventory costs by 20%..."
                  />
                </div>
              )}

              {step === 5 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What is your unfair advantage?
                  </label>
                  <textarea
                    value={formData.unfairAdvantage}
                    onChange={(e) => handleChange('unfairAdvantage', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="e.g., AI-powered predictions, unique data access, proprietary algorithm..."
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 bg-secondary border border-gray-600 text-text rounded-xl hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                {step < 5 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Generating...' : 'Generate Results'}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Results View */
          <div className="space-y-6">
            <div className="bg-secondary rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold text-text mb-6">Generated Results</h2>

              <div className="space-y-6">
                <div className="bg-primary rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-3">Problem Statement</h3>
                  <p className="text-gray-300">{results.problemStatement}</p>
                </div>

                <div className="bg-primary rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-3">ICP Summary</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="font-medium">Stage:</span> {results.icp.stage}</p>
                    <p><span className="font-medium">Core Pain:</span> {results.icp.corePain}</p>
                    <p><span className="font-medium">Existing Behavior:</span> {results.icp.existingBehavior}</p>
                    <p><span className="font-medium">Value Driver:</span> {results.icp.valueDriver}</p>
                  </div>
                </div>

                <div className="bg-primary rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text mb-3">Positioning Statement</h3>
                  <p className="text-gray-300">{results.positioning}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-secondary border border-gray-600 text-text rounded-xl hover:bg-gray-700 transition-all"
                >
                  Edit Idea
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default IdeaClarity

