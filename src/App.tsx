import { useContext, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Map, MapContext } from './shared/map'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  * {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

function App() {
  const [map] = useContext(MapContext)

  useEffect(() => {
    if (map)
      map.on('click', (e) => {
        console.log(e.latlng)
      })
  }, [map])

  return (
    <>
      <GlobalStyle />

      <Map />
    </>
  )
}

export default App
