import React from 'react';
import PropTypes from 'prop-types';

import './BoardCard.scss';

const BoardCard = (props) => {
    return (
        <div className="col-3">
            <div className="card card-custom board-card text-white bg-card p-2">
                { props.title }
            </div>
        </div>
    );
};

BoardCard.propTypes = {
    title: PropTypes.string.isRequired
};

export default BoardCard;
