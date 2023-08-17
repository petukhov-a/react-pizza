import React from 'react'
import { Categories, Button, SortPopup } from '../components';
import PizzaBlock from '../components/PizzaBlock';

const Home = ({pizzas}) => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']} />
        <SortPopup items={['популярности', 'цене', 'алфавиту']} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map(pizza => <PizzaBlock {...pizza}
                                         key={pizza.id}/>)}
      </div>
    </div>
  );
}

export default Home