import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import '../MoveItemModal/MoveItemModalStyles.scss';
import '../AboutModal/AboutModalStyles.scss';

interface ISplitModal {
    name: string;
    count: string;
    closeAction: () => void;
    callBack?: (value: string) => void;
}

const SplitModal: React.FC<ISplitModal> = ({closeAction, name, callBack, count}) => {

    const [value, setValue] = useState<string>('0');

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


    const onMouseDown = () => {
        document.addEventListener('mousemove', moveOut);
    }

    const onMouseUp = () => {
        document.removeEventListener('mousemove', moveOut);
    }

    const moveOut = useCallback((e: any) => {
        const target = e.target;
        const coords = target.getBoundingClientRect();
        const out = document.getElementById('#res');
        if (out) {
            const computeValue = (Number(target.value) / Number(count)) * 100;

            out.style.left = computeValue + '%';
            if ((e.pageX - coords.x - 3) >= coords.width) {
                out.style.left = '100%';
            }
            if ((e.pageX - coords.x - 3) <= 0) {
                out.style.left = '0%';
            }

            target.style.background = `linear-gradient(to right, #6FCF97 0%, #6FCF97 ${computeValue}%,
            rgba(79, 79, 79, 0.62) ${computeValue}%, rgba(79, 79, 79, 0.62) 100%)`;
        }
    },[]); // eslint-disable-line

    const setValueToField = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        const out = document.getElementById('#res') as HTMLInputElement;
        out.value = value;
        setValue(value);
    }

    const onFinish = () => {
        if (callBack) {
            callBack(value);
            closeAction();
        }
    }

    return (
        <div className='modal-back'>
            <div className={'range-modal-body range-enter-modal-body center-pos'}>
                <div className="range-body">
                    <h2 className="range-header">Разделить <span>{name}</span></h2>
                    <form
                        className={'range-input-wrapper'}
                        onInput={setValueToField}
                    >
                        <div className={'range-tip'}>Выберите количество</div>
                        <output
                            name={'res'}
                            className={'input-value'}
                            id={'#res'}
                            defaultValue={value}
                        />
                        <input
                            className={'input-range'}
                            type={'range'}
                            defaultValue={value}
                            name={'range'}
                            id={'#range'}
                            min={0}
                            max={count}
                            step={1}
                            onInput={moveOut}
                            onClick={moveOut}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                        />
                    </form>
                    <div className={'range-button-wrapper'}>
                        <button className={'range-btn green-btn'} disabled={!value || value === '0'} onClick={onFinish}>
                            Разделить
                        </button>
                        <button onClick={closeAction} className={'range-btn red-btn'}>
                            Отмена
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SplitModal;