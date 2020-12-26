import React from 'react';
import './EnvironmentColStyles.scss';
import { ICellData } from '../../interfaces/ICellData';
import EnvironmentCell from './EnvironmentCell';

interface IEnvironmentCol {
    title: string;
    data: ICellData[];
    clName: string
}

const EnvironmentCol: React.FC<IEnvironmentCol> = ({title,data, clName}) => {

    return (
        <div className={`environment-body ${clName}`} >
            <h1 className="env-title">{title}</h1>
            <div className="evn-scroll-wrapper drop-place">
                {data.map((item, idx) => {
                    return (
                        <EnvironmentCell
                            description={item.description}
                            state={item.state}
                            weight={item.weight}
                            createdDate={item.createdDate}
                            id={item.id}
                            item={item.item}
                            owner={item.owner}
                            ownerType={item.ownerType}
                            key={String(item.description) + idx}
                            where={clName}
                            disabled={item.disabled}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default EnvironmentCol;