import React, { useEffect } from 'react';
import '../AboutModal/AboutModalStyles.scss';
import x from '../../../img/x.svg';

interface IErrorModal {
    title: string;
    text: string;
    closeAction: () => void;
}


const ErrorModal: React.FC<IErrorModal> = ({closeAction, title, text}) => {

    const detectClick = (e: MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (!target.closest('.modal-menu-body')) {
            closeAction();
        }
    };

    useEffect(() => {
        document.addEventListener('click', detectClick);
        return () => {
            document.removeEventListener('click', detectClick);
        }
    }, []); // eslint-disable-line

    return (
        <div className={'modal-back'}>
            <div className={'modal-menu-body center-pos'}>
                <div className="info-modal-body">
                    <div className="info-inner-wrapper">
                        <div className="info-right-col">
                            <div className="info-title">{title}</div>
                            <div className="info-desc">
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
                <button className={'modal-close-button'} onClick={closeAction}>
                    <img src={x} className="info-cross" alt={'close'}/>
                    <span className="close-info-text">
                        Закрыть
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;