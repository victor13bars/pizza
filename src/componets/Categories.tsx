import React, {useState} from 'react';

interface CategoriesProps {
    value: number
    onChangeCategory: (i: number) => void
}

const Categories = ({value, onChangeCategory}: CategoriesProps) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={category}
                        className={value === index ? 'active' : ''}
                        onClick={() => onChangeCategory(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
