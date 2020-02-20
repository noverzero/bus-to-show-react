import React from 'react'
import '../../../App.css';

const AdminAddShowForm = (props) => {
    console.log("pickup lOcations in AdminAddShowForm:  ", props.pickupLocations)

    let hour = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    let min = ["00", "15", "30"]
    return (
        <div className="bts-white-bg p-2 border border-dark">
            AdminAddShowForm Component
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="headliner">Headliner</label>
                        <input type="text" className="form-control" id="headliner" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="support1">Support 1</label>
                        <input type="text" className="form-control" id="support1" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="support2">Support 2</label>
                        <input type="text" className="form-control" id="support2" placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="venue">Venue</label>
                        <select className="form-control" id="venue">
                            <option>Red Rocks Amphitheatre</option>
                            <option>1stbank Center</option>
                            <option>Mission Ballroom</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="showStartTime">Show Start Time</label>
                        <select className="form-control" id="showStartTime">
                            {props.dropdownTimes.map((time) =>
                                <option key={time.i}>{time.hours} : {time.minutes} {time.ampm}</option>
                            )}       
                        </select>
                    </div>
                    <div className="form-check border border-info p-2">
                        <div><strong>Check box next to each Departure Location and select desired Departure Time</strong></div>
                        {props.pickupLocations.map(location =>
                        <div className="row m-2" key={location.id}>
                            <div className="col-6">
                                <input className="form-check-input" type="checkbox" value="" id={`checkBox${location.id}`}/>
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
                                    <select className="form-control" id={`departureTime${location.id}`}>
                                        {props.dropdownTimes.map((time) =>
                                        <option key={time.i}>{time.hours} : {time.minutes} {time.ampm}</option>
                                        )}       
                                    </select>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label htmlFor={`price${location.id}`}><strong>Price: $</strong></label>
                                    <input className="form-control form-control-sm col-6" id={`price${location.id}`} type="number" maxLength="8" size="8" placeholder={location.basePrice}/>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="button" className="btn bts-orange-bg" onClick={()=> {console.log("Add Show clicked")}}>Add Show</button>
                </form>
            </div>
        </div>
    )
}
export default AdminAddShowForm;