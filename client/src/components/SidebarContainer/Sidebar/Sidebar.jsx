import React from 'react';
import './sidebar.scss';

const Sidebar = ({ listActions, onClick }) => (
    <div className = "sidebar" onClick = {onClick} role = 'list'>
        <h3 className = "sidebar__title">Actions</h3>
        <ul className = "sidebar__list">
            {
                listActions.map((item, i) => {
                    return (<li 
                        key = {i}
                        className = {`sidebar__list-item btn btn-${item.type}`}>
                        { item.text }
                    </li>)
                })
            }
        </ul>
    </div>
);

export default Sidebar;
