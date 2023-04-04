import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(-1);


  const getData = async () => {
    try{
      const res = await fetch("https://sheet.best/api/sheets/eada12a3-a7f2-40af-99f9-1b72c97149f0");
      const data = await res.json();
      setData(data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const renderTableRows = () => {
    return data.filter((row) => {
      if (searchTerm === '') {
        return true;
      }
      return row['Compte de référence'].toLowerCase().includes(searchTerm.toLowerCase());
    }).map((row, index) => {
      const isEditing = index === editIndex;
      return (
        <tr key={index} onClick={() => setEditIndex(index)}>
          <td>{index + 1}</td>
          <td>
            {isEditing ? (
              <input
                type="text"
                value={row['Compte de référence']}
                onChange={(event) => {
                  const newData = [...data];
                  newData[index]['Compte de référence'] = event.target.value;
                  setData(newData);
                }}
              />
            ) : (
              row['Compte de référence']
            )}
          </td>
          <td>{row['Date']}</td>
          <td>{row['Montant ']}</td>
          <td>{row['devise ']}</td>
          <td>{row['Libellé 1']}</td>
          <td>{row['Libellé 2 ']}</td>
          <td>{row['Rapproché ']}</td>
          <td>{row['Pièce jointe ']}</td>
        </tr>
      );
    });
  };
  
  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par référence"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className = "search-bar"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Compte de référence</th>
            <th>Date</th>
            <th>Montant</th>
            <th>devise</th>
            <th>Libellé 1</th>
            <th>Libellé 2</th>
            <th>Rapproché</th>
            <th>Pièce jointe</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
