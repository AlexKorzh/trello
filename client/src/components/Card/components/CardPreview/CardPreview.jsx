import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findCover from '../../../../utils/findCover';

import './cardPreview.scss';

class CardPreview extends Component {
    constructor () {
        super();

        this.state = {
            offsetWidth: 0
        }

        this.calcHeight = this.calcHeight.bind(this);
        this.setRef = this.setRef.bind(this);
    }

    componentDidMount () {
        const { offsetWidth } = this.el;

        this.setState({ offsetWidth });
    }

    calcHeight (dimensions) {
        const { height, width } = dimensions;
        const { offsetWidth } = this.state;
        const cardHeight = (height * offsetWidth) / width;

        return cardHeight;
    }

    setRef (el) {
        this.el = el;
    }

    render () {
        const { attachments } = this.props;
        const cover = findCover(attachments);
        const styles = cover && {
            backgroundImage: `url('${cover.url}')`,
            height: `${this.calcHeight(cover.preview)}px`
        };

        return (
            <div 
                className="card__preview"
                style={ cover && styles }
                ref={ this.setRef }
            />
        );
    }
}

CardPreview.propTypes = {
    attachments: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

export default CardPreview;
