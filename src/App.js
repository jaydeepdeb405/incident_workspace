import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import icon from './images/react-favicon.ico';
import Favicon from 'react-favicon';
import MetaTags from 'react-meta-tags';
import RestMessage from "./RestMessage";
import M from './materialize/materialize.min';
import IncidentComponent from './components/IncidentComponent';
import PreloaderComponent from './components/PreloaderComponent';
import axios from 'axios';
import RecordWatcher from "./RecordWatcher";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            fields: ["Number","Short description","Caller","Priority","State","Category"],
            incidents: []
        }
    }

    async componentDidMount() {
        new RecordWatcher().watch('incident', '', (response) => this.updateIncident(response));
        
        const data = await axios.post('/api/now/graphql', {
            query: `query {
                x488924 {
                    incident {
                        getIncidents(limit: 10, encodedQuery: "active=true", orderBy: "sys_updated_on") {
                            sys_id
                            number
                            short_description
                            caller_id
                            priority
                            state
                            category
                        }
                    }
                }
            }`,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const incidents = data.data.data['x488924'].incident['getIncidents'].map(element => {
            let incident = {};
            Object.keys(element).forEach(field => {
                incident[field] = {};
                incident[field].display_value = element[field].match(/display_value=(.*),/)[1];
                incident[field].value = element[field].match(/, value=(.*)}/)[1];
            });
            return incident;
        });
        this.setState({ loading: false, incidents });
    }
    
    updateIncident = (response) => {
        const updatedRecordSysId = response.data.sys_id;
        let incidents = this.state.incidents;
        for (let index in incidents) {
            if (incidents[index].sys_id.value === updatedRecordSysId) {
                response.data.changes.forEach((fieldName) => {
                    if (incidents[index][fieldName]) {
                        incidents[index][fieldName].display_value = response.data.record[fieldName].display_value;
                        incidents[index][fieldName].value = response.data.record[fieldName].value;
                        incidents[index][fieldName].modified = true;
                        incidents[index][fieldName].tooltip = `${response.data.record.sys_updated_by.display_value} has modified this field value`;
                    }
                });
                break;
            }
        }
        this.setState({ incidents });
    }

    render() {
        return (
            <>
                {/* Favicon plugin to insert HTML header icon */}
                <Favicon url={icon} />
                {/* MetaTags plugin to insert html metadata */}
                <MetaTags>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </MetaTags>
                {/* Setting base url path for the application, in development mode */}
                <Router basename={process.env.APP_URL_BASE}>
                    <Switch>
                        <Route path="/">
                            <div className="container">
                                {this.state.loading === true ?
                                    <PreloaderComponent /> :
                                    <IncidentComponent fields={this.state.fields} incidents={this.state.incidents} />
                                }
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </>
        )
    };
}
