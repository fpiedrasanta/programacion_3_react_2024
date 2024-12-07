import { useEffect, useState } from 'react';
import './Songs.css';

import React from 'react'
import { Link } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import { Table } from 'react-bootstrap';

const Songs = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);

    const fecthSongs = async () => {
        try {
            setLoading(true);
            let response = await fetch(`http://localhost:5088/Song?query=${query}&page=${page}&pageSize=3`);
            let json = await response.json();

            setSongs(json.songs);
        } catch(e) {
            console.log("error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fecthSongs();
    }, [page, query]);

    const find = (evt) => {
        const { value } = evt.target;
        setQuery(value);
    }

    const prevPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    return (
        <>
            <Link to="/song" className="btn btn-primary">Nuevo</Link>
            <br/>
            <br/>
            <input type="text" value={query} onChange={find}/>
            <br/>
            <br/>
            {
                loading ?
                    <div className='spinner'><ImSpinner3/></div> :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Género</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                songs.map((song) => {
                                    return (
                                        <tr key={song.id}>
                                            <td>{song.id}</td>
                                            <td>{song.title}</td>
                                            <td>{song.genre}</td>
                                            <td>{song.description}</td>
                                            <td>
                                                <Link to={`/song/${song.id}`} className='btn btn-primary'>Editar</Link>
                                                <Link to="" className='btn btn-secondary'>Eliminar</Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
            }
            <br/>
            <br/>
            <a className='btn btn-primary' onClick={prevPage}>Anterior</a>
            <p>{page}</p>
            <a className='btn btn-primary' onClick={nextPage}>Siguiente</a>
        </>
    )
}

export default Songs;