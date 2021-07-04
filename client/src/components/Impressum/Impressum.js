import './Impressum.css';
import React, { Component } from 'react';
import {Divider} from "@material-ui/core";


class Impressum extends Component{
    constructor(props) {
        super(props);
        this.state = {
            company: 'Kiez Kultur UG',
            address: 'Treskowallee 8, 10319 Berlin',
            country: 'Deutschland',
            uid: 'DE123456789',
            wid: 'DE123456789',
            tel: '030 / 1234567',
            fax: '030 / 1234568',
            eMail: 'fakeApp@kiez_kultue.de',
            aufsichtsbehoerde: 'Aufsichtsbehörde\n' +
                'Bezirkshauptmannschaft Musterhausen\n' +
                'Webseite der Aufsichtsbehörde\n' +
                'http://www.aufsichtsbehoerde.de\n' +
                'Anschrift der Aufsichsbehörde\n' +
                'Musterstraße 123, 12345 Musterhausen'
        }
        localStorage.setItem('count', -1);
    }

    render(){
        return(
            <div className="container">
                <div className="personal-title-container"><p>Impressum</p></div>
                <Divider />
                <div className="text pt-24"><p>Informationspflicht laut § 5 TMG.</p></div>
                <div className="text pt-24">
                    <p>{this.state.company} </p>
                    <p>{this.state.address} </p>
                    <p>{this.state.country} </p>
                    <br/>
                    <p>UID-Nummer: {this.state.uid} </p>
                    <p>Wirtschafts-ID: {this.state.wid} </p>
                    <br/>
                    <p>Tel: {this.state.tel} </p>
                    <p>Fax: {this.state.fax} </p>
                    <p>Mail: {this.state.eMail} </p>
                    <br/>
                    <p>{this.state.aufsichtsbehoerde}</p>
                </div>
            </div>
        )
    }
}

export default React.memo(Impressum);