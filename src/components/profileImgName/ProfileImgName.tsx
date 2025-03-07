import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

interface Props {
    id: string;
    name: string;
    image: string | undefined;
}

const ProfileImgName = ({id, name, image}: Props) => {
    return (
        <Row className="align-items-center mb-2">
            {image && (
                <Col xs="auto" as={Link} to={`/profile/${id}`}>
                    <img
                        src={image}
                        alt={name}
                        className="rounded-circle"
                        width="60"
                        height="60"
                    />
                </Col>
            )}
            <Col>
                <Card.Title>{name}</Card.Title>
            </Col>
        </Row>
    )
}

export default ProfileImgName;