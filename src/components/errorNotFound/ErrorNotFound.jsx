
import '../../App.scss';
import { Button } from 'react-bootstrap';


const ErrorNotFound = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                backgroundImage: `url("https://media.licdn.com/dms/image/v2/C5112AQEw1fXuabCTyQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1581099611064?e=1761177600&v=beta&t=7hMw9_W0flONIBUwsc_H29TRe6QykU2h6zaf1rOHEzQ")`,
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
