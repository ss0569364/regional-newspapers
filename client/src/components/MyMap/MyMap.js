import './MyMap.css';
import React, { Component } from 'react';
import FilterPaper from '../FilterSearch/FilterPaper';
import MyMapArticleView, { openMapArticleView } from "./CreateMapArticleView";
import { getNewsOnlyWithGeoLocation } from '../ServicesAPI/newsAPI';


class MyMap extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		localStorage.setItem('count', 0);
	}

	componentDidMount() {
		this.createMapView();
	}

	createMapView() {
		var attribution = new window.ol.control.Attribution({
			collapsible: false
		});

		var map = new window.ol.Map({
			controls: window.ol.control.defaults({ attribution: false }).extend([attribution]),
			layers: [
				new window.ol.layer.Tile({
					source: new window.ol.source.OSM({
						attributions: [window.ol.source.OSM.ATTRIBUTION, 'Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>'],
					})
				})
			],
			target: 'map',
			view: new window.ol.View({
				center: window.ol.proj.fromLonLat([JSON.parse(localStorage.getItem('Geo'))['lng'], JSON.parse(localStorage.getItem('Geo'))['lat']]), //Berlin
				zoom: 16
			})
		});

		var layer = new window.ol.layer.Vector({
			source: new window.ol.source.Vector({
				features: this.createNewsPoints(),
			})
		});
		map.addLayer(layer);

		map.on('singleclick', function (event) {
			var article = map.forEachFeatureAtPixel(event.pixel,
				function (feature) {
					return feature.values_.article;
				});
			if (map.hasFeatureAtPixel(event.pixel) === true) {
				openMapArticleView([article]);
			} 
		});
	}

	createNewsPoints() {
		var allPoints = [];
		var dbIcon = { "rssFeed": "./newspaper.png", "drucksachen": "./berlinerBaer.png" };

		for (const dbIndex in dbIcon) {
			for (const article of getNewsOnlyWithGeoLocation(dbIndex)) {
				var pointFeature = new window.ol.Feature({
					geometry: new window.ol.geom.Point(window.ol.proj.fromLonLat([article.GeoLNG, article.GeoLAT])),
					"article": article
				})

				var pointStyle = new window.ol.style.Style({
					image: new window.ol.style.Icon(({
						anchor: [0.5, 46],
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixels',
						src: dbIcon[dbIndex]
					}))
				});

				pointFeature.setStyle(pointStyle);
				allPoints.push(pointFeature);
			}

		}
		return allPoints;
	}

	render() {
		return (
			<div className={this.props.className}>
				<FilterPaper />
				<div id="map" style={{ height: "100%", width: "auto", margin: "0 5%", marginTop: "2em" }}></div>
				<MyMapArticleView />
			</div>
		)
	}
}

export default React.memo(MyMap);