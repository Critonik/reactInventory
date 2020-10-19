import React, { useCallback, useState } from 'react';
import './InventoryCellStyles.scss';
import { ICellData } from '../../interfaces/ICellData';
import { IPosition } from '../InventoryBody/InventoryBody';
import ContextMenu from '../ContextMenu/ContextMenu';
import { IMenuData } from '../../interfaces/IMenuItems';
import AboutModal from '../Modal/AboutModal/AboutModal';
import MoveItemModal from '../Modal/MoveItemModal/MoveItemModal';
import { EType } from '../InventoryWrapper/InventoryWrapper';
import { useStore } from '../../store/InventoryContext';
import { EAction } from '../../interfaces/EAction';
import DropModal from '../Modal/DropModal/DropModal';
import SplitModal from '../Modal/SplitModal/SplitModal';


interface IModal {
    text?: string;
    title?: string;
    item?: string;
    weight?: number;
    state?: string;
    visible: boolean;
}


interface IInventoryCell extends ICellData {
    type: string
}

const InventoryCell: React.FC<IInventoryCell> = (props) => {
    const {item, createdDate, owner, ownerType, description, weight, id, state, type} = props;

    const contextStore = useStore();

    const ref = React.createRef<HTMLDivElement>();

    const [isOpen, setOpen] = useState<boolean>(false);
    const [position, setPos] = useState<IPosition>({x: 0, y: 0});
    const [isModalOpen, setModalOpen] = useState<IModal>({visible: false});
    const [isMoveModal, setMoveModal] = useState<IModal>({visible: false});
    const [isDropModal, setDropModal] = useState<IModal>({visible: false});
    const [isSplitModal, setSplitModal] = useState<IModal>({visible: false});


    const closeAction = () => setOpen(false);
    const openAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.closest('.inv-draggable-item')) {
            setPos({
                x: e.pageX,
                y: e.pageY
            })
            setOpen(true);
        }
    }, [isOpen]); // eslint-disable-line

    const openInfoModalAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (description && weight) {
            setModalOpen({
                visible: true,
                text: description,
                weight,
                title: description,
                item: description
            });
        }
    }, [isModalOpen]); // eslint-disable-line

    const openMoveModalAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (description && state) {
            setMoveModal({
                visible: true,
                title: description,
                state: String(state),
            });
        }
    }, [isMoveModal]); // eslint-disable-line

    const openDropModalAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (description) {
            setDropModal({
                visible: true,
                title: description,
            });
        }
    }, [isDropModal]); // eslint-disable-line

    const openSplitModalAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (description && state) {
            setSplitModal({
                visible: true,
                title: description,
                state: String(state),
            });
        }
    }, [isSplitModal]); // eslint-disable-line

    const dropItemAction = () => {
        const {store: {inventory}, createAction} = contextStore;
        if (createAction) {
            if (type === EType.INVENTORY) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    createAction({
                        type: EAction.REMOVE_INV_ITEM,
                        data: {
                            state,
                            weight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    });
                    return;
                }
            }
            if (type === EType.BAG) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    createAction({
                        type: EAction.REMOVE_BAG_ITEM,
                        data: {
                            state,
                            weight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    });
                    return;
                }
            }
        }
    }


    const mouseMoveAction = (e: MouseEvent) => {
        const {current} = ref;
        if (current) {
            current.style.left = e.pageX + 'px';
            current.style.top = e.pageY + 'px';
            current.classList.add('moved-class');
        }
    }

    const onDrop = (e: MouseEvent) => {
        const {current} = ref;
        if (current && props) {
            current.style.position = 'static';
            const dropPlace = document.elementFromPoint(e.pageX, e.pageY);
            if (dropPlace?.closest('.body-item')) {
                document.removeEventListener('mousemove', mouseMoveAction);
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                current.classList.add('disable-class');
                current.classList.remove('moved-class');
                return;
            }
            const evnBody = dropPlace?.closest('.environment-body');
            if (evnBody) {
                document.removeEventListener('mousemove', mouseMoveAction);
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                current.classList.add('disable-class');
                current.classList.remove('moved-class');
                return;
            }
        }
        document.removeEventListener('mousemove', mouseMoveAction);
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        current?.classList.remove('disable-class');
        current?.classList.remove('moved-class');
    }

    const dragItem = (e: React.MouseEvent) => {
        const target = ((e.target as HTMLElement).closest('.inv-draggable-item') as HTMLElement);
        const {current} = ref;
        if (target && current) {
            target.style.position = 'absolute';
            document.addEventListener('mousemove', mouseMoveAction);
            current.onmouseup = onDrop;
        }
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLElement);
        if (target) {
            const dropCell = target.closest('.inv-draggable-item') as HTMLElement;
            if (dropCell) {
                dropCell.style.position = 'static';
                dropCell.style.left = 'initial';
                dropCell.style.top = 'initial';
            }
        }
    }

    const renderItem = () => {
        if (props.id) {
            return (
                <div className="inv-draggable-item draggable"
                     data-item={item}
                     data-state={state}
                     data-weight={weight}
                     data-desc={description}
                     data-id={id}
                     data-created-date={createdDate}
                     data-owner={owner}
                     data-owner-type={ownerType}
                     onContextMenu={openAction}
                     ref={ref}
                     onMouseDown={dragItem}
                     onClick={onClick}
                     onDoubleClick={onClick}
                >
                    <h2 className="cell-head">{description}</h2>
                    <img className="cell-img" src={`./inventory/${description}.svg`} alt={description}/>
                    <div className="cell-bottom">
                        <div className="cell-count">{state}шт</div>
                        <div className="cell-count">{weight ? `${weight}кг` : ''}</div>
                    </div>
                </div>
            )
        }
        return null;
    }

    const moveToInvAction = () => {
        const {store: {inventory}, createAction} = contextStore;

        if (createAction) {
            if (type === EType.INVENTORY) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    createAction({
                        type: EAction.ADD_BAG_ITEM,
                        data: {
                            state,
                            weight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    });
                    createAction({
                        type: EAction.REMOVE_INV_ITEM,
                        data: {
                            state,
                            weight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    });
                }
            }
        }
    };
    const moveToBagAction = () => {
        const {store: {inventory}, createAction} = contextStore;
        if (createAction) {
            if (type === EType.BAG) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    createAction({
                        type: EAction.ADD_INV_ITEM,
                        data: {
                            state,
                            weight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    });
                    createAction({
                        type: EAction.REMOVE_BAG_ITEM,
                        data: {
                            state,
                            weight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    });
                }
            }
        }
    };


    const menuItemsForBag: IMenuData[] = [
        {
            text: 'Использовать',
            action: () => null,
        }, {
            text: 'Передать',
            action: openMoveModalAction,
        }, {
            text: 'Выбросить',
            action: openDropModalAction,
        }, {
            text: 'Описание',
            action: openInfoModalAction,
        }, {
            text: 'Разделить',
            action: openSplitModalAction,
        }, {
            text: 'Переместить в инвентарь',
            action: moveToInvAction,
        }, {
            text: 'Информация',
            action: () => null,
        }
    ];

    const menuItemsForInv: IMenuData[] = [
        {
            text: 'Использовать',
            action: () => null,
        }, {
            text: 'Передать',
            action: openMoveModalAction,
        }, {
            text: 'Выбросить',
            action: openDropModalAction,
        }, {
            text: 'Описание',
            action: openInfoModalAction,
        }, {
            text: 'Разделить',
            action: openSplitModalAction,
        }, {
            text: 'Переместить в рюзкак',
            action: moveToBagAction,
        }, {
            text: 'Информация',
            action: () => null,
        }
    ];

    const checkItems = type === EType.INVENTORY ? menuItemsForInv : menuItemsForBag;

    const moveItemAction = (playerId: string, value: string) => {
        const {store: {inventory}, createAction} = contextStore;
        if (createAction) {
            if (type === EType.INVENTORY) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    // invokeEvent(playerId, value, id)
                    if (findItem.state === Number(value)) {
                        createAction({
                            type: EAction.REMOVE_INV_ITEM,
                            data: {
                                state,
                                weight,
                                description,
                                id,
                                createdDate,
                                item,
                                owner,
                                ownerType,
                                type,
                            }
                        });
                        return;
                    }
                    const newState = state - Number(value);
                    const newWeight = Math.round(weight - ((weight / state) * newState));
                    createAction({
                        type: EAction.CHANGE_INV_ITEM_STATE,
                        data: {
                            state: newState,
                            weight: newWeight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    });
                    return;
                }
            }
            if (type === EType.BAG) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    // invokeEvent(playerId, value, id)
                    if (findItem.state === Number(value)) {
                        createAction({
                            type: EAction.REMOVE_BAG_ITEM,
                            data: {
                                state,
                                weight,
                                description,
                                id,
                                createdDate,
                                item,
                                owner,
                                ownerType,
                                type,
                            }
                        });
                        return;
                    }
                    const newState = state - Number(value);
                    const newWeight = Math.round(weight - ((weight / state) * newState));
                    createAction({
                        type: EAction.CHANGE_INV_ITEM_STATE,
                        data: {
                            state: newState,
                            weight: newWeight,
                            description,
                            id,
                            createdDate,
                            item,
                            owner,
                            ownerType,
                            type,
                        }
                    })
                }
            }
        }
    }

    return (
        <div className="inventory-cell">
            {renderItem()}
            {isOpen
            && <ContextMenu
                items={checkItems}
                position={
                    {
                        x: position.x,
                        y: position.y
                    }
                }
                closeAction={closeAction}
            />
            }
            {isModalOpen.visible &&
            <AboutModal
                closeAction={() => setModalOpen({visible: false})}
                item={isModalOpen.item || ''}
                title={isModalOpen.title || ''}
                weight={isModalOpen.weight || 1}
                text={isModalOpen.text || ''}
            />}
            {
                isMoveModal.visible &&
                <MoveItemModal
                    closeAction={() => setMoveModal({visible: false})}
                    count={isMoveModal.state || ''}
                    name={isMoveModal.title || ''}
                    callBack={moveItemAction}
                />
            }
            {
                isDropModal.visible &&
                <DropModal
                    name={isDropModal.title || ''}
                    callBack={dropItemAction}
                    closeAction={() => setDropModal({visible: false})}
                />
            }
            {
                isSplitModal.visible &&
                <SplitModal
                    name={isSplitModal.title || ''}
                    closeAction={() => setSplitModal({visible: false})}
                    count={isSplitModal.state || ''}
                    callBack={() => null}
                />
            }
        </div>
    );
};

export default InventoryCell;