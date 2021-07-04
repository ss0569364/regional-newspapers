import './Header.css';
import React, { Component } from 'react';

import stylePrimary900 from '../Style/Styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MyMenue from "./CreateMenue";

import { IconNoSignal, IconLogo } from "../ServicesAPI/CreateIconSVG";
import MyPopUp, { openPopUp } from "../ServicesAPI/CreatePopUp";


class Header extends Component {
	constructor(props) {
		super(props);
	}

	loadIconSignal() {
		var appOnline = navigator.onLine;
		return appOnline ? "none" : "inherit";
	}
	
	render() {
		return (
			<div className="header-container" style={{ "zIndex": 1 }}>
				<ThemeProvider theme={stylePrimary900()}>
					<AppBar position="fixed" className="appBar">
						<Toolbar style={{ paddingRight: "5%" }}>
							<MyMenue />

							<Typography variant="h6" className="title-container" >
								<div className="titleHeader">Kiez Kultur</div>
							</Typography>
							<IconButton id="noSignal" onClick={() => openPopUp("Es besteht aktuell keine Verbindung zum Internet.")} style={{ "display": this.loadIconSignal() }}><IconNoSignal className="noSignalIcon" /></IconButton>

							<a href='/'>
								<IconLogo style={{color:"white", "position": "relative", height: "6.5vh", width: "6.5vh", "minHeight": "48px", "minWidth": "48px" }} />
							</a>
						</Toolbar>
					</AppBar>
					<MyPopUp />
				</ThemeProvider>
			</div>
		)
	}
}

export default React.memo(Header);