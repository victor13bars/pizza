import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {PizzaType} from "../redux/pizza/types";
import axios from "axios";

const FullPizza: FC = () => {

    const [pizza, setPizza] = useState<PizzaType>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://64faf547cb9c00518f7a6c61.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <>Загрузка.......</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <p>{pizza.price}</p>
        </div>
    );
};

export default FullPizza;
