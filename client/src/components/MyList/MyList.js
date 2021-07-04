import './MyList.css';
import React, { Component } from 'react';
import NewsListElement from '../NewsListElement/NewsListElement';
import FilterPaper from '../FilterSearch/FilterPaper';
import MyScrollTrigger from "../ServicesAPI/CreateScrollTrigger";
import { getNewsInOneArray, getAllNewsSortByDate, getSortedNews, setSortedNews } from '../ServicesAPI/newsAPI';


class MyList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trigger: (<div />),
			displayNews: [],
		}
		this.displayElements();
		localStorage.setItem('count', 1);
	}

	componentDidMount() {
		this.setState({ "trigger": (<MyScrollTrigger />) });
	}

	displayElements() {
		if (getNewsInOneArray().length !== getSortedNews().length) {
			let sortedNews = getAllNewsSortByDate();
			setSortedNews(sortedNews);
			console.log("sorted news were updated")
			this.state.displayNews = sortedNews;
		} else {
			console.log("sorted news were loaded") 
			this.state.displayNews = getSortedNews();
			
		}
	}

	render() {
		return (
			<div style={{ maxHeight: "100%" }}>
				<FilterPaper />
				{this.state.displayNews.map((article) => (
					<NewsListElement article={article} />
				))}
				{this.state.trigger}
			</div>
		)
	}
}

export default React.memo(MyList);