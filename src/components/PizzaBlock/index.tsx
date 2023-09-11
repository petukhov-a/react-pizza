import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/cart/slice';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../../redux/cart/selectors';
import { CartItem } from '../../redux/cart/types';

type PizzaBlockProps = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
}

export const PizzaBlock: FC<PizzaBlockProps> = ( {id, title, imageUrl, price, sizes, types} ) => {
  const dispatch = useDispatch();
  const initialPizzaType = types[0] as number;
  const [activeType, setActiveType] = useState(initialPizzaType);
  const [activeSize, setActiveSize] = useState(0);

  const newId = id + price + sizes[activeSize];
  const cartItem = useSelector(selectCartItemById(newId));
  const selectedSize = sizes[activeSize];

  const typeNames = ['тонкое', 'традиционное'];
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAddButton = () => {
    const item: CartItem = {
      id: newId,
      title,
      imageUrl,
      price,
      size: selectedSize,
      type: typeNames[activeType],
      count: 0
    }
    dispatch(addCartItem(item));
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <Link to={`/pizza/${id}`}>
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}
                key={typeId}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
                key={index}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div className="button button--outline button--add" onClick={onClickAddButton}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
}