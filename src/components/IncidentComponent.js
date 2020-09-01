import React from 'react'
import './IncidentComponent.scss';

export default function IncidentComponent(props) {
    return (
        <div className="card z-depth-2" style={{ marginTop: '10vh' }}>
            <div className="card-content">
                <span className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Incidents</span>
                    <a className="waves-effect waves-light btn blue right-align">New</a>
                </span>
                <table className="striped responsive-table">
                    <thead>
                        <tr>
                            {props.fields.map((field, fIndex) => {
                                return <th key={fIndex}>{field}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {props.incidents.map((incident, index) => {
                            let fields = Object.keys(incident).filter(field => (field !== 'sys_id' && field !== 'modified'));
                            return <tr key={index}>{
                                fields.map((field, cIndex) => {
                                    return <td className="col" key={cIndex}>
                                        {incident[field].modified === true?
                                            <span className="recordModifiedWrapper">
                                                <span className="recordUpdatedTooltip">{incident[field].tooltip}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" ariaHidden="true" viewBox="0 0 12 12" className="recordUpdatedIcon" undefined="">
                                                    <g stroke="none" fillRule="none"><path d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0zm1.575 4.526L5.327 8.954 3.623 6.08l-.62.923H1.101a5.002 5.002 0 0 0 9.798 0H9.06L7.575 4.526zM6 1a5 5 0 0 0-5 5.002h1.47L3.676 4.21l1.583 2.67 2.243-4.42 2.123 3.544L11 6.002a5 5 0 0 0-4.783-4.997z" fillRule="currentColor"></path></g>
                                                </svg>
                                            </span>
                                            : null}
                                        <span>{incident[field].display_value}</span>
                                    </td>
                                })
                            }</tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
