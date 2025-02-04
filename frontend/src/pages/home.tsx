import { Container, Row, Col } from 'react-bootstrap';
import AddForm from '../components/addForm';
import Display from '../components/display';

export default function Home() {
    return (

        <Container>
            <Row>
                <Col><Display /></Col>
                <Col><AddForm /></Col>
            </Row>
        </Container>
    )
}
