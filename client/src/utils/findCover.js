const mimetypes = {
    'image': [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml'
    ]
};

const findCover = attachments => {
    return attachments.find(
        attachment => mimetypes.image.some(
            mimetype => mimetype === attachment.mimetype
        )
    );
}

export default findCover;
