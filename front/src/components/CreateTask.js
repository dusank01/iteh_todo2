import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Style.css';

export default function CreateTask(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://localhost:8000/api/tasks', {
            method: 'POST',
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
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <label className="label">Korisnik: </label>
                <input type="text" name="korisnik" onChange={handleChange} />
                <br/>
                <label className="label">Naziv: </label>
                <input type="text" name="naziv" onChange={handleChange} />
                <br/>
                <label className="label">Opis: </label>
                <textarea
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
                <input type="date" name="rok" onChange={handleChange} />
                <br/><br/>
                <button type="submit">Sačuvaj</button>
            </form>
        </div>
    )
}
