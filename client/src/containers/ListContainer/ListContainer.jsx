import React from 'react';
import './listContainer.scss';
import AddListButton from './AddListButton/AddListButton.jsx';

const ListContainer = () => {
    return (
        <div className = "list-page">
            <AddListButton />
        </div>
    );
};

export default ListContainer;
