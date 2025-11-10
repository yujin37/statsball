import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [home, setHome] = useState('')

  useEffect(() => {
    axios.get('/api/home')
    .then(response => setHome(response.data))
    .catch(error => console.log(error))
  }, []);

  return (
    <div>
      환영합니다. statsball입니다. {home}
    
    </div>
  )
}

export default App;
