import React from 'react';
import './InfoItem.scss';

const InfoItem = ({ name, value }) => {
    return (
        <li className="info-item">
            <span className="name">{name}:</span>
            <span className="value">{value}</span>
        </li>
    )
}

export default InfoItem;