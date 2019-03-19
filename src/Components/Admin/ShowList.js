import React from 'react'
import '../../App.css';
import moment from 'moment'
// import MediaQuery from 'react-responsive';

const ShowList = (props) => {
  let { filterString, shows, makeSelection } = props

  filterString = filterString.toLowerCase()
  let filterShows = shows.filter(show => show.headliner.toLowerCase().includes(filterString))

  if (filterShows.length === 0) {
    filterShows = shows.filter(show => show.venue.toLowerCase().includes(filterString))
  }

  return (
    <div className='Shows'>
        {filterShows.length > 0 
          ? 
          filterShows.map(show =>
            <li className="list-group-item admin-list-item" 
                key={show.id} 
                id={show.id}>
              <div className="row" id={show.id}>
                <div className="col-md-10 list-item-font" id={show.id} style={{  borderRadius: '1px', padding: '.1rem .5rem' }}> 
                <strong style={{fontSize: '20px'}}>{show.headliner}</strong>
                <br />
                {show.date} - {show.venue}
                <br />
                </div>
                  <button
                    id={show.id}
                    onClick={e => makeSelection('eventId', show.id, 'PickupsList')}
                    type="button"
                    className='btn admin-detail-btn my-4 col-md-2'>Select</button>
              </div>
            </li>) 
          : 
          ''}
    </div>
  )
}

export default ShowList;