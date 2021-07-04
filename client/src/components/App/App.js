import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

import CreatePage from '../ServicesAPI/CreatePage'

import MyMap from '../MyMap/MyMap';
import MyList from '../MyList/MyList';
import AboutUs from '../AboutUs/AboutUs';
import Impressum from '../Impressum/Impressum';
import Home from '../Home/Home';
import Setting from '../Setting/Setting';
import { setNews, formatNewsDate } from '../ServicesAPI/newsAPI';
import {openPopUp} from "../ServicesAPI/CreatePopUp";
import * as localRssFeed from '../Data/RssFeed.json';
import * as localDrucksachen from '../Data/Drucksachen.json';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!localStorage.getItem("allData")) {
      this.initDbAll();
    }
  }

  initDb() {
    axios.get('http://localhost:5000/all').then(response => response.data).then((data) => {
      console.log("Backend data is used for RssFeed");
      setNews(data);
    }).catch(() => {
      console.log("Local data is used for RssFeed");
      setNews({ "rssFeed": localRssFeed.default, "drucksachen": localDrucksachen.default });
    });
  }

  initDbAll() {
    let allData = {
      "rssFeed": null,
      "drucksachen": null,
    };

    axios.get('http://localhost:5000/newsarticles').then(response => response.data).then((data) => {
      console.log("Backend data is used for RssFeed");
      allData.rssFeed = data;
      this.iniDbDrucksachen(allData);
    }).catch(() => {
      console.log("Local data is used for RssFeed");
      allData.rssFeed = localRssFeed.default;
      this.iniDbDrucksachen(allData);
    });
  }

  iniDbDrucksachen(allData) {
    axios.get('http://localhost:5000/printMaterials').then(response => response.data).then((data) => {
      console.log("Backend data is used for Drucksachen");
      allData.drucksachen = data;
      var formatedData = formatNewsDate(allData);
      setNews(formatedData);
    }).catch(() => {
      console.log("Local data is used for Drucksachen");
      allData.drucksachen = localDrucksachen.default;
      var formatedData = formatNewsDate(allData);
      setNews(formatedData);
    });
  }

  triggerOnlineOffline() {
    function updateOnlineStatus(event) {
      var noSignalIcon = document.getElementById("noSignal");
      var appOnline = navigator.onLine;

      appOnline ? window.location.reload() : openPopUp("Es besteht aktuell keine Verbindung zum Internet.");

      if (noSignalIcon) {
        noSignalIcon.style.display = appOnline ? "none" : "inherit";
      }
    }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }
  
  render() {
    this.triggerOnlineOffline();//Nur wenn es richtig weitergeleitet wird
    return (
      <Router>
        <Switch>
          <Route exact path="/home">
            <CreatePage component={Home} />
          </Route>
          <Route exact path="/map_view">
            <CreatePage component={MyMap} />
          </Route>
          <Route exact path="/list_view">
            <CreatePage component={MyList} />
          </Route>
          <Route exact path="/settings">
            <CreatePage component={Setting} />
          </Route>
          <Route exact path="/about_us">
            <CreatePage component={AboutUs} />
          </Route>
          <Route exact path="/impressum">
            <CreatePage component={Impressum} />
          </Route>
          <Route>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default React.memo(App);
