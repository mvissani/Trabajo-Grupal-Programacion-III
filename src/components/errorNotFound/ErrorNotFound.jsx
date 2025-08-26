import { Button, Row } from 'react-bootstrap'

const ErrorNotFound = () => {


    return (
        <Row>
            <h1>Ups! Sitio no encontrado</h1>
            <p>Haz click en el botón para regresar</p>
            <Button className='w-25'>Regresar </Button>
        </Row>
    )
}

export default ErrorNotFound