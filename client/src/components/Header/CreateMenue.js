import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { openPopUp } from "../ServicesAPI/CreatePopUp";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from "@material-ui/icons/Menu";
import AssignmentIcon from '@material-ui/icons/Assignment';



	
export default function MyMenue() {
	const [state, setState] = React.useState({
		menue: false,
	});

	const toggleDrawer = () => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, ["menue"]:  !state.menue});
	};

	const MyList = styled(List)({
		  color: 'rgba(0, 0, 0, 0.87)',
		});

	const MyListItemIcon = styled(List)({
		  color: 'rgba(0, 0, 0, 0.87)',
		  "margin-right": "2em",
		});

	const list = 
		<div role="presentation" onClick={toggleDrawer()} onKeyDown={toggleDrawer()}>
			<MyList className="menueSettingText">
				<a className='withoutHyperlink' href="/settings">
					<ListItem button>
						<MyListItemIcon><SettingsIcon /></MyListItemIcon>
						<ListItemText primary="Einstellungen" />
					</ListItem>
				</a>
				<a className='withoutHyperlink' href="/about_us" >
					<ListItem button>
						<MyListItemIcon><HelpOutlineIcon /></MyListItemIcon>
						<ListItemText primary="Über uns" />
					</ListItem>
				</a>
				<a className='withoutHyperlink' href="/impressum" >
					<ListItem button>
						<MyListItemIcon><ErrorOutlineIcon /></MyListItemIcon>
						<ListItemText primary="Impressum" />
					</ListItem>
				</a>
				<ListItem button className='withoutHyperlink' onClick={e => { openPopUp("Bevor Sie einen Eintrag aufgeben können, werden Sie zunächst überprüft. Sie werden benachrichtig, soblad Ihre Überprüfung beendet ist. "); }}>
					<MyListItemIcon><AssignmentIcon /></MyListItemIcon>
					<ListItemText primary="Eintrag aufgeben" />
				</ListItem>

			</MyList>
		</div>
	
	const useStyles = makeStyles({
		  paper: {
		    paddingTop: "max(64px ,10vh)",
		  },
		});
	
	return (
		<div>
			<IconButton color="inherit" onClick={toggleDrawer()}>
				<MenuIcon />
			</IconButton>
			<Drawer classes={{paper: useStyles().paper}} style = {{"zIndex": 2}} anchor="top" open={state['menue']} onClose={toggleDrawer()}>
				{list}
			</Drawer>
		</div>
	);
}


