import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const {id} = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
        try {
            const { data } = await axios.get(`https://64de3b97825d19d9bfb254c6.mockapi.io/items/${id}`);
            setPizza(data);
        } catch (error) {
            alert('Ошибка при получении пиццы');
            navigate('/');
        }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка ...';
  }

  return (
    <div className='container'>
        <img src={pizza.imageUrl}/>
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizza