import React, {useEffect, useState} from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from './components/Users';
import axios, {AxiosResponse} from 'axios';

// Тут список пользователей: https://reqres.in/api/users

export interface UsersType {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface Support {
    url: string;
    text: string;
}

export interface ResponseType {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UsersType[];
    support: Support;
}


function App() {
    const [users, setUsers] = useState<UsersType[]>([])

    useEffect(() => {
        axios.get<ResponseType>('https://reqres.in/api/users')
            .then(res => {
                setUsers(res.data.data)
            })
    }, [])

    return (
        <div className="App">
            <Users items={users} isLoading={false}/>
            {/*<Success/>*/}
        </div>
    );
}

export default App;
