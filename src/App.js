import {BrowserRouter,Routes,Route, Link} from 'react-router-dom';
import './App.css';
import CreateTask from './components/CreateTask';
import ListTask from './components/ListTask';
import EditTask from './components/EditTask';

function App() {
  return (
    <div className="App">
      
			<h2>
			Dobrodošli na aplikaciju za planiranje, 
      </h2>
      <BrowserRouter>
      <ul>
      <li><Link to="/">List task</Link></li>
      <li><Link to="task/create">Create task</Link></li>
      </ul>
      <Routes>
      <Route index element={<ListTask />}/>

        <Route path="task/create" element={<CreateTask />}/>
        <Route path="task/:id/edit" element={<EditTask />}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
