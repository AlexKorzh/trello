import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../Icon';

import './Badges.scss';

const Badges = props => {
    const { items } = props;

    return (
        <div className="badges">
            <Icon
                name='attachment'
                className='attachment-icon__card'
            />
            <div className="badges__items">
                { items }
            </div>
        </div>
    );
}

Badges.propTypes = {
    items: PropTypes.number
};

export default Badges;
