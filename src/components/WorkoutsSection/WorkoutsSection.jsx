import './WorkoutsSection.css';
import classNames from 'classnames';
import WorkoutsInput from '../WorkoutsInput/WorkoutsInput';
import React, { Component } from 'react';

export default class WorkoutsSection extends Component {
    constructor() {
        super();

        this.moveSectionUp = this.moveSectionUp.bind(this);
        this.moveSectionDown = this.moveSectionDown.bind(this);
        this.addWorkout = this.addWorkout.bind(this);
    }

    moveSectionUp() {
        this.props.moveSectionUp('workouts');
    }

    moveSectionDown() {
        this.props.moveSectionDown('workouts');
    }

    addWorkout() {
        this.props.addWorkout();
    }

    renderWorkoutInputs() {
        let workoutInputs = [];

        for (let i = 0; i < this.props.workouts.length; i++) {
            let workoutInput = this.props.workouts[i];
            workoutInputs.push(
                <WorkoutsInput key={i} _key={i} link={workoutInput.link} description={workoutInput.description} editWorkout={this.props.editWorkout} removeWorkout={this.props.removeWorkout} />
            );
        }

        return workoutInputs;
    }

    render() {
        let sectionClasses = classNames({
            [`${this.props.sectionClass}`]: true,
            workoutsSection: true
        });

        return (
            <div className={sectionClasses}>
                <div className="workoutsSectionContent">
                    <h3 className="sectionHeader">Workouts</h3>
                    <button onClick={this.addWorkout}>add</button>
                    {this.renderWorkoutInputs()}
                </div>
            </div>
        );
    }
}