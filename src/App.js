import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages';
import pizzas from './assets/pizzas.json';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://64de3b97825d19d9bfb254c6.mockapi.io/items')
      .then(res => {
        return res.json();
      })
      .then(arr => {
        setItems(arr)
      })
    }, []);

  return (
    <div className="App">
      <div className="wrapper">
       <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home pizzas={items} />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
