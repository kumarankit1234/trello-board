import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './create-card.css';
/*
    Create card component to add a new card to the board.
 */
export default class CreateCard extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };
    }

    handleSave = () => {
        const cardValue = this.textarea.value;
        if (!cardValue) {
            this.setState({
                error: "Card Cannnot be empty"
            })
        } else {
            this.props.onSave(cardValue);
        }
    };

    handleCancel = () => this.props.onCancel();



    render() {
        const { error } = this.state;
        return (
            <div className={`create-card ${error ? 'error' : ''}`}
            >
                <textarea rows="4" ref={(c) => this.textarea = c}></textarea>
                <div>
                    <button onClick={this.handleSave}> Save </button>
                    <button className="cancel-button" onClick={this.handleCancel}> Cancel</button>
                    <div className="error-details">{error}</div>
                </div>
            </div>
        );
    }
}


