import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			marginLeft: "4%",
			width: "20%",
			float: "left",
			margin: "auto",
			// background: "rgba(30,136,229, 0.8)",
		},
	},
	text: {
		height: "100%",
		width: "auto",
		"font-size": "10px",
		"font-style": "normal",
		"font-weight": "400",
		"line-height": "20px",
		"letter-spacing": "0.4000000059604645px",
		"text-align": "left",
		verticalAlign: "top",
	},

}));


export default function Filterbutton(props) {
	const classes = useStyles();
	return (
    	<div className={classes.root}>
      		<Paper elevation={0} onClick={props.onClick(props.name)}>
				<AddIcon style = {{width: "auto", height: "0.5em"}}/>
				<span className={classes.text}>
					{props.name}
				</span>
			</Paper>
		</div>
  	);
}