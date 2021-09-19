import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const root = document.createElement('div')
root.setAttribute('id', '3d-bubble-background')
document.body.appendChild(root)

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
)
