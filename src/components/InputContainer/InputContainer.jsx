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
                case 'raceInfo':
                    sections.push(
                        <YourInformationSection key={sections.length} sectionClass="section" raceInformation={this.props.raceInformation} setRaceInformationValue={this.props.setRaceInformationValue} setRaceInformationExclude={this.props.setRaceInformationExclude}
                        moveSectionUp={this.props.moveSectionUp} moveSectionDown={this.props.moveSectionDown} />
                    );
                    break;
                case 'goals':
                    sections.push(
                        <GoalsSection key={sections.length} goals={this.props.goals} addGoal={this.props.addGoal} editGoal={this.props.editGoal} removeGoal={this.props.removeGoal} sectionClass="section" moveSectionUp={this.props.moveSectionUp} moveSectionDown={this.props.moveSectionDown} />
                    );
                    break;
                case 'pictures':
                    sections.push(
                        <WorkoutsSection key={sections.length} sectionClass="section" moveSectionUp={this.props.moveSectionUp} moveSectionDown={this.props.moveSectionDown} pictures={this.props.pictures} addPicture={this.props.addPicture} editPicture={this.props.editPicture} removePicture={this.props.removePicture} />
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