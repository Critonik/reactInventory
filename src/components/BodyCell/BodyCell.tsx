import React, { useCallback, useState } from 'react';
import { IBodyCell } from '../../interfaces/IBodyCell';
import './BodyCellStyles.scss';
import ContextMenu from '../ContextMenu/ContextMenu';
import { IPosition } from '../InventoryBody/InventoryBody';
import { IMenuData } from '../../interfaces/IMenuItems';
import { useStore } from '../../store/InventoryContext';
import { EAction } from '../../interfaces/EAction';

interface ICell {
    data: IBodyCell;
    extraClassName?: string;
}

const BodyCell: React.FC<ICell> = (props) => {
    const { id, item, state, weight, description, ownerType, owner, createdDate, disabled } = props.data;

    const ref = React.createRef<HTMLDivElement>();


    const [isOpen, setOpen] = useState<boolean>(false);
    const [position, setPos] = useState<IPosition>({ x: 0, y: 0 });

    const closeAction = () => setOpen(false);

    const contextStore = useStore();

    const openAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.closest('.contain')) {
            setPos({
                x: e.pageX,
                y: e.pageY
            })
            setOpen(true);
        }
    }, [isOpen]); // eslint-disable-line

    const disableItem = () => {
        const { createAction } = contextStore;
        if (createAction) {
            createAction({
                data: {
                    id,
                    disable: true
                },
                type: EAction.ADD_DISABLE_BODY
            })
        }
    }


    const moveToInventoryAction = () => {
        const { current } = ref;
        if (props && current) {
            disableItem();
            // @ts-ignore
            invokeEvent('moveToInventory', id) // eslint-disable-line
        }
    };

    const moveToBagAction = () => {
        const { current } = ref;
        if (props && current) {
            disableItem();
            // @ts-ignore
            invokeEvent('moveToBag', id) // eslint-disable-line
        }
    };

    const dropAction = () => {
        const { current } = ref;
        if (props && current) {
            disableItem();
            // @ts-ignore
            invokeEvent('dropItem', id) // eslint-disable-line
        }
    };

    const bodyItem: IMenuData[] = [
        {
            text: 'Выбросить',
            action: dropAction,
        }, {
            text: 'Переместить в инвентарь',
            action: moveToInventoryAction,
        }, {
            text: 'Переместить в сумку',
            action: moveToBagAction,
        }
    ];

    const mouseMoveAction = (e: MouseEvent) => {
        const { current } = ref;
        if (current) {
            current.style.left = e.pageX + 'px';
            current.style.top = e.pageY + 'px';
        }
    }

    const onDrop = (e: MouseEvent) => {
        const { current } = ref;
        e.stopPropagation();
        if (current && props.data) {
            current.style.position = 'static';
            const dropPlace = document.elementFromPoint(e.pageX, e.pageY);
            if (dropPlace?.closest('.inventory-cell')) {
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                disableItem();
                document.removeEventListener('mousemove', mouseMoveAction);
                document.removeEventListener('mouseup', onDrop);
                if (dropPlace.closest('.inv')) {
                    // @ts-ignore
                    invokeEvent('moveToInventory', id) // eslint-disable-line
                }

                if (dropPlace.closest('.bag')) {
                    // @ts-ignore
                    invokeEvent('moveToBag', id) // eslint-disable-line
                }
                return;
            }
            const evnBody = dropPlace?.closest('.environment-body');
            if (evnBody) {
                document.removeEventListener('mousemove', mouseMoveAction);
                document.removeEventListener('mouseup', onDrop);
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                disableItem()
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
        document.removeEventListener('mouseup', onDrop);
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        current?.classList.remove('disable-class');
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLElement);
        if (target) {
            const dropCell = target.closest('.contain') as HTMLElement;
            if (dropCell) {
                dropCell.style.position = 'static';
                dropCell.style.left = 'initial';
                dropCell.style.top = 'initial';
            }
        }
    }

    const dragItem = (e: React.MouseEvent) => {
        if (e.button === 2) return;
        e.stopPropagation();
        const target = ((e.target as HTMLElement).closest('.contain') as HTMLElement);
        const { current } = ref;
        if (target && current) {
            target.style.position = 'absolute';
            document.addEventListener('mousemove', mouseMoveAction);
            document.addEventListener('mouseup', onDrop);
        }
    }

    const renderItem = () => {
        if (props.data.id) {
            return (
                <div
                    className={`body-item contain ${disabled && 'disable-class'}`}
                    data-image={description}
                    data-item={item}
                    data-state={state}
                    data-weight={weight}
                    data-desc={description}
                    data-id={id}
                    data-created-date={createdDate}
                    data-owner={owner}
                    data-owner-type={ownerType}
                    onContextMenu={openAction}
                    onMouseDown={dragItem}
                    onClick={onClick}
                    onDoubleClick={onClick}
                    ref={ref}
                    style={{ backgroundImage: `url("./inventory/${description}.svg")` }}
                />
            )
        }
        return null
    }

    return (
        <div
            className={`body-item ${props.extraClassName}`}
            data-image={description}
            data-item={item}
            data-state={state}
            data-weight={weight}
            data-desc={description}
            data-id={id}
            data-created-date={createdDate}
            data-owner={owner}
            data-owner-type={ownerType}
        >
            {renderItem()}
            {isOpen
            && <ContextMenu
                items={bodyItem}
                position={
                    {
                        x: position.x,
                        y: position.y
                    }
                }
                closeAction={closeAction}
            />
            }
        </div>
    )
};

export default BodyCell;
