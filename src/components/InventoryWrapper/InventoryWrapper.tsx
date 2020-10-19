import React, { useEffect, useState } from 'react';
import './InventoryWrapperStyles.scss';
import InventoryBody from '../InventoryBody/InventoryBody';
import { useStore } from '../../store/InventoryContext';
import { ICellData } from '../../interfaces/ICellData';
import WeightLine from '../WeightLine/WeightLine';

export enum EType {
    BAG = 'bag',
    INVENTORY = 'inv'
}

interface ICells {
    bag: ICellData[];
    inv: ICellData[]
}

const InventoryWrapper: React.FC = () => {
    const store = useStore();
    const [type, setType] = useState<EType>(EType.INVENTORY);
    const [cells, setCells] = useState<ICells>({
        inv: [],
        bag: []
    });
    useEffect(() => {
        prepareInventoryCells();
    }, []); // eslint-disable-line

    useEffect(() => {
        prepareInventoryCells();
    }, [type, store.store.inventory.inv.data.length, store.store.inventory.bag.data.length]); // eslint-disable-line


    const prepareInventoryCells = () => {
        const {store: {inventory: {inv, bag}}} = store;
        const invCells = [...inv.data];
        while (invCells.length !== inv.cellLimit) {
            invCells.push({} as ICellData);
        }
        const bagCells = [...bag.data];
        while (bagCells.length !== bag.cellLimit) {
            bagCells.push({} as ICellData);
        }
        setCells({
            inv: invCells,
            bag: bagCells
        });
    };

    return (
        <div className="inventory-body-wrapper">
            <div className="inventory-head-wrapper">
                <button
                    onClick={() => setType(EType.INVENTORY)}
                    className={`inventory-head-btn inventory-btn ${type === EType.INVENTORY && 'active-btn'}`}
                >
                    Инвентарь
                </button>
                <button
                    onClick={() => setType(EType.BAG)}
                    className={`inventory-head-btn bag-btn ${type === EType.BAG && 'active-btn'}`}
                >
                    Рюкзак
                </button>
            </div>
            {type === EType.BAG && <InventoryBody data={cells.bag} type={EType.BAG}/>}
            {type === EType.INVENTORY && <InventoryBody data={cells.inv} type={EType.INVENTORY}/>}
            <WeightLine
                current={store.store.inventory[type].weight || 0}
                max={store.store.inventory[type].weightLimit || 10}
            />
        </div>
    );
};

export default InventoryWrapper;