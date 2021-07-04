import './AboutUs.css';
import React, { Component } from 'react';
import { Divider } from "@material-ui/core";


class AboutUs extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem('count', -1);
    }

    render() {
        return (
            <div className="container">
                <div className="personal-title-container"><p>Wer steckt hinter dieser App?</p></div>
                <Divider />
                <div className="text pt-24">
                    <p>Hinter Kiez Kultur verbergen sich die Gründer:</p>
                    <br />
                    <p>
                        <li>Duc Anh Tran</li>
                        <li>Marc Woelms</li>
                        <li>Max Gurgel</li>
                    </p>
                </div>
                <div className="text pt-24">
                    <p>
                        Aus einer Aufgabe während des Studiums heraus gründeten wir die Kiez Kultur UG um allen Leuten eine Übersicht der regionalen News zu bieten.
                    </p>
                </div>
            </div>
        )
    }
}

export default React.memo(AboutUs);