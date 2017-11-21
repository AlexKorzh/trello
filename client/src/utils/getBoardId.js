const getBoardId = () => {
    const URL = window.location.href;
    let boardId = '',
        url = URL.split('/');

    boardId = url[4];

    return boardId;
}

export default getBoardId;
