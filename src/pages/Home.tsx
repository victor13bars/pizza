import React, {useEffect, useState} from 'react';

import Categories from "../componets/Categories";
import Sort from "../componets/Sort";
import Pizza from "../componets/PizzaBlock/Pizza";
import Skeleton from "../componets/PizzaBlock/Skeleton";

export interface SortType {
    name: string
    sortProperty: string
}

const Home = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState<SortType>({
        name: 'популярности',
        sortProperty: 'rating'
    })

    useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? categoryId : ''

        fetch(
            `https://64faf547cb9c00518f7a6c61.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0);
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId((i))}/>
                <Sort value={sortType} onChangeSort={(obj: SortType) => setSortType((obj))}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map(
                        ({id, title, price, imageUrl, sizes, types}) => (
                            <Pizza
                                key={id}
                                title={title}
                                price={price}
                                imageUrl={imageUrl}
                                sizes={sizes}
                                types={types}
                            />
                        ))}
            </div>
        </div>
    );
};

export default Home;
