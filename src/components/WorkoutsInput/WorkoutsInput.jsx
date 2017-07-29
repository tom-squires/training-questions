import './WorkoutsInput.css';
import React, { Component } from 'react';

export default class WorkoutsInput extends Component {
    constructor() {
        super();

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onLinkChange = this.onLinkChange.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
    }

    onDescriptionChange(event) {
        this.props.editWorkout(this.props._key, this.props.link, event.target.value);
    }

    onLinkChange(event) {
        this.props.editWorkout(this.props._key, event.target.value, this.props.description);
    }

    onRemoveClick() {
        this.props.removeWorkout(this.props._key);
    }

    render() {
        return (
            <div className="workoutInput">
                <span className="label">
                    workout #{this.props._key + 1}
                    <button onClick={this.onRemoveClick}>remove</button>
                </span>
                <input type="text" value={this.props.description} onChange={this.onDescriptionChange} />
                <input type="text" value={this.props.link} onChange={this.onLinkChange} />
            </div>
        );
    }
}