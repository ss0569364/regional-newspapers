import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FilterButton from"./FilterButton";
import {openPopUp} from "../ServicesAPI/CreatePopUp";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			marginTop: "2em",
			marginLeft: "5%",
			marginRight: "5%",
			padding: "0 0.5em",
			paddingTop: "3.5%",	
			background: "rgba(30,136,229, 0.8)",
			height: "2.25em",
			verticalAlign: "middle",

    	}
	},
	button: {
		minWidth: 0,
		minHeight: 0,
		height: "3%",
		width: "25%",
		marginLeft: "0.5em",
		"font-style": "normal",
		"font-weight": "normal",
		"font-size": "10px",
		"line-height": "16px",
		"letter-spacing": "0.4px",
		"color": "#FFFFFF",
  	},
	   
}));

const onclickFilterButton = (name) => (e) => {
	openPopUp("Filtern nach " + name + " demnächst Verfügbar!");
}
export default function FilterPaper(props) {
	const classes = useStyles();

	return (
    	<div className={classes.root} id={props.id}>
      		<Paper elevation={3}>
				  <FilterButton onClick={onclickFilterButton} name = "Datum"/>
				  <FilterButton onClick={onclickFilterButton} name = "Bezirk"/>
				  <FilterButton onClick={onclickFilterButton} name = "Quelle"/>
				  <FilterButton onClick={onclickFilterButton} name = "Thema"/>
			</Paper>
		</div>
  	);
}