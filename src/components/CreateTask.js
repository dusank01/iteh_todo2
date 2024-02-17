import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask(){
    const navigate=useNavigate();
    const[inputs,setInputs] = useState([])
    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setInputs(values=>({...values,[name]:value}))

    }
    const handleSumbit=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:80/api/task/save/index.php',inputs).then(function(response){
            console.log(response.data);
            navigate('/');

        });
    }
    

    return(
        <div>
            <h1>Create Task</h1>
            <form onSubmit={handleSumbit}>
                <label>Korisnik:</label>
                <input type="text" name="korisnik" onChange={handleChange}/>
                <br/>
                <label>Naziv:</label>
                <input type="text" name="naziv"onChange={handleChange}/>
                <br/>
                <label>Opis:</label>
                <textarea
                    rows = {4}    // Specifies the number of visible text lines
                    cols = {30}    // Specifies the width of the textarea in characters
                    placeholder = "Add your text"   // Specifies a short hint that describes the expected value of the textarea
                    wrap = "soft"   // Specifies how the text in the textarea should be wrapped
                    name = "opis"   // Specifies the name of the textarea, which can be used when submitting a form
                    maxLength = {200}   // Specifies the maximum number of characters allowed in the textarea
                    onChange={handleChange}
/>                
            <br/>
            <label>Rok:</label>
            <input type="date" name="rok"onChange={handleChange}/>
                <br/>
            <br/>
            <button>Sačuvaj</button>
            </form>
        </div>
    )
}