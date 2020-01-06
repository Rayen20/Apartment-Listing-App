import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getApartments } from '../queries/query';
import List from './List';
import Filter from './Filter';
import Navbar from './Navbar';
import MapContainer from './MapContainer';

export default function Landing() {

  const [ showLanding, setShowLanding ] = useState(true);
  const [ showMap, setShowMap ] = useState(true);
  
  const { loading, error, data } = useQuery(getApartments);

  const clickHandler = () => {
    setShowLanding(!showLanding);
  };

  const displayHandler = () => {
    if (showMap) {
      return <MapContainer array={data.apartments} loading={loading} error={error} />
    } else {
      return <List array={data.apartments} loading={loading} error={error} />
    }
  }

  const landingPage = () => {
    if (showLanding && data) {
      return <MapContainer array={data.apartments} loading={loading} error={error} />
    } else {
      return <Filter />
    }
  }

  return (
    <div>
      <Navbar clickHandler={clickHandler} />
      { landingPage() } 
    </div>
  )
}
