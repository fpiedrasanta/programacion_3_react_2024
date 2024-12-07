import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { ImSpinner3 } from 'react-icons/im';

const Song = () => {
    const { idSong } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingForm, setLoadingForm] = useState(false);
    const [song, setSong] = useState({
        "title": "",
        "genreId": 1,
        "urlImage": "",
        "description": "",
        "id": 0
    });

    const fecthSong = async () => {
        setLoadingForm(true);
        try {
            let response = await fetch(`http://localhost:5088/Song/${idSong}`);
            
            console.log("Response: " + response);

            let json = await response.json();

            console.log("Json: " + json);

            setSong({
                "title": json.title,
                "genreId": 1,
                "urlImage": json.urlImage,
                "description": json.description,
                "id": json.id
            });
        } catch(e) {
            console.log("error");
        } finally {
            setLoadingForm(false);
        }
    }

    useEffect(() => {
        if(idSong != undefined) {
            fecthSong();
        }
    }, [idSong])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let response;

            if(idSong == undefined) {
                response = await fetch('http://localhost:5088/Song', {
                    method: 'POST',
                    body: JSON.stringify(song),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } else {
                response = await fetch('http://localhost:5088/Song', {
                    method: 'PUT',
                    body: JSON.stringify(song),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }

            const json = await response.json();

            setSong({
                "title": "",
                "genreId": 1,
                "urlImage": "",
                "description": "",
                "id": 0
            });

            alert(json.message);
        } catch(e) {
            alert("algo salió muy, pero muy mal");
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setSong({...song, [name]: value});

        console.log(song);
    }

    return (
        <>
            {
                loadingForm ? <div className='spinner'><ImSpinner3/></div> :
                    <>
                        <h2>{idSong != undefined ? "Editar canción" : "Nueva canción"}</h2>
                        <form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="txtTitle">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el título de la canción" onChange={handleInputChange} value={song.title} name="title"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="txtUrlImagen">
                                <Form.Label>Url de la imagen</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la URL de la imagen" onChange={handleInputChange} value={song.urlImage} name="urlImage"/>
                            </Form.Group>
                            <img src={`${song.urlImage}`} />
                            <Form.Group className="mb-3" controlId="txtDescription">
                                <Form.Label>Descripción de la cancion</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la descripción de la canción" onChange={handleInputChange} value={song.description} name="description"/>
                            </Form.Group>

                            <button type="submit">{loading ? <ImSpinner3 className='spinner' /> : "Guardar"}</button>
                        </form>
                    </>
            }
        </>
    );
}

export default Song
