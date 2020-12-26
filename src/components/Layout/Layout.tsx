import React, { useCallback, useState } from 'react';
import LeftColumn from '../LeftColumn/LeftColumn';
import CenterColumn from '../CenterColumn/CenterColumn';
import RightColumn from '../RightColumn/RightColumn';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { IUserDescription, useStore } from '../../store/InventoryContext';
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
    window.addInventoryItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_INV_ITEM
            })
        }
    }

    // @ts-ignore
    window.removeInventoryItem = (data: string) => {
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
    window.removeBagItem = (data: string) => {
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
    }, [])

    // @ts-ignore
    window.removeEnvUpItem = (data: string) => {
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
    window.removeDownEnvItem = (data: string) => {
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
    window.addBodyCostume = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_BODY_COSTUME
            })
        }
    }

    // @ts-ignore
    window.removeBodyItem = (data: string) => {
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

    // @ts-ignore
    window.refreshDownEnvItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REFRESH_DOWN_ENV_ITEM
            })
        }
    }

    // @ts-ignore
    window.refreshUpEnvItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REFRESH_UP_ENV_ITEM
            })
        }
    }

    // @ts-ignore
    window.refreshBagItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REFRESH_BAG_ITEM
            })
        }
    }

    // @ts-ignore
    window.refreshInvItem = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REFRESH_INV_ITEM
            })
        }
    }

    // @ts-ignore
    window.addBodyWeapon = (data: ICellData) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_BODY_WEAPON
            })
        }
    }

    // @ts-ignore
    window.removeBodyWeapon = (data: string) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.REMOVE_BODY_WEAPON
            })
        }
    }

    // @ts-ignore
    window.addDescriptionToBag = (data: IUserDescription) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_ITEM_DESCRIPTION_BAG
            })
        }
    }

    // @ts-ignore
    window.addDescriptionToInv = (data: IUserDescription) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_ITEM_DESCRIPTION_INV
            })
        }
    }

    // @ts-ignore
    window.changeDisableStateInv = (data: IDisableItem) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_DISABLE_INV
            })
        }
    }

    // @ts-ignore
    window.changeDisableStateBag = (data: IDisableItem) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_DISABLE_BAG
            })
        }
    }

    // @ts-ignore
    window.changeDisableStateBody = (data: IDisableItem) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_DISABLE_BODY
            })
        }
    }

    // @ts-ignore
    window.changeDisableStateEnvUp = (data: IDisableItem) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_DISABLE_ENV_UP
            })
        }
    }

    // @ts-ignore
    window.changeDisableStateEnvDown = (data: IDisableItem) => {
        if (createAction) {
            createAction({
                data,
                type: EAction.ADD_DISABLE_ENV_DOWN
            })
        }
    }

    // @ts-ignore
    window.changeBagDisable = (type: boolean) => {
        if (createAction) {
            createAction({
                data: type,
                type: EAction.DISABLE_BAG
            })
        }
    }

    // @ts-ignore
    window.changeInvDisable = (type: boolean) => {
        if (createAction) {
            createAction({
                data: type,
                type: EAction.DISABLE_INV
            })
        }
    }

    // @ts-ignore
    window.setBagCellCount = (count: string) => {
        if (createAction) {
            createAction({
                data: count,
                type: EAction.SET_BAG_CELL_COUNT
            })
        }
    }

    // @ts-ignore
    window.setInvCellCount = (count: string) => {
        if (createAction) {
            createAction({
                data: count,
                type: EAction.SET_INV_CELL_COUNT
            })
        }
    }

    // @ts-ignore
    window.setBagWeightLimit = (count: string) => {
        if (createAction) {
            createAction({
                data: count,
                type: EAction.SET_BAG_WEIGHT_LIMIT
            })
        }
    }

    // @ts-ignore
    window.setInvWeightLimit = (count: string) => {
        if (createAction) {
            createAction({
                data: count,
                type: EAction.SET_INV_WEIGHT_LIMIT
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
                    closeAction={() => openError({ ...errorModal, visible: false })}
                />
            }
        </div>
    );
};

export default Layout;