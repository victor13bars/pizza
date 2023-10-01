import React, {useEffect, useRef, useState} from 'react';
import qs from 'qs';
import Categories from "../componets/Categories";
import Sort, {sortList} from "../componets/Sort";
import Pizza from "../componets/PizzaBlock/Pizza";
import Skeleton from "../componets/PizzaBlock/Skeleton";
import Pagination from "../componets/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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

    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const sortProperty = useSelector<RootState, string>(state => state.filter.sort.sortProperty)
    const categoryId = useSelector<RootState, number>(state => state.filter.categoryId)
    const currentPage = useSelector<RootState, number>(state => state.filter.currentPage)
    const [items, setItems] = useState<Array<PizzaType>>([])
    const [isLoading, setIsLoading] = useState(true)
    const searchValue = ''
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const fetchPizzas = () => {
        setIsLoading(true)

        const order = sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortProperty.replace('-', '')
        const category = categoryId > 0 ? categoryId : ''
        // const search = searchValue ? `&search=${searchValue}` : ''
        const search = ''

        axios.get(`https://64faf547cb9c00518f7a6c61.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty,
                categoryId,
                currentPage
            })
            navigate(`${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortProperty, currentPage])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortProperty, searchValue, currentPage])

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
