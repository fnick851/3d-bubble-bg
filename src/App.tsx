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
  width: 100vw;
  height: 100vh;
}
`

export default App
