import React from 'react'
import '../../App.css';


const ReservationsList = (props) => {
  let { filterString, reservations, toggleCheckedIn } = props
  
  reservations = reservations.sort((a, b) => {
    if(a.willCallLastName < b.willCallLastName) {return -1}
    if(a.willCallLastName > b.willCallLastName) {return 1}
    if(a.willCallLastName === b.willCallLastName) return (a.id - b.id)
    return 0
  })

  filterString = filterString.toLowerCase()
  let filterRezzies = reservations.filter(rezzy => rezzy.willCallLastName.toLowerCase().includes(filterString) || rezzy.willCallFirstName.toLowerCase().includes(filterString))

  const isPresent =(status)=>{
    if (status === 1) {
      return <span id="switchLabel" style={{color: '#ff420f'}}>Absent</span>
    }
    else if (status === 2) {
      return <span id="switchLabel" style={{color: '#460088'}}>Present</span>
    }
  }


  return (
    <div className='Reservations'>
      {filterRezzies.length > 0 ?

        filterRezzies.map(reservation => {
          const { willCallFirstName, willCallLastName, orderedByFirstName, orderedByLastName } = reservation
          const lastName = willCallLastName
          const firstName = willCallFirstName

          if (reservation.status === '3') return null

          return <li className="list-group-item admin-list-item" 
            key={reservation.id} 
            id={reservation.id}
            style={{  borderRadius: '1px', padding: '.1rem .5rem' }}>
          <div className="row" id={reservation.id}>
            <div className="col-sm-8 list-item-font" id={reservation.id}> 
              <strong style={{fontSize: '18px'}}>{lastName}, {firstName}</strong>
              <br />
              Alt: {orderedByLastName}, {orderedByFirstName}
            </div>
            <div className="col-md-4 text-right" id={reservation.id}>
            {isPresent(reservation.status)}
              <label className="switch ml-2">
                <input type="checkbox" 
                className="default" 
                checked={reservation.status === 2 ? 'checked' : ''}
                onChange={event=>toggleCheckedIn(event.target.checked, reservation)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </li>
        }
        )
        : 'Reservations not found'}
    </div>
  )
}

export default ReservationsList;