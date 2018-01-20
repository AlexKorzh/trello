import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../Icon';

import './Badge.scss';

const Badge = props => {
    const { items, className, name } = props;

    return (
        <div className = "badge">
            <Icon
                name = { name }
                className = { className }
            />
            <div className = "badge__items">
                { items }
            </div>
        </div>
    );
}

Badge.propTypes = {
    items: PropTypes.number,
    name: PropTypes.string,
    className: PropTypes.string
};

export default Badge;
