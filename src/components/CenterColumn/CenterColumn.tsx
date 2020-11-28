import React from 'react';
import './CenterColumnStyles.scss';
import BodyRow from '../BodyRow/BodyRow';
import { useStore } from '../../store/InventoryContext';
import BodyCell from '../BodyCell/BodyCell';

const CenterColumn: React.FC = () => {

    const storeData = useStore().store?.body;

    return (
        <div className='center'>
            <div className="body-wrapper">
                <BodyRow>
                    <BodyCell
                        data={storeData?.Hats}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.Ears}
                    />
                    <BodyCell
                        data={storeData?.Masks}
                    />
                    <BodyCell
                        data={storeData?.Glasses}
                    />
                </BodyRow>
                <BodyRow/>
                <BodyRow>
                    <BodyCell
                        data={storeData?.Tops}
                    />
                    <BodyCell
                        data={storeData?.Accessories}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.gloves}
                    />
                    <BodyCell
                        data={storeData?.Bracelets}
                    />
                    <BodyCell
                        data={storeData?.Watches}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.Legs}
                    />
                </BodyRow>
                <BodyRow/>
                <BodyRow>
                    <BodyCell
                        data={storeData?.['Bags and Parachutes']}
                    />
                    <BodyCell
                        data={storeData?.Shoes}
                    />
                    <BodyCell
                        data={storeData?.['Body Armors']}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.gun}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.pistol}
                    />
                    <BodyCell
                        data={storeData?.knife}
                    />
                    <BodyCell
                        data={storeData?.grenade}
                    />
                </BodyRow>
            </div>
        </div>
    );
};

export default CenterColumn;