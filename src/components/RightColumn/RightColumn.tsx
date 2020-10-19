import React  from 'react';
import './RightColumnStyles.scss';
import InventoryWrapper from '../InventoryWrapper/InventoryWrapper';


const RightColumn: React.FC = () => {

    return (
        <div className='right'>
            <InventoryWrapper/>
        </div>
    );
};

export default RightColumn;