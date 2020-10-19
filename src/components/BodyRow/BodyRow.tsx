import React from 'react';
import './BodyRowStyles.scss';

const BodyRow: React.FC = ({children}) => {
    return (
        <div className={'body-item-row'}>
            {children}
        </div>
    )
}

export default BodyRow;