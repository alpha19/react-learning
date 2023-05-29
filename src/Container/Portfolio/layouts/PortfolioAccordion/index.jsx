import Accordion from 'react-bootstrap/Accordion';
import AlbumAccordion from './AlbumAccordion';

const PortfolioAccordion = ({ filteredAlbums }) => {
  return (
    <Accordion defaultActiveKey="0">
    {filteredAlbums.map((album, index) => (
       <AlbumAccordion key={index} album={album} />
    ))}
    </Accordion>
  );
}

export default PortfolioAccordion;