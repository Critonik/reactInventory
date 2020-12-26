import React, { useEffect, useState } from 'react';
import './InventoryWrapperStyles.scss';
import InventoryBody from '../InventoryBody/InventoryBody';
import { useStore } from '../../store/InventoryContext';
import { ICellData } from '../../interfaces/ICellData';
import WeightLine from '../WeightLine/WeightLine';
import { EAction } from '../../interfaces/EAction';

export enum EType {
    BAG = 'bag',
    INVENTORY = 'inv'
}

interface ICells {
    bag: ICellData[];
    inv: ICellData[]
}

const InventoryWrapper: React.FC = () => {
    const { store: { inventory: { inv, bag } }, createAction } = useStore();
    const [type, setType] = useState<EType>(EType.INVENTORY);
    const [cells, setCells] = useState<ICells>({
        inv: [],
        bag: []
    });

    useEffect(() => {
        prepareInventoryCells();
        refreshWeight();
    }, []); // eslint-disable-line

    useEffect(() => {
        prepareInventoryCells();
        refreshWeight();
    }, [type, inv.data.length, bag.data.length, inv.data, bag.data, bag, inv]); // eslint-disable-line


    const prepareInventoryCells = () => {
        const invCells = [...inv.data];
        while (invCells.length < inv.cellLimit) {
            invCells.push({} as ICellData);
        }
        const bagCells = [...bag.data];
        while (bagCells.length < bag.cellLimit) {
            bagCells.push({} as ICellData);
        }
        setCells({
            inv: invCells,
            bag: bagCells
        });
    };

    const refreshWeight = () => {
        let newWeight = 0;
        if (type === EType.INVENTORY && createAction) {
            inv.data.forEach((item) => {
                if (item.weight) {}
                newWeight = newWeight + item.weight
            });
            createAction({
                type: EAction.SET_INV_CURRENT_WEIGHT,
                data: String(newWeight)
            })
            return;
        }
        if (type === EType.BAG && createAction) {
            bag.data.forEach((item) => {
                if (item.weight) {}
                newWeight = newWeight + item.weight
            });
            createAction({
                type: EAction.SET_BAG_CURRENT_WEIGHT,
                data: String(newWeight)
            })
            return;
        }
    }

    return (
        <div className="inventory-body-wrapper">
            <div className="inventory-head-wrapper">
                <button
                    onClick={() => setType(EType.INVENTORY)}
                    className={`inventory-head-btn inventory-btn ${type === EType.INVENTORY && 'active-btn'}`}
                    disabled={inv.disabled}
                >
                    Инвентарь
                </button>
                <button
                    onClick={() => setType(EType.BAG)}
                    className={`inventory-head-btn bag-btn ${type === EType.BAG && 'active-btn'}`}
                    disabled={bag.disabled}
                >
                    Сумка
                </button>
            </div>
            {type === EType.BAG && <InventoryBody isDisabled={bag.disabled} data={cells.bag} type={EType.BAG}/>}
            {type === EType.INVENTORY &&
            <InventoryBody isDisabled={inv.disabled} data={cells.inv} type={EType.INVENTORY}/>}
            <WeightLine
                current={useStore().store.inventory[type].weight || 0}
                max={useStore().store.inventory[type].weightLimit || 10}
            />
        </div>
    );
};

export default InventoryWrapper;