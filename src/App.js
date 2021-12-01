import './App.css';
import SearchBar from './components/Search';
import Table from './components/Table';

function App() {
  return (
    <div className="lgray">
      <div className='container p-3'>
        <h2 className="p-3 text-center">Pokemon Team Analyzer</h2>
        <p className=" px-lg-5 mx-lg-5 p-2 gray">Welcome! Here you can perform analysis for various Pokemon teams, 
        studying each Pokemon's strengths and weaknesses. I hope this is a helpful teambuilding tool 
        for both casual and competitive players. 
        </p>
        <h4 className="pt-5">Pokemon Team:</h4>
        <SearchBar/>
        <Table/>
        <div className='d-flex justify-content-evenly m-3'>
          <button className='btn btn-dark rounded-pill'>Analyze</button>
          <button className='btn btn-dark rounded-pill'>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;
