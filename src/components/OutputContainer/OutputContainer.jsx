import './OutputContainer.css';
import { copyTextToClipboard } from '../../utilities/clipboard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import base from '../../utilities/base';
import PostView from '../PostView/PostView';
import React, { Component } from 'react';
import SourceView from '../SourceView/SourceView';

export default class OutputContainer extends Component {
    constructor() {
        super();

        this.state = {
            isPostView: true,
            selectedIndex: 0,
            copyButtonText: 'copy source'
        };

        this.onViewSelect = this.onViewSelect.bind(this);
        this.convertYourInformationToMarkdown = this.convertYourInformationToMarkdown.bind(this);
        this.convertGoalsToMarkdown = this.convertGoalsToMarkdown.bind(this);
        this.convertWorkoutsToMarkdown = this.convertWorkoutsToMarkdown.bind(this);
        this.renderMarkdown = this.renderMarkdown.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
        this.onCopyClick = this.onCopyClick.bind(this);
        this.logReportGeneratedEvent = this.logReportGeneratedEvent.bind(this);
    }

    renderMarkdown() {
        let markdown = '';

        for (let section of this.props.sections) {
            if (this.props.sections.indexOf(section) !== 0) {
                markdown += '\n';
            }

            switch (section) {
                case 'yourInfo':
                    markdown += this.convertYourInformationToMarkdown();
                    break;
                case 'goals':
                    markdown += this.convertGoalsToMarkdown();
                    break;
                case 'workouts':
                    markdown += this.convertWorkoutsToMarkdown();
                    break;
                default:
                    break;
            }
        }

        markdown += '\n\n';

        markdown += '### Other helpful information';
        markdown += '\n\n';
        markdown += 'Lorem ipsum dolor sit amet, quo quis enim in, et vis soleat utroque expetendis. Viris nostro placerat et cum, ut eum nobis noluisse. Eu zril aperiri tincidunt mea. Idque propriae vituperatoribus ex sed.';
        markdown += '\n\n';

        markdown += '### My question';
        markdown += '\n\n';
        markdown += 'Lorem ipsum dolor sit amet, quo quis enim in, et vis soleat utroque expetendis. Viris nostro placerat et cum, ut eum nobis noluisse. Eu zril aperiri tincidunt mea. Idque propriae vituperatoribus ex sed.';
        markdown += '\n\n';
        markdown += 'Lorem ipsum dolor sit amet, quo quis enim in, et vis soleat utroque expetendis. Viris nostro placerat et cum, ut eum nobis noluisse. Eu zril aperiri tincidunt mea. Idque propriae vituperatoribus ex sed.';
        markdown += '\n\n';

        markdown += '*****';
        markdown += '\n\n';

        markdown += '*This post was generated using the [training-questions tool](https://martellaj.github.io/race-reportr/), brought to you by the [/r/artc](https://www.reddit.com/r/artc) community.*\n\n';
        markdown += '*Remember also to check out [race-reportr](https://martellaj.github.io/race-reportr/) - built by [/u/BBQLays](https://www.reddit.com/u/bbqlays) - which heavily influenced the making of this tool.*';

        return markdown;
    }

    convertYourInformationToMarkdown() {
        let markdown = '### Your information\n';

        for (let prop in this.props.yourInformation) {
            if (this.props.yourInformation.hasOwnProperty(prop)) {
                let property = this.props.yourInformation[prop];

                if (property.value) {
                    markdown += property.output + property.value + '\n'
                }
            }
        }

        return markdown;
    }

    convertGoalsToMarkdown() {
        if (this.props.goals.length === 0) {
            return '';
        }

        let markdown = '### Goals\n';
        markdown += '| Goal | Description |\n';
        markdown += '|------|-------------|\n';

        let index = 0;
        for (let goal of this.props.goals) {
            markdown += `| ${OutputContainer.convertIndexToLetter(index++)} | ${goal.description} |\n`;
        }

        return markdown;
    }

    convertWorkoutsToMarkdown() {
        if (this.props.workouts.length === 0) {
            return '';
        }

        let markdown = '### Workouts\n';
        markdown += 'Workouts I have traditionally or recently completed:\n\n'
        for (let workout of this.props.workouts) {
            markdown += `* ${workout.description} [(link to Strava activity)](${workout.link})\n`;
        }

        return markdown;
    }

    static convertIndexToLetter(index) {
        return String.fromCharCode(65 + index);
    }

    static convertBooleanToWord(value) {
        return value ? 'Yes' : 'No';
    }

    onViewSelect(event) {
        let isPostView = event.target.innerText.indexOf('post') > -1;
        this.setState({
            isPostView
        });
    }

    renderOutputBody() {
        return this.state.isPostView ? this.renderPostView() : this.renderSourceView();
    }

    renderPostView() {
        return (
            <PostView markdown={this.renderMarkdown()} />
        );
    }

    renderSourceView() {
        return (
            <SourceView markdown={this.renderMarkdown()} logReportGeneratedEvent={this.logReportGeneratedEvent} />
        );
    }

    logReportGeneratedEvent() {
        base.push(`reports`, {
            data: this.props.yourInformation
        });
    }

    onTabSelect(index) {
        this.setState({
            isPostView: index === 0,
            selectedIndex: index
        });
    }

    onCopyClick() {
        // Get Markdown source.
        let source = this.renderMarkdown();

        // Copy text to clipboard.
        let success = copyTextToClipboard(source);
        if (success) {
            this.setState({
                copyButtonText: 'copied!'
            });

            setTimeout(() => {
                this.setState({
                    copyButtonText: 'copy source'
                });
            }, 1000);
        }

        // Log event.
        this.logReportGeneratedEvent();
    }

    render() {
        return (
            <div className="outputContainer">
                <button className="copy-button" onClick={this.onCopyClick} children={this.state.copyButtonText}></button>

                <Tabs onSelect={this.onTabSelect} selectedIndex={this.state.selectedIndex}>
                    <TabList>
                        <Tab>preview</Tab>
                        <Tab>source</Tab>
                    </TabList>

                    <TabPanel />
                    <TabPanel />
                </Tabs>

                {this.renderOutputBody()}
            </div>
        );
    }
}