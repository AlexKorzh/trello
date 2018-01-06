/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import './icon.scss';

const Icon = props => {
    const { name, className, role, onClick } = props;

    return (
        <i
            className={ `material-icons icon-${name} ${className}` }
            role={role || 'icon'}
            onClick={ onClick || null }
        >
            { name }
        </i>
    );
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    role: PropTypes.string,
    onClick: PropTypes.func
};

export default Icon;
