/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import Card from "../../components/Card/index";
import CreateCard from "../../components/CreateCard/index";

export default class Trello extends Component {

    constructor(props) {
        super(props);
        // storing data here because not using any data layer.
        this.state = {
            data: [
                {
                    id: 1,
                    task: 'First task'
                },
                {
                    id: 2,
                    task: 'Second task'
                },
                {
                    id: 3,
                    task: 'Third task'
                },
                {
                    id: 4,
                    task: 'Fourth task'
                },
                {
                    id: 5,
                    task: 'fifth task'
                },
                {
                    id: 6,
                    task: 'Six task'
                },
                {
                    id: 7,
                    task: 'Seven task'
                },
                {
                    id: 8,
                    task: 'Eight task'
                },
                {
                    id: 9,
                    task: 'Nine task'
                },
                {
                    id: 10,
                    task: 'Ten task'
                },
                {
                    id: 11,
                    task: 'Eleven task'
                },
                {
                    id: 12,
                    task: 'Tweleve task'
                },
                {
                    id: 13,
                    task: 'Seven task'
                },
                {
                    id: 14,
                    task: 'Eight task'
                },
                {
                    id: 15,
                    task: 'Nine task'
                },
                {
                    id: 16,
                    task: 'Tweleve task'
                },
                {
                    id: 17,
                    task: 'Seven task'
                },
                {
                    id: 18,
                    task: 'Eight task'
                },
                {
                    id: 19,
                    task: 'Nine task'
                }
            ],
            dragging: undefined,
            showAddCard: false
        }
    }

    componentDidMount() {
        // Here we should make the api call and pass that data.
    }

    /*
        Store the dragged element.
     */
    handleDragStart = (e) => {
        this.dragged = Number(e.currentTarget.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    /*
        Remove the dragging value from the state once the element is dropeed.
     */
    handleDragEnd = () => {
        this.setState({
            dragging: undefined
        })
    };


    /*
        Find the current element on which the dragged element in dragged over and update the state .
     */
    handleDrop = (e) => {
        e.preventDefault();
        const over = e.currentTarget;
        const dragging = this.state.dragging;
        const from = isFinite(dragging) ? dragging : this.dragged;
        let to = Number(over.dataset.id);
        const relY = e.clientY - over.offsetTop;
        const height = over.offsetHeight / 2;
        if (relY > height) {
            to++;
        }
        if(from < to) to--;
        const data = [ ...this.state.data ];
        data.splice(to, 0, data.splice(from,1)[0]);
        this.setState({
            data: data,
            dragging: to
        });
    };

    handleShowCreateCard = () => this.setState(prevState => ({
        showAddCard: !prevState.showAddCard
    }));

    handleSaveCard = (value) => {
        const data = [ {id: this.state.data.length + 1, task: value}, ...this.state.data ];
        this.setState({
            data,
            showAddCard: false
        });
    };

    handleCancelSaveCard = () => {
        this.setState({
            showAddCard: false
        })
    };

    handleDeleteCard = (id) => {
        const data = [...this.state.data];
        const ind = data.findIndex((cardDetail) => cardDetail.id === id);
        if (ind > -1) {
            data.splice(ind, 1);
            this.setState({
                data
            });
        }
    };


    render() {
        const { data, dragging, showAddCard } = this.state;
        return (
            <div className="board">
                <div className="cards">
                    <div className="cards-title">
                        <h3> Backend bugs </h3>
                        <button className="create-card-button" onClick={this.handleShowCreateCard}>Add</button>
                    </div>
                    {
                        showAddCard && <CreateCard onSave={this.handleSaveCard} onCancel={this.handleCancelSaveCard}/>
                    }
                    {data.map((cardDetail, ind) => {
                        const isDragging = ind === dragging;
                        return <Card
                            data={cardDetail}
                            key={ind}
                            ind={ind}
                            isDragging={isDragging}
                            onDragStart={this.handleDragStart}
                            onDragEnd={this.handleDragEnd}
                            onDragOver={this.handleDrop}
                            onDelete={this.handleDeleteCard}
                        />
                    })}
                </div>
            </div>
        )

    }
}
