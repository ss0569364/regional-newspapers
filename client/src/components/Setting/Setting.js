import './Setting.css';
import React, { Component } from 'react';
import { Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { openPopUp } from "../ServicesAPI/CreatePopUp";
import NotificationsIcon from '@material-ui/icons/Notifications';

class Setting extends Component {
	constructor(props) {
		super(props);
		localStorage.setItem('count', -1);
	}

	render() {
		return (
			<div className="setting-container">
				<div className="personal-container">
					<div className="personal-title-container">
						<p>Persönliche Einstellungen</p>
					</div>
					<Divider />
					<div className="personal-role-container">
						<FormControl className="roleFieldSetting">
							<InputLabel>Lieblingsbezirk</InputLabel>
							<Select native defaultValue="Coming Soon">
								<option value={"Coming Soon"}>Coming Soon</option>
							</Select>
						</FormControl>
					</div>
				</div>

				<div className="noti-container">
					<div className="noti-title-container">
						<p>Benachrichtigung</p>
					</div>
					<Divider />
					<div className="noti-form-container">
						<NotificationsIcon style={{color: "rgb(13, 71, 161)"}} onClick={e => { openPopUp("Dieses Feature steht Ihnen bald zur Verfügung! Bitte geduldigen Sie sich."); }}/>
					</div>
				</div>
			</div>
		)
	}
}

export default React.memo(Setting);