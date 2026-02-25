import { useState } from 'react'
import { ABTest } from '../App'

interface TestEditorProps {
  test: ABTest
  onBack: () => void
}

export function TestEditor({ test, onBack }: TestEditorProps) {
  const [name, setName] = useState(test.name)
  const [status, setStatus] = useState(test.status)

  return (
    <>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Edit Test</h2>
      </header>

      <div className="editor-content">
        <div className="form-group">
          <label>Test Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as any)}>
            <option value="draft">Draft</option>
            <option value="running">Running</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Variants</label>
          <div className="variants-list">
            {test.variants.map((variant, i) => (
              <div key={variant.id} className="variant-row">
                <span>{variant.name}</span>
                <span>{variant.weight}%</span>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost">+ Add Variant</button>
        </div>

        <div className="form-group">
          <label>Goals</label>
          <div className="goals-list">
            {test.goals.map(goal => (
              <div key={goal.id} className="goal-row">
                <span>{goal.name}</span>
                <span className="goal-type">{goal.type}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost">+ Add Goal</button>
        </div>
      </div>

      <div className="action-footer">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </>
  )
}