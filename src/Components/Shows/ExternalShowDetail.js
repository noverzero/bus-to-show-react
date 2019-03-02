
import React from 'react';

const ExternalShowDetail = (props) => {
  const displayShow = props.displayShow
  return (
    <div className="border bts-orange-border bts-white-bg p-4 m-2">
      <h4> {`${displayShow.headliner} + ${displayShow.support1}`}</h4>
      {console.log('displayShow inside ExternalShowDetial Component:', displayShow)}
      <div>
        <iframe
          title="external-event"
          src={`https://eventbrite.com/tickets-external?eid=${displayShow.external}&ref=etckt`}
          frameBorder="0"
          height="600 vh"
          width="100%"
          vspace="0"
          hspace="0"
          marginHeight="5"
          marginWidth="5"
          scrolling="auto">
        </iframe>
      </div>
    </div>
  )
}

export default ExternalShowDetail  //component function name should match component file name (best practice)
