/***********************************************
 * Req N°3: Crear componente llamado MiApi.jsx *
 ***********************************************/

/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
const baseUrl ='https://ghibliapi.herokuapp.com/films'

const MiApi = () => {
    const [infofromapi, setInfofromapi] = useState([]);
    const [filterMovie, setFilterMovie] = useState("")

    /***************************************************************
    * UseEffect de fase de MONTAJE                                 *
    * Se declara un arreglo de dependencias vacío, indicando al    *
    * componente que solo debe realizar renderización al comienzo  *
    ****************************************************************/
    useEffect(() => {
       /*********************************************
        * Req N°4: Crear código para consumo de API *
        *********************************************/ 
        const getData = async() => {
            const response = await fetch(baseUrl)
            const apiResponse = await response.json()
            console.log("+++++++++++Fase MONTAJE++++++++++")
            setInfofromapi(apiResponse)
        }
        getData()
    }, [])

    /***************************************************************
    * UseEffect de fase de ACTUALIZACION                           *
    * Se suscribe a la variable del useState filterMovie           *
    * Provocando que en cada cambio de estado, el componente       *
    * entre en fase de actualización evitando el re-render del DOM *
    ****************************************************************/
    useEffect(() => {
        const getData = async() => {
            let filterUrl = baseUrl

            /***************************************************
             *      Req N°5: Filtro por nombre de pelicula     *
             ***************************************************/
             if (filterMovie !== "") {
                filterUrl = baseUrl + "?title=" + filterMovie
                console.log("--------Fase ACTUALIZACION--------")
             }

            /*********************************************
             * Req N°4: Crear código para consumo de API *
             *********************************************/ 
            const response = await fetch(filterUrl)
            const apiResponse = await response.json()
            setInfofromapi(apiResponse)
        }
        
        getData()
    }, [filterMovie])

/******************************************************
* Función "movieName" recibe nombre de pelicula:      *
* Recibe el nombre desde un listener onChange en el   *
* Form.Control del NavBar y setea estado              *
*******************************************************/
const movieName = (recivedMovieName) => {
    setFilterMovie(recivedMovieName)    
}


/****************************************
 * Req N°7: Agregar un diseño coherente *
 ****************************************/
return ( <>

{/*
******************************** 
*            Navbar            *
********************************
*/}
<Navbar bg="dark" expand="lg" variant="dark" fixed="top">
    <Container fluid>
        <Navbar.Brand href="#home" style={{fontSize: '40px'}}>Using Studio Ghibli API with React</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{marginLeft: '550px'}}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search a movie"
              className="me-2"
              aria-label="Search"
              onChange={(e) => movieName(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
    </Container>
</Navbar>
{/*
******************************** 
*            Table             *
********************************
*/}

<Form.Label style={{marginTop: '90px'}}></Form.Label>
    <Table striped bordered hover>
        <thead style={{textAlign: 'center'}}>
            <tr>
            <th>Title</th>
            <th>Original Title</th>
            <th>Original Title Romanised</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Release Date</th>
            <th>Running Time</th>
            <th>Description</th>
            <th>Image</th>
            </tr>
        </thead>
        <tbody>
            {/***************************************************************************************
              * Req N°6: Ordena Desc (más nuevo 1ero) resultados por año de lanzamiento de pelicula *
              ***************************************************************************************/}
            {infofromapi.sort((a, b) => a.release_date < b.release_date ? 1 : -1).map((pointer) => ( 
                <tr key={pointer.id}>
                    <td>{pointer.title}</td>
                    <td>{pointer.original_title}</td>
                    <td>{pointer.original_title_romanised}</td>
                    <td>{pointer.director}</td>
                    <td>{pointer.producer}</td>
                    <td>{pointer.release_date}</td>
                    <td>{pointer.running_time}</td>
                    <td>{pointer.description}</td>
                    <td><img src={pointer.image} style={{width: '10vw'}} /></td>
                </tr>
            ))}
        </tbody>
    </Table>

</> )
}

export default MiApi