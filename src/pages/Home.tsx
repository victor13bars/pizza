import React, {useEffect, useState} from 'react';

import Categories from "../componets/Categories";
import Sort from "../componets/Sort";
import Pizza from "../componets/PizzaBlock/Pizza";
import Skeleton from "../componets/PizzaBlock/Skeleton";

const Home = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://64faf547cb9c00518f7a6c61.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
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
