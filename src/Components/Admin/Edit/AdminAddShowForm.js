import React from 'react'
import '../../../App.css';

const AdminAddShowForm = (props) => {
    console.log("pickup lOcations in AdminAddShowForm:  ", props.pickupLocations)
    let d = new Date()
    let n = d.getFullYear()
    const years = [n, n+1]
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,  23, 24, 25, 26, 27, 28, 29, 30, 31]

    return (
        <div className="bts-white-bg p-2 border border-dark">
            Admin Add Show Form Component
            <div>
                <form>
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="year"><strong>Year: </strong></label>
                                <select className="form-control" id="year" onChange={e=>props.handleAddShowChange(e)}>
                                    {years.map((year, i) =>
                                    <option key={i}>{year}</option>
                                    )}       
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="month"><strong>Month: </strong></label>
                                <select className="form-control" id="month" onChange={e=>props.handleAddShowChange(e)}>
                                    {months.map((month, i) =>
                                    <option key={i}>{month}</option>
                                    )}       
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="day"><strong>Day: </strong></label>
                                <select className="form-control" id="day" onChange={e=>props.handleAddShowChange(e)}>
                                    {days.map((day, i) =>
                                    <option key={i}>{day}</option>
                                    )}       
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="headliner">Headliner / Title (Required)</label>
                        <input type="text" className="form-control" id="headliner" placeholder="" onChange={e=>props.handleAddShowChange(e)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="support1">Support 1 (if applicable)</label>
                        <input type="text" className="form-control" id="support1" placeholder=""  onChange={e=>props.handleAddShowChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="support2">Support 2 (if applicable)</label>
                        <input type="text" className="form-control" id="support2" placeholder="" onChange={e=>props.handleAddShowChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="support3">Support 3 (if applicable)</label>
                        <input type="text" className="form-control" id="support3" placeholder="" onChange={e=>props.handleAddShowChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="venue">Venue (required)</label>
                        <select className="form-control" id="venue" onChange={e=>props.handleAddShowChange(e)}>
                            <option>Red Rocks Amphitheatre</option>
                            <option>1stbank Center</option>
                            <option>Mission Ballroom</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="headlinerBio">Headliner Bio / Event Description (if applicable)</label>
                        <textarea className="form-control" id="headlinerBio" rows="3" onChange={e=>props.handleAddShowChange(e)}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="headlinerImgLink">Headliner Image Link (if applicable)</label>
                        <textarea className="form-control" id="headlinerImgLink" rows="1" onChange={e=>props.handleAddShowChange(e)}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="showStartTime">Show Start Time (required)   </label>
                        <select className="form-control" id="showStartTime" onChange={e=>props.handleAddShowChange(e)} required>
                            {props.dropdownTimes.map((time) =>
                                <option key={time.i}>{time.hours} : {time.minutes} {time.ampm} (id: {time.i})</option>
                            )}       
                        </select>
                    </div>
                    <div className="form-check border border-info p-2">
                        <div><strong>Check box next to each Departure Location and select desired Departure Time</strong></div>
                        {props.pickupLocations.map(location =>
                        <div className="row m-2" key={location.id}>
                            <div className="col-6">
                                <input className="form-check-input" type="checkbox" value="" id={`checkBox${location.id}`} onChange={e=>props.handleAddShowChange(e, location)}/>
                                <label className="form-check-label" htmlFor={`checkLabel${location.id}`}>
                                    <strong>id: {location.id}</strong> {location.locationName}<br/>
                                    <div className="pl-2 col-8">
                                        {location.streetAddress}
                                    </div>
                                </label>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label htmlFor={`departureTime${location.id}`}><strong>Departure Time: </strong></label>
                                    <select className="form-control" id={`departureTime${location.id}`} onChange={e=>props.handleAddShowChange(e, location)}>
                                        {props.dropdownTimes.map((time) =>
                                        <option key={time.i}>{time.hours} : {time.minutes} {time.ampm} (id: {time.i})</option>
                                        )}       
                                    </select>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label htmlFor={`price${location.id}`}><strong>Price: $</strong></label>
                                    <input className="form-control form-control-sm col-6" id={`price${location.id}`} type="number" maxLength="8" size="8" placeholder={location.basePrice} onChange={e=>props.handleAddShowChange(e, location)}/>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <button type="button" id="addShowSubmit" className="btn bts-orange-bg" onClick={(e)=> props.handleAddShowSubmit(e)}>Add Show</button>
                </form>
            </div>
        </div>
    )
}
export default AdminAddShowForm;