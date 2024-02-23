import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListTask(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        getTask();
    }, []);

    function getTask(){
        fetch('https://localhost:8000/api/tasks/'+id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setInputs(data);
            })
            .catch(error => console.error('Error:', error));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
        console.log(inputs);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://localhost:8000/api/tasks/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/');
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className="forma">
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <label className="label">Korisnik: </label>
                <input value={inputs.korisnik} type="text" name="korisnik" onChange={handleChange}/>
                <br/>
                <label className="label">Naziv: </label>
                <input value={inputs.naziv} type="text" name="naziv" onChange={handleChange}/>
                <br/>
                <label className="label">Opis: </label>
                <textarea
                    value={inputs.opis}
                    rows={4}
                    cols={30}
                    placeholder="Add your text"
                    wrap="soft"
                    name="opis"
                    maxLength={200}
                    onChange={handleChange}
                />                
                <br/>
                <label className="label">Rok: </label>
                <input value={inputs.rok} type="date" name="rok" onChange={handleChange}/>
                <br/><br/>
                <button type="submit">Sačuvaj</button>
            </form>
        </div>
    )
}
