import React, { useCallback, useState } from 'react';
import LeftColumn from '../LeftColumn/LeftColumn';
import CenterColumn from '../CenterColumn/CenterColumn';
import RightColumn from '../RightColumn/RightColumn';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { useStore } from '../../store/InventoryContext';
import { ICellData } from '../../interfaces/ICellData';
import { EAction } from '../../interfaces/EAction';
import './LayoutStyles.scss';

interface IErrorModal {
    visible: boolean;
    text: string;
}

const initErrorState: IErrorModal = {
    text: 'Невозможно выполнить действие',
    visible: false
}

const Layout: React.FC = () => {

    const [errorModal, openError] = useState<IErrorModal>(initErrorState);

    const { createAction } = useStore();

    // @ts-ignore
    window.openErrorModal = (text = 'Невозможно выполнить действие') => {
        openError({
            visible: true,
            text: text
        });
    }

    // @ts-ignore
    window.removeDisableClass = (id: string) => {
        const removedTarget = document.querySelector(`[data-id = "${id}"]`);
        if(removedTarget) {
            removedTarget.classList.remove('disable-class');
        }
    }

    // @ts-ignore
    window.addInventoryItem = useCallback((data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_INV_ITEM
            })
        }
    }, []);

    // @ts-ignore
    window.removeInventoryItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_INV_ITEM
            })
        }
    }

    /// @ts-ignore
    window.addBagItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_BAG_ITEM
            })
        }
    }

    // @ts-ignore
    window.removeBagItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_BAG_ITEM
            })
        }
    }

    // @ts-ignore
    window.addEnvUpItem = useCallback((data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_UP_ENV
            })
        }
    },[])

    // @ts-ignore
    window.removeEnvUpItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_UP_ENV
            })
        }
    }

    // @ts-ignore
    window.addEnvDownItem = useCallback((data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_DOWN_ENV
            })
        }
    }, [])

    // @ts-ignore
    window.removeDownEnvItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_DOWN_ENV
            })
        }
    }

    // @ts-ignore
    window.addBodyItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_BODY_ITEM
            })
        }
    }

    // @ts-ignore
    window.removeBodyItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_BODY_ITEM
            })
        }
    }
    // @ts-ignore
    window.setUpEnvName = (text: string) => {
        if (createAction) {
            createAction({
                data: text,
                type: EAction.SET_UP_ENV_NAME
            })
        }
    }

    // @ts-ignore
    window.setDownEnvName = (text: string) => {
        if (createAction) {
            createAction({
                data: text,
                type: EAction.SET_DOWN_ENV_NAME
            })
        }
    }


    return (
        <div className='main'>
            <LeftColumn/>
            <CenterColumn/>
            <RightColumn/>
            {
                errorModal.visible &&
                <ErrorModal
                    text={errorModal.text}
                    title={'Ошибка'}
                    closeAction={() => openError({...errorModal, visible: false})}
                />
            }
        </div>
    );
};

export default Layout;