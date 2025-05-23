import { Router, Route } from 'electron-router-dom'

import { Home } from './pages/Home'
import { Create } from './pages/Create'
import { Detail } from './pages/Detail'
import { About } from './pages/About'
import { Layout } from './components/Layout'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/customer/:id" element={<Detail />} />
        </Route>
      }
    />
  )
}
