import './NewsListElement.css';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";
import { openPopUp } from "../ServicesAPI/CreatePopUp";
import { IconImageSvgVector } from "../ServicesAPI/CreateIconSVG";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			marginTop: "2em",
			marginLeft: "5%",
			marginRight: "5%",
			background: "rgba(30,136,229, 0.8)",
			height: "20vh",
			verticalAlign: "middle",
		}
	},
	root2: {
		"& > *": {
			position: "absolute",
			margin: "3vh 5% 0 5%",
			background: "rgb(255,255,255)",
			height: "14vh",
			width: "80%",
			verticalAlign: "middle",
			overflow: "hidden",
		}

	}
}));


export default function NewsListElement(props) {
	const classes = useStyles();
	//var date = createCorrectDate(props.article.pubDate, props.article);
	var date = new Date(props.article.pubDate);
	var displayDate = "";
	if (date != "Invalid Date") {
		displayDate = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
	}
	return (
		<div className={classes.root}>
			<Paper elevation={0}>
				<div className={classes.root2}>
					<Paper elevation={6}>
						{props.article.picLink ? (
							<img alt={"image of headline: " + props.article.Headline} src={props.article.picLink} style={{ float: "left", height: "75%", width: "auto", maxWidth: "25%", margin: "2vh  2.5% 0 2.5%" }} />
						) : (
								<IconImageSvgVector style={{ float: "left", height: "75%", width: "auto", margin: "2vh  2.5% 0 2.5%" }} />
							)}
						<div className="innerPaperListElement">
							<div className="headlineArticle">
								<p>{props.article.Headline}</p>
							</div>
							<Divider />
							<div className="descriptionArticle">
								<p>{props.article.Description}</p>
							</div>
						</div>
						<ChevronRightIcon onClick={e => { window.open(props.article.Link) }} style={{ float: "right" }} />
						<ReportProblemOutlinedIcon onClick={e => { openPopUp("Der Artikel wurde gemeldet."); }} style={{ float: "right" }} />
					</Paper>
				</div>
			</Paper>
			<div style={{ float: "right", position: "relative", display: "block", margin: 0, height: "auto", width: "auto", background: "none", marginRight: "10%", bottom: "1.25em" }}>
				{displayDate}
			</div>
		</div>
	);
}