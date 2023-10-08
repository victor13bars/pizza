import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios/index";

const FullPizza = () => {

    const [pizza, setPizza] = useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizzza() {
            try {
                const {data} = axios.get('https://64faf547cb9c00518f7a6c61.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                navigate('/')
            }
        }

        fetchPizzza()
    }, [])

    if(!pizza){
        return 'Загрузка.......'
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
