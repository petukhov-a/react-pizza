import React, { useEffect, useState } from 'react'
import { Categories, SortPopup } from '../components';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [isSortOrderAsc, setIsSortOrderAsc] = useState(true);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'    
    });

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty;
    const sortOrder = isSortOrderAsc ? 'asc' : 'desc';

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://64de3b97825d19d9bfb254c6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${sortOrder}`
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        
            window.scrollTo(0, 0);
    }, [categoryId, sortType, isSortOrderAsc]);

    return (
    <div className="container">
        <div className="content__top">
        <Categories value={categoryId}
                    onChangeCategory={setCategoryId} />
        <SortPopup value={sortType}
                   onChangeSort={setSortType}
                   onChangeSortOrder={setIsSortOrderAsc}
                   isSortOrderAsc={isSortOrderAsc} />
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