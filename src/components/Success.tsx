import React from 'react';

type SuccessType = {
    count: number
}

export const Success = ({count}: SuccessType) => {
    const plural = require('plural-ru')
    return (
        <div className="success-block">
            <img src="/assets/success.svg" alt="Success"/>
            <h3>Успешно!</h3>
            <p>Всем {plural(count, '%d пользователю', '%d пользователям', '%d пользователям')} отправлено приглашение.</p>
            <button onClick={() => window.location.reload()} className="send-invite-btn">Назад</button>
        </div>
    );
};
