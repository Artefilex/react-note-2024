import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from './pages/Home'
import ProductPage from './pages/products/ProductPage'
import ProductDetail from './pages/products/ProductDetail'
function App () {
  

  return (
  <Router>
   <Routes>
   <Route path='/' Component={Home} />
   <Route path='/products' Component={ProductPage} />
   <Route path='/products/:productId' Component={ProductDetail} />
   </Routes>
  </Router>
  )
}

export default App
