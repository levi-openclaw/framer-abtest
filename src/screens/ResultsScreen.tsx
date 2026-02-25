import { ABTest } from '../App'

interface ResultsScreenProps {
  test: ABTest
  onBack: () => void
}

export function ResultsScreen({ test, onBack }: ResultsScreenProps) {
  const controlRate = test.variants[0]?.visitors 
    ? ((test.variants[0].conversions / test.variants[0].visitors) * 100).toFixed(2) 
    : '0'
  const variantRate = test.variants[1]?.visitors 
    ? ((test.variants[1].conversions / test.variants[1].visitors) * 100).toFixed(2) 
    : '0'
  
  const lift = controlRate !== '0' && variantRate !== '0'
    ? (((parseFloat(variantRate) - parseFloat(controlRate)) / parseFloat(controlRate)) * 100).toFixed(1)
    : '0'

  return (
    <>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>{test.name}</h2>
        <span className="confidence-badge">{test.confidence}% confidence</span>
      </header>

      <div className="results-summary">
        <div className="summary-card">
          <div className="summary-label">Total Visitors</div>
          <div className="summary-value">
            {test.variants.reduce((s, v) => s + v.visitors, 0).toLocaleString()}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Conversions</div>
          <div className="summary-value">
            {test.variants.reduce((s, v) => s + v.conversions, 0).toLocaleString()}
          </div>
        </div>
        <div className="summary-card highlight">
          <div className="summary-label">Lift</div>
          <div className="summary-value">{lift}%</div>
        </div>
      </div>

      {test.confidence >= 95 && test.winner && (
        <div className="winner-announcement">
          🎉 Statistically significant! Winner: {test.winner}
        </div>
      )}

      <div className="results-table">
        <table>
          <thead>
            <tr>
              <th>Variant</th>
              <th>Visitors</th>
              <th>Conversions</th>
              <th>Conv. Rate</th>
              <th>vs Control</th>
            </tr>
          </thead>
          <tbody>
            {test.variants.map((variant, i) => {
              const rate = variant.visitors > 0 
                ? ((variant.conversions / variant.visitors) * 100).toFixed(2) 
                : '0'
              const vsControl = i > 0 && parseFloat(controlRate) > 0
                ? (((parseFloat(rate) - parseFloat(controlRate)) / parseFloat(controlRate)) * 100).toFixed(1)
                : '—'
              
              return (
                <tr key={variant.id} className={variant.id === test.winner ? 'winner-row' : ''}>
                  <td>
                    {variant.name}
                    {variant.id === test.winner && <span className="winner-tag">WINNER</span>}
                  </td>
                  <td>{variant.visitors.toLocaleString()}</td>
                  <td>{variant.conversions.toLocaleString()}</td>
                  <td>{rate}%</td>
                  <td className={parseFloat(vsControl) > 0 ? 'positive' : ''}>
                    {vsControl !== '—' ? (parseFloat(vsControl) > 0 ? '+' : '') + vsControl + '%' : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="action-footer">
        {test.status === 'running' && (
          <button className="btn">Pause Test</button>
        )}
        <button className="btn btn-primary">Export Results</button>
      </div>
    </>
  )
}