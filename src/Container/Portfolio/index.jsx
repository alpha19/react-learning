import { useState } from 'react'
import Button from 'react-bootstrap/Button';

import PortfolioCarousel from './layouts/PortfolioCarousel'
import PortfolioAccordion from './layouts/PortfolioAccordion'

const carouselMode = "carousel";
const accordionMode = "accordion";

const filterAlbums = (albums, titleFilter, artistFilter) => {
  const filteredAlbums = [];

  albums?.forEach((album) => {
    if (titleFilter !== "" && 
        !album.title.toUpperCase().includes(titleFilter.toUpperCase()))
      return;
    if (artistFilter !== "" &&
        !album.artist.toUpperCase().includes(artistFilter.toUpperCase()))
      return;
    
    filteredAlbums.push(album);
  });

  return filteredAlbums;
};

const Portfolio = ({ albums, titleFilter, artistFilter }) => {
    const [layout, setLayout] = useState(carouselMode);
    const filteredAlbums = filterAlbums(albums, titleFilter, artistFilter);
    return (<>
      <Button 
        style={buttonStyle}
        variant="outline-primary"
        onClick={() => setLayout(carouselMode)}
      >
        Carousel
      </Button>
      <Button
        style={buttonStyle}
        variant="outline-primary"
        onClick={() => setLayout(accordionMode)}
      >
        Accordion
      </Button>
      {layout === carouselMode &&
        <PortfolioCarousel filteredAlbums={filteredAlbums} />
      }
      {layout === accordionMode &&
        <PortfolioAccordion filteredAlbums={filteredAlbums} />
      }
    </>);
  };

  const buttonStyle = {
    marginLeft: "8px",
    marginRight: "8px",
    marginBottom: "8px",
  };

  export default Portfolio;
  