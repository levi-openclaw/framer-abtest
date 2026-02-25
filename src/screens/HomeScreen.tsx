import { ABTest } from '../App'

interface HomeScreenProps {
  tests: ABTest[]
  onCreate: () => void
  onViewTest: (test: ABTest) => void
}

const STATUS_COLORS: Record<string, string> = {
  running: '#22c55e',
  draft: '#a1a1aa',
  paused: '#f59e0b',
  completed: '#6366f1',
}

export function HomeScreen({ tests, onCreate, onViewTest }: HomeScreenProps) {
  const runningCount = tests.filter(t => t.status === 'running').length
  const totalVisitors = tests.reduce((sum, t) => sum + t.variants.reduce((s, v) => s + v.visitors, 0), 0)

  return (
    <>
      <header className="plugin-header">
        <div className="logo">
          <div className="logo-icon">🔀</div>
          <div className="logo-text">
            <h1>A/B Testing</h1>
            <p>Split test and optimize</p>
          </div>
        </div>
      </header>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{tests.length}</div>
          <div className="stat-label">Total Tests</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{runningCount}</div>
          <div className="stat-label">Running</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalVisitors.toLocaleString()}</div>
          <div className="stat-label">Visitors</div>
        </div>
      </div>

      <div className="tests-section">
        <div className="section-header">
          <h2>Your Tests</h2>
          <button className="btn btn-primary" onClick={onCreate}>+ New Test</button>
        </div>

        {tests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔀</div>
            <div className="empty-title">No Tests Yet</div>
            <div className="empty-desc">Create your first A/B test to start optimizing</div>
          </div>
        ) : (
          <div className="tests-list">
            {tests.map(test => {
              const totalConv = test.variants.reduce((s, v) => s + v.conversions, 0)
              const totalVis = test.variants.reduce((s, v) => s + v.visitors, 0)
              const convRate = totalVis > 0 ? ((totalConv / totalVis) * 100).toFixed(1) : '0'
              
              return (
                <div key={test.id} className="test-card" onClick={() => onViewTest(test)}>
                  <div className="test-header">
                    <span className="status-dot" style={{ background: STATUS_COLORS[test.status] }} />
                    <span className="test-name">{test.name}</span>
                    {test.winner && <span className="winner-badge">Winner: {test.winner}</span>}
                  </div>
                  <div className="test-stats">
                    <span>{test.variants.length} variants</span>
                    <span>{totalVis.toLocaleString()} visitors</span>
                    <span>{convRate}% conv. rate</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}