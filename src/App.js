import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages';
import pizzas from './assets/pizzas.json';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
       <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home pizzas={pizzas} />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
