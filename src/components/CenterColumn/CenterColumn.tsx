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
                        data={storeData.hat}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.earrings}
                    />
                    <BodyCell
                        data={storeData?.mask}
                    />
                    <BodyCell
                        data={storeData?.glasses}
                    />
                </BodyRow>
                <BodyRow/>
                <BodyRow>
                    <BodyCell
                        data={storeData?.jacket}
                    />
                    <BodyCell
                        data={storeData.tie}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.gloves}
                    />
                    <BodyCell
                        data={storeData?.bracelet}
                    />
                    <BodyCell
                        data={storeData?.watch}
                    />
                </BodyRow>
                <BodyRow>
                    <BodyCell
                        data={storeData?.pants}
                    />
                </BodyRow>
                <BodyRow/>
                <BodyRow>
                    <BodyCell
                        data={storeData?.parachute}
                    />
                    <BodyCell
                        data={storeData?.shoes}
                    />
                    <BodyCell
                        data={storeData?.policeman}
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