import './RaceInfoInput.css';
import classNames from 'classnames';
import React, { Component } from 'react';

export default class RaceInfoInput extends Component {
    constructor() {
        super();

        this.state = {
            buttonText: 'exclude',
            isInputDisabled: false
        };

        this.onExcludeChange = this.onExcludeChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    onExcludeChange() {
        const isExclude = this.state.buttonText === 'exclude';

        if (isExclude) {
            this.setState({
                buttonText: 'include',
                isInputDisabled: true
            });

            this.props.onExcludeChange(this.props.label, true);
        } else {
            this.setState({
                buttonText: 'exclude',
                isInputDisabled: false
            });

            this.props.onExcludeChange(this.props.label, false);
        }
    }

    onValueChange(event) {
        this.props.onValueChange(this.props.label, event.target.value);
    }

    render() {
        const inputClasses = classNames({
            'raceInfoInput__input': true,
            'raceInfoInput__input--disabled': this.state.isInputDisabled
        });

        const labelClasses = classNames({
            'raceInfoInput__label': true,
            'raceInfoInput__label--disabled': this.state.isInputDisabled
        });

        switch (this.props.type) {
            case 'text':
                return (
                    <div className="raceInfoInput">
                        <div className="raceInfoInput_inputDiv">
                            <p className={labelClasses}>{this.props.label}</p>
                            <input ref={(input) => { this.input = input; }} type="text" className={inputClasses}
                                   disabled={this.state.isInputDisabled} onChange={this.onValueChange}
                                   value={this.props.value}/>
                        </div>
                    </div>
                );
            case 'ga':
                return (
                    <div className="raceInfoInput">
                        <div className="raceInfoInput_inputDiv">
                            <p className={labelClasses}><a href="https://runsmartproject.com/calculator/" target="_blank">{this.props.label}</a></p>
                            <input ref={(input) => { this.input = input; }} type="text" className={inputClasses}
                                   disabled={this.state.isInputDisabled} onChange={this.onValueChange}
                                   value={this.props.value}/>
                        </div>
                    </div>
                );
            case 'gender':
                return (
                    <div className="raceInfoInput">
                        <div className="raceInfoInput_inputDiv">
                            <p className={labelClasses}>{this.props.label}</p>
                            <select ref={(input) => { this.input = input; }} className={inputClasses}
                                    disabled={this.state.isInputDisabled} onChange={this.onValueChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                );
            default:
                break;
        }
    }
}