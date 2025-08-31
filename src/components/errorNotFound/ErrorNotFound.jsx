// Imports
import '../../App.scss';
import { Button } from 'react-bootstrap';
import error404 from '../../images/404NotFound.jpg';

// ErrorNotFound
const ErrorNotFound = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                backgroundImage: `url(${error404})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Button href="/" className="custom-btn">
                Regresar
            </Button>
        </div>
    );
};

export default ErrorNotFound;
