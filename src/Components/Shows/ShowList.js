import React from 'react'
import '../../App.css';
import Show from './Show'
import MediaQuery from 'react-responsive';

const ShowList = (props) => {
  return (
    <div className='ShowList'>
      {/* Desktop View */}
      <MediaQuery minWidth={8}>
        <div className='container'>
          <div className="list-group">
            <div className="list-group-item show-header">

              <div className="row show-list-flex">

                <div className="col-3 mb-3" onClick={props.sortByDate}>
                  <button type="button" className="btn btn-outline-light sort-btn">
                    <strong>Date  </strong>
                    <i className={props.sortedByDate ? "fa fa-sort-down" : ''}></i>
                  </button>

                </div>

                <div className="col-3 mb-3" onClick={props.sortByArtist}>
                  <button type="button" className="btn btn-outline-light sort-btn">
                    <strong>Event  </strong>
                    <i className={props.sortedByArtist ? "fa fa-sort-down" : ''}></i>
                  </button>

                </div>

                <div className="col-6 mb-3" >
                  <form className="form-inline float-right">
                    <input onKeyUp={props.searchShows} className="form-control search-bar" type="search" placeholder="Search..." aria-label="Search"></input>
                  </form>
                </div>

              </div>
              <ul className="list-group" >
                {props.shows ?
                  <div>
                    <Show
                      confirmedRemove={props.confirmedRemove}
                      displayShow={props.displayShow}
                      filterString={props.filterString}
                      handleWarning={props.handleWarning}
                      inCart={props.inCart}
                      shows={props.shows}
                      showsExpandClick={props.showsExpandClick}
                      tabClicked={props.tabClicked} />
                  </div>
                  : ''}
              </ul>

            </div>
          </div>
        </div>
      </MediaQuery>
      {/* End Desktop View */}
    </div>


  )
}

export default ShowList;
