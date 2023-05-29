import Card from 'react-bootstrap/Card';

const AlbumCard = ({ album }) => {
  return (
    <Card style={cardStyle}>
      <Card.Img variant="top" src={album.img} />
      <Card.Body>
        <Card.Title>{album.title}</Card.Title>
        <Card.Text>
          {album.artist}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

const cardStyle = {
  marginRight: "6px",
  marginLeft: "6px",
  display: "flex",
  justifyContent: "center",
  width: "18rem",
}

export default AlbumCard;