import React, {useEffect, useState} from 'react';

import Categories from "../componets/Categories";
import Sort from "../componets/Sort";
import Pizza from "../componets/PizzaBlock/Pizza";
import Skeleton from "../componets/PizzaBlock/Skeleton";
import Pagination from "../componets/Pagination";

export interface PizzaType {
    id: number
    imageUrl: string
    title: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}

export interface HomeProps {
    searchValue: string
}

export interface SortType {
    name: string
    sortProperty: string
}

const Home = ({searchValue}: HomeProps) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [items, setItems] = useState<Array<PizzaType>>([])
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
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(
            `https://64faf547cb9c00518f7a6c61.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map(
        ({id, title, price, imageUrl, sizes, types}) => (
            <Pizza
                key={id}
                title={title}
                price={price}
                imageUrl={imageUrl}
                sizes={sizes}
                types={types}
            />
        ))

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId((i))}/>
                <Sort value={sortType} onChangeSort={(obj: SortType) => setSortType((obj))}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangPage={(value: number) => setCurrentPage(value)}/>
        </div>
    );
};

export default Home;
