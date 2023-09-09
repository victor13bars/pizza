import React, {useState} from 'react';

const Categories = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    const onClickCategory = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={category}
                        className={activeIndex === index ? 'active' : ''}
                        onClick={() => onClickCategory(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
