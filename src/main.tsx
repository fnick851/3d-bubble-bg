import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const root = document.createElement('div')
root.setAttribute('id', '3d-bubble-background')
root.style.position = 'fixed'
root.style.top = '0'
root.style.left = '0'
root.style.zIndex = '-1'
document.body.appendChild(root)

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
)
