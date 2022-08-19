import React, {useState} from 'react';
import './index.scss';

function App() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="App">
            <button className="open-modal-btn" onClick={() => setOpen(true)}>✨ Открыть окно</button>
            <Modal open={open} setOpen={setOpen}>
                <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"/>
            </Modal>
        </div>
    );
}

type ModalType = {
    open: boolean
    setOpen: (value: boolean) => void
    children: React.ReactNode
}

const Modal = ({open, setOpen, children}: ModalType) => {
    return (
        <div className={`overlay animated ${open ? 'show' : ''}`}>
            <div className="modal">
                <svg height="200" viewBox="0 0 200 200" width="200" onClick={() => setOpen(false)}>
                    <title/>
                    <path
                        d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
                </svg>
                {children}
            </div>
        </div>
    )
}

export default App;
