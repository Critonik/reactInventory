import React from 'react';
import { weightConverter } from '../../store/weightConverter';
import './WeightLineStyles.scss';

interface IWeightLine {
    max: number;
    current: number;
}

const WeightLine: React.FC<IWeightLine> = ({max, current}) => {

    const percent = Math.round(((current / 1000) * 100) / max);

    return (
        <div className="weight-line-wrapper">
            <div className="weight-line" style={{width: `${percent}%`}}>

            </div>
            <div className="weight-count-info">
                {weightConverter(current)} из {max} кг
            </div>
        </div>
    )
};

export default WeightLine;