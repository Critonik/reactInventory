import React, { useCallback, useState } from 'react';
import { ICellData } from '../../interfaces/ICellData';
import { IPosition } from '../InventoryBody/InventoryBody';
import { useStore } from '../../store/InventoryContext';
import { IMenuData } from '../../interfaces/IMenuItems';
import ContextMenu from '../ContextMenu/ContextMenu';
import './EnvironmentColStyles.scss';
import { weightConverter } from '../../store/weightConverter';
import { names } from '../../store/ruNames';
import { EAction } from '../../interfaces/EAction';

interface IEnvironmentCell extends ICellData {
    where: string;
}

const EnvironmentCell: React.FC<IEnvironmentCell> = (props) => {
    const {
        state,
        weight,
        description,
        item,
        createdDate,
        id,
        owner,
        ownerType,
        where,
        disabled
    } = props;

    const ref = React.createRef<HTMLDivElement>();

    const imagePath = `./inventory/${description}.svg`;

    const [isOpen, setOpen] = useState<boolean>(false);
    const [position, setPos] = useState<IPosition>({ x: 0, y: 0 });

    const closeAction = () => setOpen(false);

    const contextStore = useStore();

    const disableItem = () => {
        const { createAction } = contextStore;
        if (createAction) {
            if (where === 'up') {
                createAction({
                    data: {
                        id,
                        disable: true
                    },
                    type: EAction.ADD_DISABLE_ENV_UP
                })
            }
            if (where === 'down') {
                createAction({
                    data: {
                        id,
                        disable: true
                    },
                    type: EAction.ADD_DISABLE_ENV_DOWN
                })
            }
        }
    }

    const mouseMoveAction = (e: MouseEvent) => {
        const { current } = ref;
        if (current) {
            current.style.left = e.pageX + 'px';
            current.style.top = e.pageY + 'px';
            current.classList.add('moved-env-class');
        }
    }

    const onDrop = (e: MouseEvent) => {
        const { current } = ref;
        if (current && props) {
            current.style.position = 'static';
            current.style.left = 'initial';
            current.style.top = 'initial';
            const dropPlace = document.elementFromPoint(e.pageX, e.pageY);
            if (dropPlace?.closest('.body-item')) {
                document.removeEventListener('mousemove', mouseMoveAction);
                current.classList.remove('moved-env-class');
                disableItem()
                // @ts-ignore
                invokeEvent('putItemOnBody', id) // eslint-disable-line
                return;
            }
            if (dropPlace?.closest('.inventory-cell')) {
                document.removeEventListener('mousemove', mouseMoveAction);
                current.classList.remove('moved-env-class');
                disableItem()
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
                current.classList.remove('moved-env-class');
                disableItem()
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
            document.removeEventListener('mousemove', mouseMoveAction);
            current?.classList.remove('disable-class');
            current.classList.remove('moved-env-class');
        }
    }

    const dragItem = (e: React.MouseEvent) => {
        if (e.button === 2) return;
        const target = ((e.target as HTMLElement).closest('.draggable-env-item') as HTMLElement);
        const { current } = ref;
        if (target && current) {
            target.style.position = 'absolute';
            document.addEventListener('mousemove', mouseMoveAction);
            current.onmouseup = onDrop;
        }
    }


    const openAction = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.closest('.draggable-env-item')) {
            setPos({
                x: e.pageX,
                y: e.pageY
            })
            setOpen(true);
        }
    }, [isOpen]); // eslint-disable-line


    const moveToAction = () => {
        const { current } = ref;
        if (props && current) {
            disableItem()
            // @ts-ignore
            invokeEvent('moveToInventory', id)
        }
    };

    const moveToBagAction = () => {
        const { current } = ref;
        if (props && current) {
            disableItem()
            // @ts-ignore
            invokeEvent('moveToBag', id)
        }
    };

    const dropAction = () => {
        const { current } = ref;
        if (props && current) {
            disableItem()
            // @ts-ignore
            invokeEvent('dropItem', id)
        }
    };


    const bodyItem: IMenuData[] = [
        {
            text: 'Выбросить',
            action: dropAction,
        }, {
            text: 'Переместить в инвентарь',
            action: moveToAction,
        }, {
            text: 'Переместить в сумку',
            action: moveToBagAction,
        }
    ];

    return (
        <div className="env-item-body">
            <div
                className={`draggable-env-item draggable ${disabled && 'disable-class'}`}
                data-item={item}
                data-state={state}
                data-weight={weight}
                data-desc={description}
                data-id={id}
                data-created-date={createdDate}
                data-owner={owner}
                data-owner-type={ownerType}
                onMouseDown={dragItem}
                onContextMenu={openAction}
                ref={ref}
            >
                <div className="item-inner-wrapper">
                    <img src={imagePath} className="item-icon" alt={`${description}`}/>
                    <div
                        className="item-name">{names.hasOwnProperty(description) ? names[description] : description}</div>
                </div>
                <div className="item-inner-wrapper">
                    {weight !== undefined ? <div className="item-count">{weightConverter(weight)}</div> : null}
                </div>
            </div>
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

export default EnvironmentCell;