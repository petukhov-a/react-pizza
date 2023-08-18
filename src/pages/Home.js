import React, { useEffect, useState } from 'react'
import { Categories, Button, SortPopup } from '../components';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    fetch('https://64de3b97825d19d9bfb254c6.mockapi.io/items')
        .then((res) => {
        return res.json();
        })
        .then((arr) => {
        setItems(arr);
        setIsLoading(false);
        });
    }, []);

    return (
    <div className="container">
        <div className="content__top">
        <Categories items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']} />
        <SortPopup items={['популярности', 'цене', 'алфавиту']} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
        {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
            : items.map(pizza => <PizzaBlock {...pizza}
                key={pizza.id}/>)
        }
        </div>
    </div>
    );
}

export default Home