import React, { useEffect } from 'react';
import './AboutModalStyles.scss';
import x from '../../../img/x.svg';

interface IAboutModal {
    title: string;
    text: string;
    weight: number;
    closeAction: () => void;
    item: string;
}

const AboutModal: React.FC<IAboutModal> = ({title, item, closeAction, weight, text}) => {

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
                        <img src={`./inventory/${item}.svg`} className="info-img" alt={title || 'item'}/>
                        <div className="info-right-col">
                            <div className="info-title">{title}</div>
                            <div className="info-desc">
                                {text}
                            </div>
                            <div className="weight-wrapper">
                                <div className="weight-title">Вес</div>
                                <div className="weight-line-wrapper">
                                    <div className="weight-line" style={{width: `${weight}%`}}/>
                                    <div className="weight-count-info">
                                        {weight} кг
                                    </div>
                                </div>
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

export default AboutModal;