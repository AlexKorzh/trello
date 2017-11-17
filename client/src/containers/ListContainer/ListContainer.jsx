import React from 'react';
import './listContainer.scss';
import AddListButton from '../../components/List/AddListButton/AddListButton.jsx';
import List from '../../components/List/List.jsx';

const ListContainer = () => {
    return (
        <div className = "list-page">
            <List />
            <AddListButton />
        </div>
    );
};

export default ListContainer;
