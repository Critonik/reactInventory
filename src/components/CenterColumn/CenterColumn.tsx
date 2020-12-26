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
                        data={storeData?.Gloves}
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
                        data={storeData?.BagsAndParachutes}
                    />
                    <BodyCell
                        data={storeData?.Shoes}
                    />
                    <BodyCell
                        data={storeData?.BodyArmors}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.gun}
                        extraClassName={'gun'}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.pistols}
                        extraClassName={'pistols'}
                    />
                    <BodyCell
                        data={storeData?.knife}
                        extraClassName={'knife'}
                    />
                    <BodyCell
                        data={storeData?.grenade}
                        extraClassName={'grenade'}
                    />
                </BodyRow>
            </div>
        </div>
    );
};

export default CenterColumn;