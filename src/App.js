import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";

import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';

const ALBUMS = [
  {
    "title": "Scaring the Hoes",
    "artist": "Scaring the Hoes",
    "img": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Scaring_the_Hoes.webp/316px-Scaring_the_Hoes.webp.png"
  },
  {
    "title": "10000 gecs",
    "artist": "100 gecs",
    "img": "https://upload.wikimedia.org/wikipedia/en/8/8d/10000_gecs_album_cover.jpg"
  }
];

const SearchBar = ({ placeholder, filter, onFilterChange }) => {
  return (
    <Form className="SearchBar">
      <Form.Group className="mb-3">
        <Form.Label>Album Title</Form.Label>
        <Form.Control 
          type="text"
          value={filter}
          placeholder={placeholder}
          onChange= { (e) => onFilterChange(e.target.value) }/>
      </Form.Group>
    </Form>
  );
}

const Portfolio = ({ albums, titleFilter, artistFilter }) => {
  const albumCards = [];

  albums.forEach((album, index) => {

    if (titleFilter !== "" && 
        !album.title.toUpperCase().includes(titleFilter.toUpperCase()))
      return;
    if (artistFilter !== "" &&
        !album.artist.toUpperCase().includes(artistFilter.toUpperCase()))
      return;

      albumCards.push(
        <Carousel.Item key={`${album.title} ${album.artist}`} >
          <Album
            album={album}     
          />
        </Carousel.Item>
      );
  });

  return (
  <Carousel variant="dark" slide={false} key={albumCards.length}>
    {albumCards}
  </Carousel>);
}

const Album = ({ album }) => {
  console.log(album);
  return (
    <Card className="Card d-block ">
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

const App = () => {
  /*
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(queriedProducts => setProducts(queriedProducts));
  },[]);
  */

  const [titleFilter, setTitleFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");

  return (
    <div className>
      <h1 className="App-header">Albums</h1>
      <SearchBar
        placeholder="Search on title..."
        filter={titleFilter}
        onFilterChange={setTitleFilter}
      />
      <SearchBar
        placeholder="Search on artist..."
        filter={artistFilter}
        onFilterChange={setArtistFilter}
      />
      <Portfolio
        albums={ALBUMS}
        titleFilter={titleFilter}
        artistFilter={artistFilter}
      />
    </div>
  );
}

export default App;
