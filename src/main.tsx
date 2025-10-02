import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DayPicker from './components/DayPicker/DayPicker'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DayPicker/>
  </StrictMode>,
)
