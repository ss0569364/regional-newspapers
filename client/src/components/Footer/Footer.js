import './Footer.css';
import React, { Component } from 'react';
import MyBottomNav from './CreateBottomNav'

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='footer-container'>
                <MyBottomNav className="bottom-nav" />
            </div>
        )
    }
}

export default React.memo(Footer);