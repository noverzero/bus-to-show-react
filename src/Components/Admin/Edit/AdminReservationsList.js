import React from 'react'
import '../../../App.css';

const AdminReservationsList = (props) => {

  let { filterString, reservations, cancelReservation, cancelPrompt, cancelPromptId } = props

  reservations = reservations.sort((a, b) => {
    let aLastName = a.willCallLastName.toLowerCase()
    let bLastName = b.willCallLastName.toLowerCase()
    if(aLastName < bLastName) {return -1}
    if(aLastName > bLastName) {return 1}
    if(aLastName === bLastName) return (a.id - b.id)
    return 0
  })

  filterString = filterString.toLowerCase()
  let filterRezzies = reservations.filter(rezzy => rezzy.orderedByFirstName.toLowerCase().includes(filterString) || rezzy.orderedByLastName.toLowerCase().includes(filterString) ||rezzy.willCallLastName.toLowerCase().includes(filterString) || rezzy.willCallFirstName.toLowerCase().includes(filterString) ||
  rezzy.orderedByEmail.toLowerCase().includes(filterString))

  return (
    <div className='Reservations'>
      {filterRezzies.length > 0 ?
        filterRezzies.map(reservation => {
          const { willCallFirstName, willCallLastName, orderedByFirstName, orderedByLastName, orderedByEmail, status } = reservation
          const statusColor = status > 2 ? 'grey' : ''
          
          return <li className="list-group-item admin-list-item"
            key={reservation.id}
            id={reservation.id}
            style={{  borderRadius: '1px', padding: '.1rem .5rem' }}>
          <div className="row" id={reservation.id}>
            <div className="col-sm-8 list-item-font" id={reservation.id} style={{color: statusColor}}>
              <div style={{fontSize: '16px'}}>Name: {willCallLastName}, {willCallFirstName}
              <br />
              Alt: {orderedByLastName}, {orderedByFirstName}
              <br />
              <strong style={{fontSize: '18px'}}>{orderedByEmail}</strong>
              </div>
              {cancelPromptId === reservation.id ?
                <div className="alert alert-danger" role="alert" style={{color: 'red'}}>
                <strong>Cancel this reservation?</strong><br/>
                  <button onClick={e=>cancelReservation(reservation)} type="button" className="btn btn-success ml-1 px-2" style={{width:"4em"}}>Yes</button>
                  <button onClick={e=>cancelPrompt(reservation.id, false)} type="button" className="btn btn-danger ml-1 px-2" style={{width:"4em"}}>No</button>
                </div>
              : status === 1 ? 
                  <button type="button" 
                    className="btn admin-detail-btn btn-block my-2" 
                    onClick={e=>{cancelPrompt(reservation.id, true)}}>
                    <span style={{color: 'red'}}>Cancel this Reservation</span>
                  </button>
                : status === 2 ? 
                  <span style={{color: 'grey'}}>Reservation Checked In</span>
                  :
                  <span style={{color: 'grey'}}>Reservation Cancelled</span>}
            </div>
          </div>
        </li>
        })
        : 'Reservations not found'}
    </div>
  )
}

export default AdminReservationsList