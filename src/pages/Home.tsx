import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';

import { Categories, SortPopup, PizzaBlock, Skeleton, Pagination } from '../components';

import { sortList } from '../components/SortPopup';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { FilterSliceState } from '../redux/filter/types';
import { selectPizzaData } from '../redux/pizza/selectors';

const Home: FC = () => {
    const [isSortOrderAsc, setIsSortOrderAsc] = useState(true);

    const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
    }

    const onChangeCategory = useCallback((idx: number) => {
      dispatch(setCategoryId(idx));
    }, []);

    const getPizzas = async () => {

      const category = categoryId > 0 ? `&category=${categoryId}` : '';
      const sortBy = sort.sortProperty;
      const sortOrder = isSortOrderAsc ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
        fetchPizzas({
          category,
          sortBy,
          sortOrder,
          search,
          currentPage,
        })
      );
    }

    useEffect(() => {
      if (isMounted.current) {
        const queryString = qs.stringify({
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage
        });
        
        navigate(`?${queryString}`);
      }
      isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    useEffect(() => {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        const sort = sortList.find(obj => obj.sortProperty === params.sortProperty) || sortList[0];

        const filter = {...params, sort} as FilterSliceState;

        dispatch(
          setFilters(filter)
        );

        isSearch.current = true;
      }
    }, []);

    useEffect(() => {
      window.scrollTo(0, 0);

      if (!isSearch.current) {
        getPizzas();
      }

      isSearch.current = false;

    }, [categoryId, sort, isSortOrderAsc, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items.map((pizza: any) => <PizzaBlock {...pizza} key={pizza.id}/>);

    return (
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <SortPopup
            onChangeSortOrder={setIsSortOrderAsc}
            isSortOrderAsc={isSortOrderAsc}
            sort={sort}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className='content__error-info'>
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить запрос позже</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    );
}

export default Home