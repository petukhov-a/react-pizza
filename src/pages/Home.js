import React, { useContext, useEffect, useState } from 'react'
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { Categories, SortPopup } from '../components';
import { setCategoryId } from '../redux/slices/filterSlice';

import { SearchContext } from '../App';

const Home = () => {
    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSortOrderAsc, setIsSortOrderAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'    
    });

    const categoryId = useSelector((state) => state.filter.categoryId);
    const dispatch = useDispatch();

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.sortProperty;
    const sortOrder = isSortOrderAsc ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://64de3b97825d19d9bfb254c6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${sortOrder}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        
        window.scrollTo(0, 0);
    }, [categoryId, sortType, isSortOrderAsc, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items.map(pizza => <PizzaBlock {...pizza} key={pizza.id}/>);

    return (
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(index) => dispatch(setCategoryId(index))} />
          <SortPopup
            value={sortType}
            onChangeSort={setSortType}
            onChangeSortOrder={setIsSortOrderAsc}
            isSortOrderAsc={isSortOrderAsc}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination onChangePage={setCurrentPage} />
      </div>
    );
}

export default Home