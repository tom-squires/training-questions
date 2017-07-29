import './PicturesSection.css';
import classNames from 'classnames';
import PictureInput from '../PictureInput/PictureInput';
import React, { Component } from 'react';

export default class PicturesSection extends Component {
    constructor() {
        super();

        this.moveSectionUp = this.moveSectionUp.bind(this);
        this.moveSectionDown = this.moveSectionDown.bind(this);
        this.addPicture = this.addPicture.bind(this);
    }

    moveSectionUp() {
        this.props.moveSectionUp('pictures');
    }

    moveSectionDown() {
        this.props.moveSectionDown('pictures');
    }

    addPicture() {
        this.props.addPicture();
    }

    renderPictureInputs() {
        let pictureInputs = [];

        for (let i = 0; i < this.props.pictures.length; i++) {
            let pictureInput = this.props.pictures[i];
            pictureInputs.push(
                <PictureInput key={i} _key={i} link={pictureInput.link} description={pictureInput.description} editPicture={this.props.editPicture} removePicture={this.props.removePicture} />
            );
        }

        return pictureInputs;
    }

    render() {
        let sectionClasses = classNames({
            [`${this.props.sectionClass}`]: true,
            picturesSection: true
        });

        return (
            <div className={sectionClasses}>
                <div className="picturesSectionContent">
                    <h3 className="sectionHeader">workouts</h3>
                    <button onClick={this.addPicture}>add</button>
                    {this.renderPictureInputs()}
                </div>
            </div>
        );
    }
}