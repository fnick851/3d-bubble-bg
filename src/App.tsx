import Scene from './Scene'
import { useCss } from 'kremling'

function App() {
  const cssScope = useCss(css)

  return (
    <div {...cssScope} className="App">
      <Scene />
    </div>
  )
}

const css = /*css*/ `
& .App {
  width: 100%;
  height: 100%;
}
`

export default App
