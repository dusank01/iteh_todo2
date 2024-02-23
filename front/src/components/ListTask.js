import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        fetch('https://localhost:8000/api/tasks')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTasks(data);
            })
            .catch(error => console.error('Error:', error));
    }

    const deleteTask = (id) => {
        fetch('https://localhost:8000/api/tasks/'+ id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getTasks();
        })
        .catch(error => console.error('Error:', error));
    }

    return (
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
                    {tasks.map((task, key) =>
                        <tr key={key}>
                            <td>{task.korisnik}</td>
                            <td>{task.naziv}</td>
                            <td>{task.opis}</td>
                            <td>{task.rok}</td>
                            <td id='opcija'>
                                <Link id='edit' to={`task/${task.id}/edit`}>EDIT</Link>
                                <button id='delete' onClick={() => deleteTask(task.id)}>DELETE</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
