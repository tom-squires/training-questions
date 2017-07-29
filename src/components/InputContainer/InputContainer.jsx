import './InputContainer.css';
import GoalsSection from '../GoalsSection/GoalsSection';
import WorkoutsSection from '../WorkoutsSection/WorkoutsSection';
import YourInformationSection from '../YourInformationSection/YourInformationSection';
import React, { Component } from 'react';

export default class InputContainer extends Component {
    constructor() {
        super();

        this.renderSections = this.renderSections.bind(this);
    }

    renderSections() {
        let sections = [];

        for (let section of this.props.sections) {
            switch (section) {
                case 'yourInfo':
                    sections.push(
                        <YourInformationSection key={sections.length} sectionClass="section" yourInformation={this.props.yourInformation} setYourInformationValue={this.props.setYourInformationValue} setYourInformationExclude={this.props.setYourInformationExclude}
                        moveSectionUp={this.props.moveSectionUp} moveSectionDown={this.props.moveSectionDown} />
                    );
                    break;
                case 'goals':
                    sections.push(
                        <GoalsSection key={sections.length} goals={this.props.goals} addGoal={this.props.addGoal} editGoal={this.props.editGoal} removeGoal={this.props.removeGoal} sectionClass="section" moveSectionUp={this.props.moveSectionUp} moveSectionDown={this.props.moveSectionDown} />
                    );
                    break;
                case 'workouts':
                    sections.push(
                        <WorkoutsSection key={sections.length} sectionClass="section" moveSectionUp={this.props.moveSectionUp} moveSectionDown={this.props.moveSectionDown} workouts={this.props.workouts} addWorkout={this.props.addWorkout} editWorkout={this.props.editWorkout} removeWorkout={this.props.removeWorkout} />
                    );
                    break;
                default:
                    break;
            }
        }

        return sections;
    }

    render() {
        return (
            <div className="inputContainer">
                {this.renderSections()}
            </div>
        );
    }
}