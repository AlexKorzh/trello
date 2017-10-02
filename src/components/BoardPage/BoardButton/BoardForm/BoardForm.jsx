import React from 'react';
import './boardForm.scss';

class BoardForm extends React.Component {
    constructor (props) {
        super(props);
        this.closeForm = this.closeForm.bind(this);
        this.openStatus = '';
    }

    closeForm () {
        this.openStatus = '';
    }

    render () {
        if (this.props.open.isModalOpen) {
            this.openStatus = 'open';
        }
        return (
            <div className = {`board-form card ${this.openStatus}`}>
                <h3 className = "title">Создание доски 
                    <span className = "close-card close">
                        <span 
                            onClick = {this.closeForm} 
                            aria-hidden = "true">&times;</span>
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
