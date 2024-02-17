import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap"; 

export  default function ListTask(){
    const navigate=useNavigate();
    const[inputs, setInputs]=useState([]);

    const {id}=useParams();

useEffect(()=>{
    getTask();
},[]);

function getTask(){
axios.get(`http://localhost:80/api/task/${id}`,inputs).then(function(response){
    console.log(response.data);
    setInputs(response.data);
});
}
const handleChange=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setInputs(values=>({...values,[name]:value}))

}
    const handleSumbit=(event)=>{
        event.preventDefault();
        axios.put(`http://localhost:80/api/task/${id}/edit`,inputs).then(function(response){
            console.log(response.data);
            navigate('/');

        });
    }
    

    return(
        <div className="forma">
            <h1>Edit Task</h1>
            <form onSubmit={handleSumbit}>
                <label className="label">Korisnik: </label>
                <input value={inputs.korisnik} type="text" name="korisnik" onChange={handleChange}/>
                <br/>
                <label className="label">Naziv: </label>
                <input value={inputs.naziv} type="text" name="naziv"onChange={handleChange}/>
                <br/>
                <label className="label">Opis: </label>
                <textarea
                    value={inputs.opis}
                    rows = {4}    // Specifies the number of visible text lines
                    cols = {30}    // Specifies the width of the textarea in characters
                    placeholder = "Add your text"   // Specifies a short hint that describes the expected value of the textarea
                    wrap = "soft"   // Specifies how the text in the textarea should be wrapped
                    name = "opis"   // Specifies the name of the textarea, which can be used when submitting a form
                    maxLength = {200}   // Specifies the maximum number of characters allowed in the textarea
                    onChange={handleChange}/>                
            <br/>
            <label className="label">Rok</label>
            <input value={inputs.rok} type="date" name="rok"onChange={handleChange}/>
                <br/>
            <br/>
            <button>Sačuvaj</button>
            </form>
        </div>
    )
    }