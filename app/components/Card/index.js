import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './card.css';
/*
    Card for board that can be rearranged.
    It is a class and not a stateless functional component because we may want to add
    feature like edit a card.
 */
export default class Card extends Component {
    static propTypes = {
        isDragging: PropTypes.bool.isRequired,
        onDragStart: PropTypes.func.isRequired,
        onDragEnd: PropTypes.func.isRequired,
        onDragOver: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        ind: PropTypes.number.isRequired
    };

    handleDelete = () => {
        this.props.onDelete(this.props.data.id);
    };

    render() {
        const { isDragging, onDragStart, onDragEnd, onDragOver, data, ind } = this.props;
        return (
            <div
                className={`card ${isDragging ? 'dragging' : ''}`}
                draggable="true"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                data-id={ind}
                onDragOver={onDragOver}
            >
                {isDragging ?'Drop Here': data.task}
                <button className="delete-button" onClick={this.handleDelete}>x</button>
            </div>
        );
    }
}


