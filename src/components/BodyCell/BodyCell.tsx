import React, { useCallback, useState } from 'react';
import { IBodyCell } from '../../interfaces/IBodyCell';
import './BodyCellStyles.scss';
import ContextMenu from '../ContextMenu/ContextMenu';
import { IPosition } from '../InventoryBody/InventoryBody';
import { IMenuData } from '../../interfaces/IMenuItems';
import { EAction } from '../../interfaces/EAction';
import { useStore } from '../../store/InventoryContext';
import { ICellData } from '../../interfaces/ICellData';

interface ICell {
    data: IBodyCell;
}

const BodyCell: React.FC<ICell> = (props) => {
    const {id, item, state, weight, description, ownerType, owner, createdDate} = props.data;

    const ref = React.createRef<HTMLDivElement>();


    const [isOpen, setOpen] = useState<boolean>(false);
    const [position, setPos] = useState<IPosition>({x: 0, y: 0});

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


    const moveToAction = () => {
        const {createAction} = contextStore;
        if (createAction && props.data) {
            createAction({
                type: EAction.ADD_INV_ITEM,
                data: {...props.data as ICellData}
            });
            createAction({
                type: EAction.REMOVE_BODY_ITEM,
                data: {...props.data as ICellData}
            });
        }
    };

    const moveToBagAction = () => {
        const {createAction} = contextStore;
        if (createAction && props.data) {
            createAction({
                type: EAction.ADD_BAG_ITEM,
                data: {...props.data as ICellData}
            });
            createAction({
                type: EAction.REMOVE_BODY_ITEM,
                data: {...props.data as ICellData}
            });
        }
    };

    const dropAction = () => {
        const {createAction} = contextStore;
        if (createAction && props.data) {
            createAction({
                type: EAction.REMOVE_BODY_ITEM,
                data: {...props.data as ICellData}
            });
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

    const mouseMoveAction = (e: MouseEvent) => {
        const {current} = ref;
        if (current) {
            current.style.left = e.pageX + 'px';
            current.style.top = e.pageY + 'px';
        }
    }

    const onDrop = (e: MouseEvent) => {
        const {current} = ref;
        if (current && props.data) {
            current.style.position = 'static';
            const dropPlace = document.elementFromPoint(e.pageX, e.pageY);
            if (dropPlace?.closest('.inventory-cell')) {
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                current.classList.add('disable-class');
                document.removeEventListener('mousemove', mouseMoveAction);
                return;
            }
            const evnBody = dropPlace?.closest('.environment-body');
            if (evnBody) {
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                current.classList.add('disable-class');
                document.removeEventListener('mousemove', mouseMoveAction);
                return;
            }
        }
        document.removeEventListener('mousemove', mouseMoveAction);
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
        const target = ((e.target as HTMLElement).closest('.contain') as HTMLElement);
        const {current} = ref;
        if (target && current) {
            target.style.position = 'absolute';
            document.addEventListener('mousemove', mouseMoveAction);
            current.onmouseup = onDrop;
        }
    }

    const renderItem = () => {
        if (props.data.id) {
            return (
                <div
                    className="body-item contain"
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
                    style={{backgroundImage: `url("./inventory/${description}.svg")`}}
                />
            )
        }
        return null
    }

    return (
        <div
            className="body-item"
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
