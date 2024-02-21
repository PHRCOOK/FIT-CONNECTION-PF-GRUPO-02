import MembershipsCards from '../../../components/cards_memberships/cards_memberships'
import { Container, Row, Col, Offcanvas, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import pathroutes from '../../../components/helpers/pathroutes'

const AdminServices = () => {
    const navigate = useNavigate()
  return (
    <div>
      <div className="fs-4 mb-3 fw-bold text-center">Servicios</div>
      <Button
        variant="primary"
        onClick={() => {
          navigate(pathroutes.FORMSERVICE)
        }}
      >
        Crear Servicio
      </Button>
      <Row>
        <Col>
          <Container>
            <MembershipsCards />
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default AdminServices