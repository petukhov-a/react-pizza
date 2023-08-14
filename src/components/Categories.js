import React from 'react'

const Categories = ({items}) => {
  return (
    <div className="categories">
      <ul>
        <li className='active'>Все</li>
        {items.map((item, index) => {
            return <li key={`${item}_${index}`}>{item}</li>
        })}
      </ul>
    </div>
  );
}

export default Categories;