import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles(
	{
		root: {
			background: "rgb(13, 71, 161)",
			height: "100%",
			"min-height": "64px",
		},
	});


export default function MyBottomNav() {
	const classes = useStyles();
	const getInitialState = () => {
		if (window.localStorage.getItem('count')) {
			return Number(window.localStorage.getItem('count'))
		} else {
			return 1
		}
	}

	const [value, setValue] = React.useState(getInitialState);
	const MyNav = withStyles({
		root: {
			color: 'rgba(255, 255, 255, 0.74)',
			maxWidth: "none",
			"&$selected": {
				color: "rgb(255,255,255)",
			},
		},
		selected: {//muss leer sein, nicht entfernen
		},
	})(BottomNavigationAction);

	return (
		<BottomNavigation showLabels className={classes.root} value={value} onChange={(event, newValue) => {
			setValue(newValue);
			localStorage.setItem('count', newValue)
		}}>
			<MyNav href='/map_view' label="Karte" icon={<LocationOnIcon />} />
			<MyNav href='/list_view' label="Liste" icon={<FormatListBulletedIcon />} />
		</BottomNavigation>
	);
}
