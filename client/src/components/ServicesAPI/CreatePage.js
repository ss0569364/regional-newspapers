import React, { Component } from 'react';

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getRef } from "../ServicesAPI/CreateScrollTrigger";

class CreatePage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		const ref = getRef();
		return (
			<div className="app_container" >
				<Header />
				<div className="component" ref={ref}>
					<div className="FillerTop" id="back-to-top-anchor"></div>
					<this.props.component className="content_component" />
					<div className="FillerBottom"></div>
				</div>
				<Footer />
			</div>
		)
	}
}

export default React.memo(CreatePage);