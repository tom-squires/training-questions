import './YourInformationSection.css';
import classNames from 'classnames';
import YourInfoInput from '../YourInfoInput/YourInfoInput';
import React, { Component } from 'react';

export default class YourInformationSection extends Component {
    constructor() {
        super();

        this.moveSectionUp = this.moveSectionUp.bind(this);
        this.moveSectionDown = this.moveSectionDown.bind(this);
    }

    moveSectionUp() {
        this.props.moveSectionUp('yourInfo');
    }

    moveSectionDown() {
        this.props.moveSectionDown('yourInfo');
    }

    render() {
        let sectionClasses = classNames({
            [`${this.props.sectionClass}`]: true,
            yourInformationSection: true
        });

        return (
            <div className={sectionClasses}>
                <div className="yourInformation__content">
                    <h3 className="yourInformationHeader">Your information</h3>
                    <div className="yourInformationBody">
                        <YourInfoInput type="text" label="Age:" value={this.props.yourInformation.age.value}
                                       onValueChange={this.props.setYourInformationValue}/>
                        <YourInfoInput type="gender" label="Gender:" value={this.props.yourInformation.sex.value}
                                       onValueChange={this.props.setYourInformationValue}/>
                        <YourInfoInput type="text" label="Current mpw:" value={this.props.yourInformation.currentMpw.value}
                                       onValueChange={this.props.setYourInformationValue}/>
                        <YourInfoInput type="text" label="Previous peak mpw:"
                                       value={this.props.yourInformation.previousPeakMpw.value}
                                       onValueChange={this.props.setYourInformationValue}/>
                        <YourInfoInput type="ga" label="Current 'Easy' training pace:"
                                       value={this.props.yourInformation.currentGaPace.value}
                                       onValueChange={this.props.setYourInformationValue}/>
                    </div>
                </div>
            </div>
        );
    }
}