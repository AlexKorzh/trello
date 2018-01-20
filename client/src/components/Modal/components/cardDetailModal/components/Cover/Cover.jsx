import React from 'react';
import PropTypes from 'prop-types';

const Cover = props => {
    const { cover } = props;
    const { preview } = cover;

    const styles = {
        'backgroundImage': `url('${cover.url}')`,
        'backgroundColor': preview.color
    }

    return (
        <div
            className="cover"
            style={ styles }
        />
    );
}

export default Cover;
