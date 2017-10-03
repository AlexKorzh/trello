import React from 'react';
import './boardForm.scss';

class BoardForm extends React.Component {
    constructor (props) {
        super(props);
        this.openStatus = '';
    }
    
    render () {
        console.log(this.props);
        const isOpen = this.props.show;
        
        return (
            <div ref = "form" 
                className = {`board-form card ${isOpen && 'open'}`}>
                <h3 className = "title">Создание доски 
                    <span 
                        role = "button" 
                        onClick = {this.props.close} 
                        className = "close-card close">
                        <span aria-hidden = "true">&times;</span>
                    </span>
                </h3>
                <input 
                    className = "board-name form-control" 
                    type = "text"
                    placeholder = "Например, «Издание календаря»…"
                />
                <button className = "btn btn-success">Созадть</button>
            </div>
        );
    }
};

export default BoardForm;
