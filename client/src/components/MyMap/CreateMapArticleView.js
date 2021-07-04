import React from "react";
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import NewsListElement from '../NewsListElement/NewsListElement';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Fab from '@material-ui/core/Fab';


const myPopUpRef = React.createRef();
const buttonRef = React.createRef();

const useStyles = makeStyles((theme) => ({
	rootDiv: {
		display: "none",
		position: "fixed",
		width: "100%",
		height: "90%",
		top: "max(64px, 10%)",
		left: "0%",
		"backgroundColor": "rgba(0, 0, 0, 0.5)",
		"zIndex": 1100,
		overflow: "auto",
		paddingTop: "2em",		
		paddingBottom: "12em"
	},

	rootText: {
		margin: "7%",
		"font-style": "normal",
		"font-weight": "normal",
		"font-size": "14px",
		"line-height": "143%",

		"letter-spacing": "0.25px",
		color: "rgba(0, 0, 0, 0.6)",
	},
	rootButton: {
		position: "absolute",
		"top": "2%",
		"right": "5%",

		"font-style": "normal",
		"font-weight": 500,
		"font-size": "14px",
		"line-height": "114%",
		"letter-spacing": "1.25px",
		"text-transform": "uppercase",
		color: "#2196F3",
	},
}));

function closeMapArticelView() {
	let popUpWindow = myPopUpRef.current;
	if (popUpWindow) {
		popUpWindow.style.display = "none";
	}
}

export function openMapArticleView(news) {
	if (!news) {
		news = [];
	}
	let popUpWindow = myPopUpRef.current;

	if (popUpWindow) {
		var divWrapper = document.createElement('div');
		for (const article of news) {
			let divInner = document.createElement('div');
			var element = (<NewsListElement article={article} />);
			ReactDOM.render(element, divInner);
			divWrapper.appendChild(divInner);
		}
		var fillerBottom = document.createElement('div');
		fillerBottom.classList.add("FillerBottom")
		divWrapper.appendChild(fillerBottom);
		popUpWindow.replaceChild(divWrapper, popUpWindow.firstElementChild);
		popUpWindow.style.display = "inherit";
	}
	buttonRef.current.focus();
}

export default function MyMapArticleView() {
	const classes = useStyles();

	return (
		<div ref={myPopUpRef} className={classes.rootDiv}>
			<div />
			<Fab variant="extended" size="small" aria-label="add" className={classes.rootButton} onClick={closeMapArticelView} ref={buttonRef}>
				<CloseRoundedIcon/>
				close
			</Fab>
		</div>
	);
}