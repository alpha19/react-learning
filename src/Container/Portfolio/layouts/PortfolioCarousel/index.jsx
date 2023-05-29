import Carousel from 'react-bootstrap/Carousel';

import AlbumCard from "./AlbumCard"

const CarouselPortfolio = ({ filteredAlbums }) => {
    const albumCards = [];
    const chunkSize = 3;
    for (let index = 0; index < filteredAlbums.length; index += chunkSize) {
      let cards = [];
      filteredAlbums.slice(index, index + chunkSize).forEach((album) => {
        console.log()
        cards.push(<AlbumCard key={`${album.title} ${album.artist}`} album={album} />);
      });
      albumCards.push(
        <Carousel.Item key={index}>
          <div style={divStyle}>{cards}</div>
        </Carousel.Item>);
    }
  
    return (
      <Carousel
        key={filteredAlbums.length}
        variant="dark"
        interval={null} 
      >
        {albumCards}
      </Carousel>);
  };

  const divStyle = {
    marginBottom: "40px",
    marginRight: "auto",
    marginLeft: "auto",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  }

  export default CarouselPortfolio