import { createGlobalStyle } from 'styled-components'
import { AppMap } from './map/app-map'
import Div100vh from 'react-div-100vh'
import { Apply } from './features/apply/apply'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }
`
function App() {
  return (
    <>
      <GlobalStyle />

      <Div100vh>
        <AppMap />
        <Apply />
      </Div100vh>
    </>
  )
}

export default App
