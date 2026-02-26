import { Link } from 'react-router-dom'

const stats = [
  { label: 'Total Revenue', value: '$2,340' },
  { label: 'Paying Customers', value: '18' },
  { label: 'Conversion Rate', value: '6.2%' },
  { label: 'Weekly Growth', value: '+14%' },
]

const activities = [
  'Talked to 5 users',
  'Closed 2 paid customers',
  'Improved onboarding copy',
  'Sent 30 cold emails',
]

const Revenue = () => {
  return (
    <div className="min-h-screen bg-primary text-text">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Revenue Dashboard</h1>

        <Link
          to="/"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back Home
        </Link>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-secondary border border-gray-700 rounded-xl p-6 text-center"
          >
            <p className="text-gray-400 text-sm mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-accent">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Activity section */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-secondary rounded-xl border border-gray-700 p-8">
          <h2 className="text-xl font-semibold mb-6">This Week’s Execution</h2>

          <ul className="space-y-3">
            {activities.map((item, i) => (
              <li
                key={i}
                className="bg-primary border border-gray-700 rounded-lg px-4 py-3 text-gray-300"
              >
                ✅ {item}
              </li>
            ))}
          </ul>

          <button className="mt-8 w-full bg-accent hover:bg-indigo-600 transition rounded-xl py-3 font-semibold">
            Add Today’s Progress
          </button>
        </div>
      </div>
    </div>
  )
}

export default Revenue