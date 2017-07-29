import './RaceInformationSection.css';
import classNames from 'classnames';
import YourInfoInput from '../YourInfoInput/YourInfoInput';
import React, { Component } from 'react';

export default class RaceInformationSection extends Component {
    constructor() {
        super();

        this.moveSectionUp = this.moveSectionUp.bind(this);
        this.moveSectionDown = this.moveSectionDown.bind(this);
    }

    moveSectionUp() {
        this.props.moveSectionUp('raceInfo');
    }

    moveSectionDown() {
        this.props.moveSectionDown('raceInfo');
    }

    render() {
        let sectionClasses = classNames({
            [`${this.props.sectionClass}`]: true,
            raceInformationSection: true
        });

        return (
            <div className={sectionClasses}>
                <div className="raceInformation__content">
                    <h3 className="raceInformationHeader">Your information</h3>
                    <div className="raceInformationBody">
                        <YourInfoInput type="text" label="Age:" value={this.props.raceInformation.age.value}
                                       onValueChange={this.props.setRaceInformationValue}/>
                        <YourInfoInput type="gender" label="Gender:" value={this.props.raceInformation.sex.value}
                                       onValueChange={this.props.setRaceInformationValue}/>
                        <YourInfoInput type="text" label="Current mpw:" value={this.props.raceInformation.currentMpw.value}
                                       onValueChange={this.props.setRaceInformationValue}/>
                        <YourInfoInput type="text" label="Previous peak mpw:"
                                       value={this.props.raceInformation.previousPeakMpw.value}
                                       onValueChange={this.props.setRaceInformationValue}/>
                        <YourInfoInput type="ga" label="Current 'Easy' training pace:"
                                       value={this.props.raceInformation.currentGaPace.value}
                                       onValueChange={this.props.setRaceInformationValue}/>
                    </div>
                </div>
            </div>
        );
    }
}