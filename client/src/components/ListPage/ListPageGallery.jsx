import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalSwitch from './ModalSwitch.jsx';
import { Route } from 'react-router-dom';


const ListPageGallery = () => (
    <Route component={ModalSwitch} />
);

export default ListPageGallery;
