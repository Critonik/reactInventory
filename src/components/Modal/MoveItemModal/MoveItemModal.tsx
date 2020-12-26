import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../AboutModal/AboutModalStyles.scss';
import './MoveItemModalStyles.scss';

interface IMoveItemModal {
    name: string;
    closeAction: () => void;
    callBack?: (playerId: string) => void;
}

const MoveItemModal: React.FC<IMoveItemModal> = ({closeAction, name, callBack}) => {
    // const [value, setValue] = useState<string>('0');
    const [step] = useState<number>(2);
    const [playerId, setPlayerId] = useState<string>('');

    const detectClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.range-modal-body')) {
            closeAction();
        }
    };

    useEffect(() => {
        document.addEventListener('click', detectClick);
        return () => {
            document.removeEventListener('click', detectClick);
        }
    }, []); // eslint-disable-line

    // const setValueToField = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const value = (e.target as HTMLInputElement).value;
    //     const out = document.getElementById('#res') as HTMLInputElement;
    //     out.value = value;
    //     setValue(value);
    // }

    // const onMouseDown = () => {
    //     document.addEventListener('mousemove', moveOut);
    // }
    //
    // const onMouseUp = () => {
    //     document.removeEventListener('mousemove', moveOut);
    // }

    // const moveOut = useCallback((e: any) => {
    //     const target = e.target;
    //     const coords = target.getBoundingClientRect();
    //     const out = document.getElementById('#res');
    //     if (out) {
    //         const computeValue = (Number(target.value) / Number(0)) * 100;
    //
    //         out.style.left = computeValue + '%';
    //         if ((e.pageX - coords.x - 3) >= coords.width) {
    //             out.style.left = '100%';
    //         }
    //         if ((e.pageX - coords.x - 3) <= 0) {
    //             out.style.left = '0%';
    //         }
    //
    //         target.style.background = `linear-gradient(to right, #6FCF97 0%, #6FCF97 ${computeValue}%,
    //         rgba(79, 79, 79, 0.62) ${computeValue}%, rgba(79, 79, 79, 0.62) 100%)`;
    //     }
    // },[]); // eslint-disable-line

    // const rangeBlock = () => {
    //     return (
    //         <div className={'range-modal-body center-pos'}>
    //             <div className="range-body">
    //                 <h2 className="range-header">Передача <span>{name}</span></h2>
    //                 <p className="range-question">Вы действительно хотите передать данный предмет?</p>
    //                 <form
    //                     className={'range-input-wrapper'}
    //                     onInput={setValueToField}
    //                 >
    //                     <div className={'range-tip'}>Выберите количество</div>
    //                     <output
    //                         name={'res'}
    //                         className={'input-value'}
    //                         id={'#res'}
    //                         defaultValue={value}
    //                     />
    //                     <input
    //                         className={'input-range'}
    //                         type={'range'}
    //                         defaultValue={value}
    //                         name={'range'}
    //                         id={'#range'}
    //                         min={0}
    //                         max={0}
    //                         step={1}
    //                         onInput={moveOut}
    //                         onClick={moveOut}
    //                         onMouseDown={onMouseDown}
    //                         onMouseUp={onMouseUp}
    //                     />
    //                 </form>
    //                 <div className={'range-button-wrapper'}>
    //                     <button className={'range-btn green-btn'} disabled={!value || value === '0'} onClick={() => setStep(2)}>
    //                         Передать
    //                     </button>
    //                     <button onClick={closeAction} className={'range-btn red-btn'}>
    //                         Отмена
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // };

    const onChange = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;
        if (value) {
            setPlayerId(value);
        }
    };

    const onFinish = (e: FormEvent) => {
        e.preventDefault();
        if (callBack) {
            callBack(playerId);
            closeAction();
        }
    }

    const enterIdBlock = () => {
        return (
            <div className={'range-modal-body range-enter-modal-body center-pos'}>
                <form
                    className="range-body"
                    onSubmit={onFinish}
                >
                    <h2 className="range-header normal-weight">Введите id игрока</h2>
                    <input
                        type={'text'}
                        defaultValue={playerId}
                        onChange={onChange}
                        className={'id-input'}
                        placeholder={'id игрока'}
                    />
                </form>
                <div className={'range-button-wrapper'}>
                    <button className={'range-btn green-btn'} onClick={onFinish}>
                        Подтвердить
                    </button>
                    <button onClick={closeAction} className={'range-btn red-btn'}>
                        Отмена
                    </button>
                </div>
            </div>
        );
    };



    return (
        <div className='modal-back'>
            {/*{step===1 && rangeBlock()}*/}
            {step===2 && enterIdBlock()}
        </div>
    )
};

export default MoveItemModal;