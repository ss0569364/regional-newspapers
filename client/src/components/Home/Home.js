import './Home.css';
import React, { Component } from 'react';

class Impressum extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem('count', -1);
    }

    render() {
        return (
            <div className="container">
                <div className="personal-title-container text"><p>Willkommen Kiez Kultur!</p></div>
                <div className="personal-title-container subText"><p>Du wirst mithilfe unserer App immer up to date sein!</p></div>
                <div className="personal-title-container subText"><p>Schaue dir dazu all die Neuigkeiten aus deiner Region an.</p></div>
                <div className="personal-title-container subText"><p>Entweder in der Kartenansicht oder als Liste</p></div>
            </div>
        )
    }
}

export default React.memo(Impressum);