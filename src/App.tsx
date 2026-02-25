import { useState } from 'react'
import { HomeScreen } from './screens/HomeScreen'
import { TestEditor } from './screens/TestEditor'
import { ResultsScreen } from './screens/ResultsScreen'

export type TestStatus = 'draft' | 'running' | 'paused' | 'completed'

export interface ABTest {
  id: string
  name: string
  status: TestStatus
  variants: { id: string; name: string; weight: number; visitors: number; conversions: number }[]
  goals: { id: string; name: string; type: 'click' | 'form' | 'pageview' | 'scroll' }[]
  confidence: number
  winner?: string
}

const MOCK_TESTS: ABTest[] = [
  {
    id: '1',
    name: 'Homepage Hero Test',
    status: 'running',
    variants: [
      { id: 'control', name: 'Control', weight: 50, visitors: 6200, conversions: 198 },
      { id: 'variant-a', name: 'Variant A', weight: 50, visitors: 6200, conversions: 254 },
    ],
    goals: [{ id: 'cta', name: 'CTA Click', type: 'click' }],
    confidence: 95,
    winner: 'variant-a',
  },
  {
    id: '2',
    name: 'Pricing Page Test',
    status: 'draft',
    variants: [
      { id: 'control', name: 'Control', weight: 50, visitors: 0, conversions: 0 },
      { id: 'variant-a', name: 'Variant A', weight: 50, visitors: 0, conversions: 0 },
    ],
    goals: [{ id: 'signup', name: 'Sign Up', type: 'form' }],
    confidence: 0,
  },
]

export function App() {
  const [tests, setTests] = useState<ABTest[]>(MOCK_TESTS)
  const [screen, setScreen] = useState<'home' | 'editor' | 'results'>('home')
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null)

  const createTest = () => {
    const newTest: ABTest = {
      id: String(Date.now()),
      name: 'New Test',
      status: 'draft',
      variants: [
        { id: 'control', name: 'Control', weight: 50, visitors: 0, conversions: 0 },
        { id: 'variant-a', name: 'Variant A', weight: 50, visitors: 0, conversions: 0 },
      ],
      goals: [{ id: 'click', name: 'Click Goal', type: 'click' }],
      confidence: 0,
    }
    setTests([...tests, newTest])
    setSelectedTest(newTest)
    setScreen('editor')
  }

  const viewTest = (test: ABTest) => {
    setSelectedTest(test)
    setScreen('results')
  }

  const goBack = () => {
    setSelectedTest(null)
    setScreen('home')
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <HomeScreen tests={tests} onCreate={createTest} onViewTest={viewTest} />
      )}
      {screen === 'editor' && selectedTest && (
        <TestEditor test={selectedTest} onBack={goBack} />
      )}
      {screen === 'results' && selectedTest && (
        <ResultsScreen test={selectedTest} onBack={goBack} />
      )}
    </div>
  )
}