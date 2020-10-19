import React, { useState } from 'react';
import './LayoutStyles.scss';
import LeftColumn from '../LeftColumn/LeftColumn';
import CenterColumn from '../CenterColumn/CenterColumn';
import RightColumn from '../RightColumn/RightColumn';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { useStore } from '../../store/InventoryContext';
import { ICellData } from '../../interfaces/ICellData';
import { EAction } from '../../interfaces/EAction';

const Layout: React.FC = () => {

    const [errorModal, openError] = useState<boolean>(false);

    const { createAction } = useStore();

    // добавить дефолтный текст

    // eslint-disable-next-line
    const openErrorModal = () => {
        openError(true);
    }

    // eslint-disable-next-line
    const removeDisableClass = (id: string) => {
        const removedTarget = document.querySelector(`[data-id = "${id}"]`);
        if(removedTarget) {
            removedTarget.classList.remove('disable-class');
        }
    }

    // eslint-disable-next-line
    const addInventoryItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_INV_ITEM
            })
        }
    }

    // eslint-disable-next-line
    const removeInventoryItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_INV_ITEM
            })
        }
    }

    // eslint-disable-next-line
    const addBagItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_BAG_ITEM
            })
        }
    }

    // eslint-disable-next-line
    const removeBagItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_BAG_ITEM
            })
        }
    }

    // eslint-disable-next-line
    const addEnvUpItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_UP_ENV
            })
        }
    }

    // eslint-disable-next-line
    const removeEnvUpItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_UP_ENV
            })
        }
    }

    // eslint-disable-next-line
    const addEnvDownItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_DOWN_ENV
            })
        }
    }

    // eslint-disable-next-line
    const removeDownUpItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_DOWN_ENV
            })
        }
    }

    // eslint-disable-next-line
    const addBodyDownItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_BODY_ITEM
            })
        }
    }

    // eslint-disable-next-line
    const removeBodyDownItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_BODY_ITEM
            })
        }
    }


    return (
        <div className='main'>
            <LeftColumn/>
            <CenterColumn/>
            <RightColumn/>
            {
                errorModal &&
                <ErrorModal
                    text={'Невозможно выполнить действие'}
                    title={'Ошбика'}
                    closeAction={() => openError(false)}
                />
            }
        </div>
    );
};

export default Layout;