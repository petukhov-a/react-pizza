import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { Categories, SortPopup } from '../components';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import { SearchContext } from '../App';

const Home = () => {
    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSortOrderAsc, setIsSortOrderAsc] = useState(true);

    const {sort, categoryId, currentPage} = useSelector(state => state.filter);

    const dispatch = useDispatch();

    const onChangePage = number => {
      dispatch(setCurrentPage(number));
    }

    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    }

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sort.sortProperty;
    const sortOrder = isSortOrderAsc ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    useEffect(() => {
        setIsLoading(true);

        axios
          .get(
            `https://64de3b97825d19d9bfb254c6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${sortOrder}${search}`,
          )
          .then((res) => {
            setItems(res.data);
            setIsLoading(false);
          });
        
        window.scrollTo(0, 0);
    }, [categoryId, sort, isSortOrderAsc, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items.map(pizza => <PizzaBlock {...pizza} key={pizza.id}/>);

    return (
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
          <SortPopup
            onChangeSortOrder={setIsSortOrderAsc}
            isSortOrderAsc={isSortOrderAsc}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    );
}

export default Home