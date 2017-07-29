import './App.css';
import base from '../../utilities/base';
import InputContainer from '../InputContainer/InputContainer';
import OutputContainer from '../OutputContainer/OutputContainer';
import React, { Component } from 'react';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            sections: ['yourInfo', 'goals', 'workouts'],
            yourInformation: {
                labels: {
                    "Age:" : "age",
                    "Gender:" : "sex",
                    "Current mpw:" : "currentMpw",
                    "Previous peak mpw:" : "previousPeakMpw",
                    "Current 'Easy' training pace:" : "currentGaPace"
                },
                age: {
                    value: '27',
                    exclude: false,
                    output: '* **Age:** '
                },
                sex: {
                    value: 'Male',
                    exclude: false,
                    output: '* **Gender:** '
                },
                currentMpw: {
                    value: '20',
                    exclude: false,
                    output: '* **Current mpw:** '
                },
                previousPeakMpw: {
                    value: '30',
                    exclude: false,
                    output: '* **Previous peak mpw:** '
                },
                currentGaPace: {
                    value: '8:30/mile',
                    exclude: false,
                    output: '* **Current \'Easy\' training pace:** '
                }
            },
            goals: [
                {
                    description: 'Sub-18:00 5k'
                }
            ],
            workouts: [
                {
                    link: 'https://www.strava.com/activities/184003185/overview',
                    description: '8 x 1km @ 4:00 per km off 70 sec. rest'
                }
            ]
        };

        let today = new Date();
        base.push(`loads`, {
            data: today.toDateString()
        });

        this.moveSectionUp = this.moveSectionUp.bind(this);
        this.moveSectionDown = this.moveSectionDown.bind(this);
        this.setYourInformationValue = this.setYourInformationValue.bind(this);
        this.setYourInformationExclude = this.setYourInformationExclude.bind(this);
        this.addGoal = this.addGoal.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
        this.editGoal = this.editGoal.bind(this);
        this.addWorkout = this.addWorkout.bind(this);
        this.removeWorkout = this.removeWorkout.bind(this);
        this.editWorkout = this.editWorkout.bind(this);
    }

    moveSectionUp(section) {
        let sections = this.state.sections;
        let sectionIndex = sections.indexOf(section);
        sections.splice(sectionIndex, 1);
        sections.splice(sectionIndex - 1, 0, section);
        this.setState({ sections });
    }

    moveSectionDown(section) {
        let sections = this.state.sections;
        let sectionIndex = sections.indexOf(section);
        sections.splice(sectionIndex, 1);
        sections.splice(sectionIndex + 1, 0, section);
        this.setState({ sections });
    }

    setYourInformationValue(facet, value) {
        let state = this.state;
        state.yourInformation[state.yourInformation.labels[facet]].value = value;
        this.setState(state);
    }

    setYourInformationExclude(facet, value) {
        let state = this.state;
        state.yourInformation[facet].exclude = value;
        this.setState(state);
    }

    addGoal() {
        let goals = this.state.goals;
        goals.push({
            description: 'Run really fast',
            completed: false
        });
        this.setState({ goals });
    }

    editGoal(index, description, completed) {
        let goals = this.state.goals;
        goals[index].description = description;
        goals[index].completed = completed;
        this.setState({ goals });
    }

    removeGoal(index) {
        let goals = this.state.goals;
        goals.splice(index, 1);
        this.setState({ goals });
    }

    addWorkout() {
        let workouts = this.state.workouts;
        workouts.push({
            link: 'https://www.strava.com/activities/184003185/overview',
            description: '10 x 400m off 60 sec rest (avg 92 sec.)'
        });
        this.setState({ workouts });
    }

    editWorkout(index, link, description) {
        let workouts = this.state.workouts;
        workouts[index].link = link;
        workouts[index].description = description;
        this.setState({ workouts });
    }

    removeWorkout(index) {
        let workouts = this.state.workouts;
        workouts.splice(index, 1);
        this.setState({ workouts });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>training questions</h1>
                    <div className="sub-header">by <a href="https://www.reddit.com/r/artc" target="_blank">/r/artc</a></div>
                    <div className="links">
                        <span className="label"><a href="https://www.reddit.com/message/compose?to=vrlkd&subject=training-questions%20bug" target="_blank" className="header-a">report a bug</a></span><span> | </span>
                        <span className="label"><a href="https://www.reddit.com/message/compose?to=vrlkd&subject=training-questions%20feature" target="_blank" className="header-a">request a feature</a></span><span> | </span>
                        <span className="label"><a href="https://github.com/tom-squires/training-questions" target="_blank" className="header-a">source on github</a></span>
                    </div>
                </div>
                <div className="app">
                    <div className="app-container">
                        <InputContainer sections={this.state.sections} moveSectionUp={this.moveSectionUp} moveSectionDown={this.moveSectionDown} yourInformation={this.state.yourInformation} setYourInformationValue={this.setYourInformationValue} setYourInformationExclude={this.setYourInformationExclude} goals={this.state.goals} addGoal={this.addGoal} editGoal={this.editGoal} removeGoal={this.removeGoal} workouts={this.state.workouts} addWorkout={this.addWorkout} editWorkout={this.editWorkout} removeWorkout={this.removeWorkout} splitInformation={this.state.splitInformation} addSplit={this.addSplit} editSplit={this.editSplit} removeSplit={this.removeSplit} setDistanceType={this.setDistanceType} textSections={this.state.textSections} addTextSection={this.addTextSection} editTextSection={this.editTextSection} removeTextSection={this.removeTextSection} />
                        <OutputContainer sections={this.state.sections} yourInformation={this.state.yourInformation} goals={this.state.goals} workouts={this.state.workouts} splitInformation={this.state.splitInformation} textSections={this.state.textSections} />
                    </div>
                </div>
            </div>
        );
    }
}