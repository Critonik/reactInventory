import React from 'react';
import './WeightLineStyles.scss';

interface IWeightLine {
    max: number;
    current: number;
}

const WeightLine: React.FC<IWeightLine> = ({max, current}) => {

    const percent = Math.round((current * 100) / max);

    return (
        <div className="weight-line-wrapper">
            <div className="weight-line" style={{width: `${percent}%`}}>

            </div>
            <div className="weight-count-info">
                {`${current} кг из ${max} кг`}
            </div>
        </div>
    )
};

export default WeightLine;