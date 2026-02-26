import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="bg-secondary border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-text">Founder OS</h1>
            <span className="text-xs text-gray-400">Operating System for Serious Builders</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-text transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-accent text-white rounded-xl hover:bg-indigo-600 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
          Stop Thinking.<br />
          Start Executing.
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Founder OS helps early-stage founders validate ideas and get their first customers with structured execution systems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-indigo-600 transition-all text-lg"
          >
            Start Building
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 bg-secondary border border-gray-600 text-text rounded-xl font-semibold hover:bg-gray-700 transition-all text-lg"
          >
            Explore How It Works
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-text text-center mb-12">
            Tired of Building in Circles?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Confused What to Build',
                description: 'You have ideas but no clarity on which one to pursue or how to validate it properly.'
              },
              {
                title: 'No Validation',
                description: 'Building without talking to users. Shipping features nobody wants. Wasting months.'
              },
              {
                title: 'No Real Customers',
                description: 'Launching to crickets. No one knows about your product. No traction, no revenue.'
              },
              {
                title: 'Fake Productivity',
                description: 'Busy building features, but not building the right thing. Motion without progress.'
              },
              {
                title: 'No Accountability',
                description: 'No structure, no deadlines, no system. Just endless "tomorrow I\'ll start" promises.'
              }
            ].map((problem, index) => (
              <div
                key={index}
                className="bg-primary rounded-xl p-6 border border-gray-700 hover:border-accent transition-all"
              >
                <h3 className="text-xl font-semibold text-text mb-3">{problem.title}</h3>
                <p className="text-gray-400">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-text text-center mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Simple. Powerful.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Clarify Your Idea',
                description: 'Use our Idea Clarity Engine to define your target customer, their pain, and your unfair advantage. Get crystal-clear positioning in minutes.'
              },
              {
                step: '02',
                title: 'Validate with Real Users',
                description: 'Follow our 7-day Validation Sprint. Talk to 20 users. Extract objections. Refine your offer based on real feedback.'
              },
              {
                step: '03',
                title: 'Execute with Structure',
                description: 'Track progress. Stay accountable. Build systematically. Get your first customers with a proven framework.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-secondary rounded-xl p-8 border border-gray-700 text-center"
              >
                <div className="text-6xl font-bold text-accent mb-4 opacity-50">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-text mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Preview Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-text text-center mb-12">
            Everything You Need to Build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Idea Clarity Engine',
                description: 'Multi-step framework to define your idea, target customer, and positioning statement.'
              },
              {
                title: 'Validation Sprint System',
                description: '7-day structured process to validate your idea with real users and extract key insights.'
              },
              {
                title: 'Revenue Execution Dashboard',
                description: 'Track your progress, monitor validation metrics, and stay focused on what matters.'
              },
              {
                title: 'Weekly Review System',
                description: 'Built-in accountability and reflection to ensure continuous progress and learning.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-primary rounded-xl p-6 border border-gray-700 hover:border-accent transition-all"
              >
                <h3 className="text-xl font-semibold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-text text-center mb-12">
            Built for Serious Builders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'SaaS Founders',
                description: 'Building B2B products and need systematic validation before building.'
              },
              {
                title: 'Gen Z Builders',
                description: 'Young entrepreneurs ready to execute, not just ideate.'
              },
              {
                title: 'Early-Stage Startup Founders',
                description: 'Pre-product-market fit. Need structure to find your first customers.'
              },
              {
                title: 'Indie Hackers',
                description: 'Solo builders who want accountability and proven frameworks.'
              }
            ].map((audience, index) => (
              <div
                key={index}
                className="bg-secondary rounded-xl p-6 border border-gray-700 text-center"
              >
                <h3 className="text-xl font-semibold text-text mb-3">
                  {audience.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-secondary py-20 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-text mb-6">
            Serious About Building?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Enter Founder OS.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-indigo-600 transition-all text-lg"
          >
            Start Building Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-text">Founder OS</h3>
              <p className="text-sm text-gray-400">Operating System for Serious Builders</p>
            </div>
            <div className="flex gap-6">
              <Link to="/login" className="text-gray-400 hover:text-text transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-text transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

