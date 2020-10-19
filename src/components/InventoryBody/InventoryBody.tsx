import React  from 'react';
import { ICellData } from '../../interfaces/ICellData';
import InventoryCell from '../InventoryCell/InventoryCell';
import './InventoryBodyStyles.scss';

interface IInventoryBody {
    data: ICellData[];
    type: string;
}

export interface IPosition {
    x: number;
    y: number;
}

const InventoryBody: React.FC<IInventoryBody> = ({data, type}) => {

    return (
        <div className="inventory-scroll-wrapper">
            <div className={`inventory-scroll-wrapper-inv ${type}`}>
                {data.map((item, idx) =>
                    <InventoryCell
                        description={item.description}
                        state={item.state}
                        weight={item.weight}
                        createdDate={item.createdDate}
                        id={item.id}
                        item={item.item}
                        owner={item.owner}
                        ownerType={item.ownerType}
                        key={idx}
                        type={type}
                    />
                )}
            </div>
        </div>
    )
};

export default InventoryBody;