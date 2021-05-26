import { useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Map, useMap } from './shared/map'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  * {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

function App() {
  const [map] = useMap()
  useEffect(() => {
    if (map) {
      map.on('click', (e) => {
        console.log(e.lngLat)
      })
    }
  }, [map])
  return (
    <>
      <GlobalStyle />

      <Map />
    </>
  )
}

export default App
