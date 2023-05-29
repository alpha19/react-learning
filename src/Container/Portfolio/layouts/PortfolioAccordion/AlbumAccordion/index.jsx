import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';

const AlbumAccordion = ({ album }) => {
  return (
      <Accordion.Item eventKey={`${album.title} ${album.artist}`} >
        <Accordion.Header>{album.title}</Accordion.Header>
        <Accordion.Body>
          <h3>{album.artist}</h3>
          <Image src={album.img} rounded />
        </Accordion.Body>
      </Accordion.Item>
  );
}

export default AlbumAccordion;