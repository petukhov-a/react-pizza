import { FC, memo } from "react";

type CategoriesProps = {
    value: number;
    onChangeCategory: (i: number) => void;
}

export const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
    <div className="categories">
        <ul>
            {categories.map((categoryName, index) => (
                <li className={value === index ? 'active' : ''}
                            onClick={() => onChangeCategory(index)}
                            key={`${categoryName}_${index}`}>
                                {categoryName}</li>
            ))}
        </ul>
    </div>
    );
});