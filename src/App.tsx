import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from './Colletion';
import axios from 'axios';
import {ICollection} from './types';

const cats = [
    {name: 'Все'},
    {name: 'Море'},
    {name: 'Горы'},
    {name: 'Архитектура'},
    {name: 'Города'},
]

function App() {
    const [categoryId, setCategoryId] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [searchValue, setSearchValue] = useState<string>('')
    const [collections, setCollections] = useState<ICollection[]>([])

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId ? `category=${categoryId}` : ''

        axios.get(`https://6300f0049a1035c7f8fb0942.mockapi.io/photos_collection?page=${page}&${category}`)
            .then(res => {
                setCollections(res.data[0].collections)
            })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении данных')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [categoryId,page])

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {
                        cats.map((c, i) =>
                            <li key={crypto.randomUUID()}
                                className={categoryId === i ? 'active' : ''}
                                onClick={() => setCategoryId(i)}
                            >
                                {c.name}
                            </li>)
                    }
                </ul>
                <input className="search-input"
                       value={searchValue}
                       onChange={e => setSearchValue(e.target.value)}
                       placeholder="Поиск по названию"/>
            </div>
            <div className="content">
                {isLoading ? (
                    <h2>Идет загрузка</h2>
                ) : (
                    collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((obj) => <Collection key={crypto.randomUUID()} name={obj.name} images={obj.photos}/>)
                )}
            </div>
            <ul className="pagination">
                {[...Array(5)].map((item, i) =>
                    <li key={crypto.randomUUID()}
                        className={page === i + 1 ? 'active' : ''}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </li>)}
            </ul>
        </div>
    );
}

export default App;