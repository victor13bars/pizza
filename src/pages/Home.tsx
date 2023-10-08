import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import Categories from "../componets/Categories";
import Sort, {sortList} from "../componets/Sort";
import Pizza from "../componets/PizzaBlock/Pizza";
import Skeleton from "../componets/PizzaBlock/Skeleton";
import Pagination from "../componets/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";

const Home = () => {

    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {items, status} = useSelector(selectPizzaData)
    const {currentPage, categoryId, sort, searchValue} = useSelector(selectFilter)
    const {sortProperty} = sort
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const order = sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortProperty.replace('-', '')
        const category = categoryId > 0 ? categoryId : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage,
        }))
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
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj) => <Link to={`/pizza/${obj.id}`}><Pizza{...obj}/><Link/>)

        const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

        return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
        );
        };

        export default Home;
