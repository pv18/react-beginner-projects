import React, {ChangeEvent, useEffect, useState} from 'react';
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
    const [invites, setInvites] = useState<number[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        setLoading(true)
        axios.get<ResponseType>('https://reqres.in/api/users')
            .then(res => {
                setUsers(res.data.data)
            })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении пользователей')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onClickInvite = (id: number) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites(prev => [...prev, id])
        }
    }

    return (
        <div className="App">
            {
                success
                    ? <Success count={invites.length}/>
                    : <Users items={users}
                             isLoading={loading}
                             searchValue={searchValue}
                             setSearchValue={changeSearchValue}
                             invites={invites}
                             onClickInvite={onClickInvite}
                             setSuccess={setSuccess}
                    />
            }
        </div>
    );
}

export default App;
