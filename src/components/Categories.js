import React, { useState } from 'react'

const Categories = ({items}) => {

    const [activeItem, setActiveItem] = useState(0);

    return (
    <div className="categories">
        <ul>
        <li onClick={() => setActiveItem(null)} className={activeItem === null ? 'active' : ''} >Все</li>
        {items 
            && items.map((item, index) => {
            return <li className={activeItem === index ? 'active' : ''}
                        onClick={() => setActiveItem(index)}
                        key={`${item}_${index}`}>
                            {item}</li>
        })}
        </ul>
    </div>
    );
}

export default Categories;