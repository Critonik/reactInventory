import React, { useCallback, useState } from 'react';
import { ICellData } from '../../interfaces/ICellData';
import { IPosition } from '../InventoryBody/InventoryBody';
import ContextMenu from '../ContextMenu/ContextMenu';
import { IMenuData } from '../../interfaces/IMenuItems';
import AboutModal from '../Modal/AboutModal/AboutModal';
import MoveItemModal from '../Modal/MoveItemModal/MoveItemModal';
import { EType } from '../InventoryWrapper/InventoryWrapper';
import { useStore } from '../../store/InventoryContext';
import DropModal from '../Modal/DropModal/DropModal';
import SplitModal from '../Modal/SplitModal/SplitModal';
import './InventoryCellStyles.scss';
import { IInventory } from '../../interfaces/IInventory';
import { weightConverter } from '../../store/weightConverter';
import { names } from '../../store/ruNames';
import { EAction } from '../../interfaces/EAction';


interface IModal {
    text?: string;
    title?: string;
    item?: string;
    weight?: number;
    state?: number;
    visible: boolean;
}


interface IInventoryCell extends ICellData {
    type: string;
}

const InventoryCell: React.FC<IInventoryCell> = (props) => {
    const { item, createdDate, owner, ownerType, description, weight, id, state, type, disabled } = props;

    const contextStore = useStore();

    const ref = React.createRef<HTMLDivElement>();

    const [isOpen, setOpen] = useState<boolean>(false);
    const [position, setPos] = useState<IPosition>({ x: 0, y: 0 });
    const [isModalOpen, setModalOpen] = useState<IModal>({ visible: false });
    const [isMoveModal, setMoveModal] = useState<IModal>({ visible: false });
    const [isDropModal, setDropModal] = useState<IModal>({ visible: false });
    const [isSplitModal, setSplitModal] = useState<IModal>({ visible: false });


    const disableItem = () => {
        const { createAction } = contextStore;
        if (createAction) {
            if (type === EType.INVENTORY) {
                createAction({
                    data: {
                        id,
                        disable: true
                    },
                    type: EAction.ADD_DISABLE_INV
                })
            }
            if (type === EType.BAG) {
                createAction({
                    data: {
                        id,
                        disable: true
                    },
                    type: EAction.ADD_DISABLE_BAG
                })
            }
        }
    }

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
        setModalOpen({
            visible: true,
            text: props.userDescription,
            weight,
            title: description,
            item: description,
            state
        });
    }, [isModalOpen, props]); // eslint-disable-line

    const openMoveModalAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (description) {
            setMoveModal({
                visible: true,
                title: description
            });
        }
    }, [isMoveModal, props]); // eslint-disable-line

    const openDropModalAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (description) {
            setDropModal({
                visible: true,
                title: description,
            });
        }
    }, [isDropModal, props]); // eslint-disable-line

    const openSplitModalAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (description && weight) {
            setSplitModal({
                visible: true,
                title: description,
                weight: weight
            });
        }
    }, [isSplitModal, props]); // eslint-disable-line

    const dropItemAction = () => {
        const { store: { inventory } } = contextStore;
        const { current } = ref;
        if (current) {
            if (type === EType.INVENTORY) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    disableItem()
                    // current.classList.add('disable-class');
                }
            }
            if (type === EType.BAG) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    disableItem();
                }
            }
            // @ts-ignore
            invokeEvent('dropItem', id) // eslint-disable-line
        }
    }

    const mouseMoveAction = (e: MouseEvent) => {
        const { current } = ref;
        if (current) {
            current.style.left = e.pageX + 'px';
            current.style.top = e.pageY + 'px';
            current.classList.add('moved-class');
        }
    }

    const onDrop = (e: MouseEvent) => {
        const { current } = ref;
        if (current && props) {
            current.style.position = 'static';
            const dropPlace = document.elementFromPoint(e.pageX, e.pageY);
            if (dropPlace?.closest('.body-item')) {
                document.removeEventListener('mousemove', mouseMoveAction);
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                disableItem()
                current.classList.remove('moved-class');
                // @ts-ignore
                invokeEvent('putItemOnBody', id) // eslint-disable-line
                return;
            }
            const evnBody = dropPlace?.closest('.environment-body');
            if (evnBody) {
                document.removeEventListener('mousemove', mouseMoveAction);
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                disableItem();
                current.classList.remove('moved-class');
                const checkUp = evnBody.classList.contains('up');
                if (checkUp) {
                    // @ts-ignore
                    invokeEvent('moveToUpEnv', id) // eslint-disable-line
                }
                const checkDown = evnBody.classList.contains('down');
                if (checkDown) {
                    // @ts-ignore
                    invokeEvent('moveToDownEnv', id) // eslint-disable-line
                }
                return;
            }
        }
        document.removeEventListener('mousemove', mouseMoveAction);
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        current?.classList.remove('disable-class');
        current?.classList.remove('moved-class');
    }

    const dragItem = (e: React.MouseEvent) => {
        if (e.button === 2) return;
        const target = ((e.target as HTMLElement).closest('.inv-draggable-item') as HTMLElement);
        const { current } = ref;
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
                <div className={`inv-draggable-item draggable ${disabled && 'disable-class'}`}
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
                     title={names.hasOwnProperty(description) ? names[description] : description}
                >
                    <h2 className="cell-head">
                        {names.hasOwnProperty(description) ? names[description] : description}
                    </h2>
                    <img className="cell-img" src={`./inventory/${description}.svg`} alt={description || ''}/>
                    <div className="cell-bottom">
                        <div className="cell-count">
                            {weight !== undefined ? `${weightConverter(weight)}` : ''}
                        </div>
                    </div>
                </div>
            )
        }
        return null;
    };

    const moveToInvAction = () => {
        const { store: { inventory } } = contextStore;
        const { current } = ref;
        if (current) {
            const findItem = inventory[type as keyof IInventory].data.find(item => item.id === id);
            if (findItem) {
                disableItem()
                // @ts-ignore
                invokeEvent('moveToInventory', id) // eslint-disable-line
            }
        }
    };

    const moveToBagAction = () => {
        const { store: { inventory } } = contextStore;
        const { current } = ref;
        if (current) {
            const findItem = inventory[type as keyof IInventory].data.find(item => item.id === id);
            if (findItem) {
                disableItem()
                // @ts-ignore
                invokeEvent('moveToBag', id) // eslint-disable-line
            }
        }
    };

    const useItem = () => {
        // @ts-ignore
        invokeEvent('useItem', id) // eslint-disable-line
    }


    const menuItemsForBag: IMenuData[] = [
        {
            text: 'Использовать',
            action: useItem,
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
        }
    ];

    const menuItemsForInv: IMenuData[] = [
        {
            text: 'Использовать',
            action: useItem,
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
        }
    ];

    const checkItems = type === EType.INVENTORY ? menuItemsForInv : menuItemsForBag;

    const moveItemAction = (playerId: string) => {
        const { store: { inventory } } = contextStore;
        const { current } = ref;
        if (current) {
            if (type === EType.INVENTORY) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    disableItem()
                }
            }
            if (type === EType.BAG) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    disableItem()
                }
            }
            // @ts-ignore
            invokeEvent('moveToPlayer', id, playerId) // eslint-disable-line
        }
    }

    const splitItemAction = (value: string) => {
        const { store: { inventory } } = contextStore;
        const { current } = ref;
        if (current) {
            if (type === EType.INVENTORY) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    disableItem();
                }
            }
            if (type === EType.BAG) {
                const findItem = inventory[type].data.find(item => item.id === id);
                if (findItem) {
                    disableItem();
                }
            }
            // @ts-ignore
            invokeEvent('splitItem', id, value) // eslint-disable-line
        }
    }

    return (
        <div className={`inventory-cell`}>
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
            {
                isModalOpen.visible &&
                <AboutModal
                    closeAction={() => setModalOpen({ visible: false })}
                    item={isModalOpen.item || ''}
                    title={isModalOpen.title || ''}
                    weight={isModalOpen.weight || 1}
                    state={isModalOpen.state || 1}
                    text={isModalOpen.text || ''}
                />}
            {
                isMoveModal.visible &&
                <MoveItemModal
                    closeAction={() => setMoveModal({ visible: false })}
                    name={isMoveModal.title || ''}
                    callBack={moveItemAction}
                />
            }
            {
                isDropModal.visible &&
                <DropModal
                    name={isDropModal.title || ''}
                    callBack={dropItemAction}
                    closeAction={() => setDropModal({ visible: false })}
                />
            }
            {
                isSplitModal.visible &&
                <SplitModal
                    name={isSplitModal.title || ''}
                    closeAction={() => setSplitModal({ visible: false })}
                    weight={isSplitModal.weight || 1}
                    callBack={splitItemAction}
                />
            }
        </div>
    );
};

export default InventoryCell;