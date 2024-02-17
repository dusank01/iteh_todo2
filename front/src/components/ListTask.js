import {Link} from 'react-router-dom';

import axios from "axios";
import { useEffect,useState } from "react";
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap"; 

export default function ListTask(){
    const [tasks,setTasks]= useState([]);


    useEffect(()=>{
        getTasks();

    },[]);
    function getTasks(){

    
    axios.get('http://localhost:80/api/task/index.php').then(function(response){
        console.log(response.data);
        setTasks(response.data);
    });
    }

    const deleteTask=(id)=>{
        axios.delete(`http://localhost:80/api/task/${id}/delete`).then(function(response){
            console.log(response.data);
            getTasks();
        });
    }
    return(
        <div className="tabela">
        <h1>List Task</h1>
        <table>
            <thead>
                <tr>

                    <th>Korisnik</th>
                    <th>Naziv</th>
                    <th>Opis</th>
                    <th>Rok</th>
                    <th>Opcija</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task,key)=>
                <tr key={key}>
                    <td>{task.korisnik}</td>
                    <td>{task.naziv}</td>
                    <td>{task.opis}</td>
                    <td>{task.rok}</td>
                    <td id='opcija'>
                        <Link id='edit' to={`task/${task.id}/edit`}>EDIT</Link>
                        <button id='delete' onClick={()=>deleteTask(task.id)}>DELETE</button>
                    </td>

                </tr>
                )}
            </tbody>
        </table>
        </div>
    )
}