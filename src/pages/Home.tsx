import React, {FC, useCallback, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../redux/store';
import {selectFilter} from '../redux/filter/selectors';
import {selectPizzaData} from '../redux/pizza/selectors';
import {setCategoryId, setCurrentPage} from '../redux/filter/slice';
import {fetchPizzas} from '../redux/pizza/asyncActions';
import PizzaBlock from "../componets/PizzaBlock/PizzaBlock";
import Pagination from "../componets/Pagination";
import Sort from "../componets/Sort";
import Categories from "../componets/Categories";
import Skeleton from "../componets/PizzaBlock/Skeleton";
import {PizzaType, Status} from "../redux/pizza/types";

const Home: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {items, status} = useSelector(selectPizzaData);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? String(categoryId) : '';
        const search = searchValue;

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);


    const pizzas = items.map((obj:PizzaType) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort sort={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === Status.ERROR ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === Status.LOADING ? skeletons : pizzas}
                </div>
            )}

            {status === Status.SUCCESS && <Pagination currentPage={currentPage} onChangePage={onChangePage}/>}
        </div>
    );
};

export default Home;
