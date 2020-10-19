import React from 'react';
import '../AboutModal/AboutModalStyles.scss';
import '../MoveItemModal/MoveItemModalStyles.scss';

interface IDropModal {
    name: string;
    callBack: () => void;
    closeAction: () => void;
}

const DropModal: React.FC<IDropModal> = ({callBack, name, closeAction}) => {

    const onFinish = () => {
        callBack();
        closeAction();
    }

    return (
        <div className='modal-back'>
            <div className={'range-modal-body range-enter-modal-body center-pos'}>
                <div className="range-body">
                    <h2 className="range-header">Выбросить <span>{name}</span></h2>
                    <p className="range-question">Вы действительно хотите выбросить данный предмет?</p>
                </div>
                <div className={'range-button-wrapper'}>
                    <button className={'range-btn green-btn'} onClick={onFinish}>
                        Подтвердить
                    </button>
                    <button onClick={closeAction} className={'range-btn red-btn'}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DropModal;