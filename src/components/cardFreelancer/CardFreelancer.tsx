import {Card} from "react-bootstrap";
import ProfileImgName from "../profileImgName/ProfileImgName.tsx";

interface Props {
    id: number;
    name: string;
    bio: string;
    skills: string[];
    email: string;
    image: string | null | undefined;
}

const CardFrelancer = ({id, name, bio, skills, email, image}: Props) => {
    return (
        <Card>
            <Card.Body>
                {image && (
                    <ProfileImgName id={id} name={name} image={image}/>
                )}
                <Card.Text>{bio}</Card.Text>
                <Card.Text>
                    <strong>Habilidades:</strong> {skills.join(', ')}
                </Card.Text>
                <Card.Text>
                    <strong>E-mail:</strong> {email}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardFrelancer;