import React, { Component } from 'react';
// import './editModal.scss';

const mimetypes = {
    'image': [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml'
    ]
}

class CardPreview extends Component {
    constructor () {
        super();

        this.findCover = this.findCover.bind(this);
    }

    findCover (attachments) {
        return attachments.find(
            attachment => mimetypes.image.some(
                mimetype => mimetype === attachment.mimetype
            )
        );
    }

    render () {
        const { attachments } = this.props;
        // const cover = this.findCover(attachments).url;

        return (
            <div>
                {
                    // cover ? <img src={cover}/> : null
                }
            </div>
        );
    }
}

export default CardPreview;
