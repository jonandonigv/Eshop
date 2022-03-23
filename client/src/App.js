import { Home } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import ProductList from "./pages/ProductList/ProductList";
import Register from "./pages/Register/Register";
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';

function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Navigate to={"register"}/>}/>
        <Route exact path='/register' element={!user ? <Register /> : <Navigate to={"/"}/>}/>
        <Route exact path='/login' element={!user ? <Login /> : <Navigate to={'/'} />}/>
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/success' element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
