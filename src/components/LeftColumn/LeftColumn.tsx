import React from 'react';
import './LeftColumnStyles.scss';
import EnvironmentCol from '../EnvironmentCol/EnvironmentCol';
import { useStore } from '../../store/InventoryContext';

const LeftColumn: React.FC = () => {

    const store = useStore().store?.environment;

    const data = [store?.up, store?.down];

    return (
        <div className='left'>
            {data.map((item, idx) => {
                return (
                    <EnvironmentCol
                        title={item?.title || ''}
                        key={item?.title + idx}
                        data={item?.data || []}
                    />
                )
            })}
        </div>
    );
};

export default LeftColumn;