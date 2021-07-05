import './Home.css';
import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem('count', -1);
        this.updateGeolocationToLocalstore();
    }

    updateGeolocationToLocalstore() {
        let state = {
            lat: 52.520008,
            lng: 13.404954
        }

        navigator.geolocation.getCurrentPosition(
            function(position) {
                state.lat = position.coords.latitude;
                state.lng = position.coords.longitude;
                localStorage.setItem('Geo', JSON.stringify(state));
            },
            (error) => {
                // See error code charts below.
                localStorage.setItem('Geo', JSON.stringify(state));
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
        );
        return JSON.parse(localStorage.getItem('Geo'));
    }

    render() {
        return (
            <div className="container">
                <div className="personal-title-container text"><p>Willkommen bei Kiez Kultur!</p></div>
                <div className="personal-title-container subText"><p>Du wirst mithilfe unserer App immer up to date sein!</p></div>
                <div className="personal-title-container subText"><p>Schaue dir dazu all die Neuigkeiten aus deiner Region an.</p></div>
                <div className="personal-title-container subText"><p>Entweder in der Kartenansicht oder als Liste</p></div>
            </div>
        )
    }
}

export default React.memo(Home);