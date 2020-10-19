import React from 'react';
import './EnvironmentColStyles.scss';
import { ICellData } from '../../interfaces/ICellData';
import EnvironmentCell from './EnvironmentCell';

interface IEnvironmentCol {
    title: string;
    data: ICellData[];
}

const EnvironmentCol: React.FC<IEnvironmentCol> = ({title,data}) => {

    return (
        <div className={`environment-body ${title}`} >
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
                            key={item.description + idx}
                            where={title}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default EnvironmentCol;