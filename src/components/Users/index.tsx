import React, {ChangeEvent} from 'react';
import {Skeleton} from './Skeleton';
import {User} from './User';
import {UsersType} from '../../App';

type UsersPropsType = {
    items: UsersType[]
    isLoading: boolean
    searchValue: string
    invites: number[]
    onClickInvite: (id: number) => void
    setSearchValue: (e: ChangeEvent<HTMLInputElement>) => void
    setSuccess: (value: boolean) => void
}

export const Users = (props: UsersPropsType) => {
    const filteredUsers = props.items.filter(obj => {
        const fullName = obj.first_name + obj.last_name
        return (
            fullName.toLowerCase().includes(props.searchValue.toLowerCase()) ||
            obj.email.toLowerCase().includes(props.searchValue.toLowerCase())
        )
    })

    const onClickSendInvites = () => {
        props.setSuccess(true)
    }

    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                </svg>
                <input type="text"
                       value={props.searchValue}
                       onChange={props.setSearchValue}
                       placeholder="Найти пользователя..."
                />
            </div>
            {props.isLoading ? (
                <div className="skeleton-list">
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            ) : (
                <ul className="users-list">
                    {filteredUsers.map(user => <User key={crypto.randomUUID()}
                                                     user={user}
                                                     isInvited={props.invites.includes(user.id)}
                                                     onClickInvite={props.onClickInvite}
                    />)}
                </ul>
            )}
            {
                props.invites.length > 0 &&
                <button onClick={onClickSendInvites} className="send-invite-btn">Отправить приглашение</button>
            }
        </>
    );
};
