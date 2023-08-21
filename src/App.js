import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart, NotFound } from './pages';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <div className="wrapper">
       <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home searchValue={searchValue}/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;