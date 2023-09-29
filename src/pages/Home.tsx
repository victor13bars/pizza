import React, {useEffect, useState} from 'react';

import Categories from "../componets/Categories";
import Sort from "../componets/Sort";
import Pizza from "../componets/PizzaBlock/Pizza";
import Skeleton from "../componets/PizzaBlock/Skeleton";
import Pagination from "../componets/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";
import axios from "axios";

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

const Home = () => {

    const sortType = useSelector<RootState, string>(state => state.filter.sort.sortProperty)
    const categoryId = useSelector<RootState, number>(state => state.filter.categoryId)
    const currentPage = useSelector<RootState,number>(state => state.filter.currentPage)
    const [items, setItems] = useState<Array<PizzaType>>([])
    const [isLoading, setIsLoading] = useState(true)
    const searchValue = ''
    const dispatch = useDispatch()
    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    useEffect(() => {
        setIsLoading(true)

        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? categoryId : ''
        // const search = searchValue ? `&search=${searchValue}` : ''
        const search = ''

        axios.get(`https://64faf547cb9c00518f7a6c61.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data)
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
                <Categories value={categoryId} onChangeCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangPage={onChangePage}/>
        </div>
    );
};

export default Home;
