import React from 'react'
import '../../../App.css';

const AdminReservationsList = (props) => {

  let { filterString, reservations, updateReservation, updateReservationName, cancelPrompt, cancelPromptId, newWillCallFirst, newWillCallLast } = props

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
            <div className="col-sm-8 list-item-font px-2" id={reservation.id} style={{color: statusColor}}>
              <div style={{fontSize: '16px'}}>Name: {willCallLastName}, {willCallFirstName}
              <button
                type="button"
                className="m-1 p-1"
                id="openNameChangeForm"
                onClick={e=>props.openNameChangeForm(e, reservation.id)} >
                Open Name Change Form
              </button>
              {props.displayNameChange === reservation.id ?
                <form>
                  <div>
                    Transfer To First Name:
                    <input
                      style={{width:"12em"}}
                      className="mx-2"
                      type="text"
                      id="willCallFirstName"
                      ref={newWillCallFirst}
                      placeholder={willCallFirstName}
                      onChange={e=>props.changeName(e, reservation.id)}/>
                  </div>
                  <div>
                    Transfer To Last Name:
                    <input
                      style={{width:"12em"}}
                      className="mx-2"
                      type="text"
                      id="willCallLastName"
                      ref={newWillCallLast}
                      placeholder={willCallLastName}
                      onChange={e=>props.changeName(e)}/>
                  </div>
                  <div className="row">
                  {props.displayVerifyNameChangePrompt === reservation.id ?
                    <div className="mx-auto">
                      Are you sure?
                      <button
                        type="button"
                        className="btn btn-danger m-2 p-2"
                        id="willCallFirstName"
                        onClick={e=>props.updateReservationName(reservation.id)} >
                        Yes..Submit Already!
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary m-2 p-2"
                        id="willCallFirstName"
                        onClick={e=>props.toggleVerifyNameChangePrompt(0)} >
                        Let's hold off
                      </button>
                    </div>
                    :
                    <div className="row mx-auto">
                      <button
                        type="button"
                        className="btn btn-success m-2 p-2"
                        id="submitNewName"
                        onClick={e=>props.toggleVerifyNameChangePrompt(reservation.id)} >
                        Submit New Name
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark m-2 p-2"
                        id="closeNameChangeForm"
                        onClick={e=>props.openNameChangeForm(0)} >
                        Close Form
                      </button>
                    </div>
                  }
                  </div>
                </form>
                : ''}
              <br />
              Alt: {orderedByLastName}, {orderedByFirstName}
              <br />
              <strong style={{fontSize: '18px'}}>{orderedByEmail}</strong>
              </div>
              {cancelPromptId === reservation.id ?
                <div className="alert alert-danger" role="alert" style={{color: 'red'}}>
                <strong>Cancel this reservation?</strong><br/>
                  <button onClick={e=>updateReservation(reservation, 4)} type="button" className="btn btn-success ml-1 px-2" style={{width:"4em"}}>Yes</button>
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
                  : status === 4 ?
                    <div>
                      <span style={{color: 'grey'}}>Reservation Cancelled</span>
                      <button onClick={e=>updateReservation(reservation, 3)} type="button" className="btn admin-detail-btn px-2">Refunded</button>
                    </div>
                    :
                    <span style={{color: 'grey'}}>Reservation Refunded</span>
                  }
            </div>
          </div>
        </li>
        })
        : 'Reservations not found'}
    </div>
  )
}

export default AdminReservationsList
