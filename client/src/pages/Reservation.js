import React,{useState} from 'react'
import TableDetails from '../components/TableDetails'
import MyReservation from '../components/MyReservation'





const Reservation = () => {

  const [activeTab, setActiveTab] = useState('tab1');

  const tabDetails = [
    { id: 'tab1', name: 'Table Details', component: <TableDetails /> },
    { id: 'tab2', name: 'My Reservation', component: <MyReservation /> },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
        <div className="tabs">
        {tabDetails.map((tab) => (
          <button
            key={tab.id}
            className={`tab btn btn-primary mx-2 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className='tab-content'>
      {tabDetails.map((tab) => activeTab === tab.id && tab.component)}
      </div>
    </div>
    
  )
}

export default Reservation