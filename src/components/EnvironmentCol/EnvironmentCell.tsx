import React, { useCallback, useState } from 'react';
import { ICellData } from '../../interfaces/ICellData';
import { IPosition } from '../InventoryBody/InventoryBody';
import { useStore } from '../../store/InventoryContext';
import { EAction } from '../../interfaces/EAction';
import { IMenuData } from '../../interfaces/IMenuItems';
import ContextMenu from '../ContextMenu/ContextMenu';
import './EnvironmentColStyles.scss';

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
        where
    } = props;

    const ref = React.createRef<HTMLDivElement>();

    const imagePath = `./inventory/${description}.svg`;

    const [isOpen, setOpen] = useState<boolean>(false);
    const [position, setPos] = useState<IPosition>({x: 0, y: 0});

    const closeAction = () => setOpen(false);

    const contextStore = useStore();

    const mouseMoveAction = (e: MouseEvent) => {
        const {current} = ref;
        if (current) {
            current.style.left = e.pageX + 'px';
            current.style.top = e.pageY + 'px';
            current.classList.add('moved-env-class');
        }
    }

    const onDrop = (e: MouseEvent) => {
        const {current} = ref;
        if (current && props) {
            current.style.position = 'static';
            current.style.left = 'initial';
            current.style.top = 'initial';
            const dropPlace = document.elementFromPoint(e.pageX, e.pageY);
            if (dropPlace?.closest('.body-item')) {
                document.removeEventListener('mousemove', mouseMoveAction);
                current.classList.remove('moved-env-class');
                current.classList.add('disable-class');
                return;
            }
            if (dropPlace?.closest('.inventory-cell')) {
                document.removeEventListener('mousemove', mouseMoveAction);
                current.classList.remove('moved-env-class');
                current.classList.add('disable-class');
                return;
            }
            if (dropPlace?.closest('.drop-place')) {
                document.removeEventListener('mousemove', mouseMoveAction);
                current.classList.remove('moved-env-class');
                current.classList.add('disable-class');
                return;
            }
            document.removeEventListener('mousemove', mouseMoveAction);
            current?.classList.remove('disable-class');
            current.classList.remove('moved-env-class');
        }
    }

    const dragItem = (e: React.MouseEvent) => {
        const target = ((e.target as HTMLElement).closest('.draggable-env-item') as HTMLElement);
        const {current} = ref;
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
        const {createAction, store: {environment: {down, up}}} = contextStore;
        if (createAction && props) {
            createAction({
                type: EAction.ADD_INV_ITEM,
                data: {...props as ICellData}
            });
            if (where === down.title) {
                createAction({
                    type: EAction.REMOVE_DOWN_ENV,
                    data: {...props as ICellData}
                });
            }
            if (where === up.title) {
                createAction({
                    type: EAction.REMOVE_UP_ENV,
                    data: {...props as ICellData}
                });
            }
        }
    };

    const moveToBagAction = () => {
        const {createAction, store: {environment: {down, up}}} = contextStore;
        if (createAction && props) {
            createAction({
                type: EAction.ADD_BAG_ITEM,
                data: {...props as ICellData}
            });
            if (where === down.title) {
                createAction({
                    type: EAction.REMOVE_DOWN_ENV,
                    data: {...props as ICellData}
                });
            }
            if (where === up.title) {
                createAction({
                    type: EAction.REMOVE_UP_ENV,
                    data: {...props as ICellData}
                });
            }
        }
    };

    const dropAction = () => {
        const {createAction, store: {environment: {down, up}}} = contextStore;
        if (createAction && props) {
            if (where === down.title) {
                createAction({
                    type: EAction.REMOVE_DOWN_ENV,
                    data: {...props as ICellData}
                });
            }
            if (where === up.title) {
                createAction({
                    type: EAction.REMOVE_UP_ENV,
                    data: {...props as ICellData}
                });
            }
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
            text: 'Переместить в рюкзак',
            action: moveToBagAction,
        }
    ];


    return (
        <div className="env-item-body">
            <div
                className="draggable-env-item draggable"
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
                ref={ref}
            >
                <div className="item-inner-wrapper">
                    <img src={imagePath} className="item-icon" alt={`${description}`}/>
                    <div className="item-name">{description}</div>
                </div>
                <div className="item-inner-wrapper">
                    {state ? <div className="item-count">{state} шт</div> : null}
                    {weight ? <div className="item-count">{weight} кг</div> : null}
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