import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';

import NewAlbum from "./NewAlbum"
import Search from "./Search"
import Portfolio from "./Portfolio";

import { get } from "../utilities/api"

const Container = () => {
  const [newAlbumEntry, setNewAlbumEntry] = useState(false);
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = () => {
    const callback = (data) => {
      setAlbums(data);
    };

    get("albums", callback);
  }

  useEffect(() => {
    if (newAlbumEntry === false) fetchAlbums();
  },[newAlbumEntry]);

  albums?.sort((a, b) => a.artist.localeCompare(b.artist));

  const [titleFilter, setTitleFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  
  return (
    <div className="App">
      <NewAlbum 
        newAlbumEntry={newAlbumEntry}
        onNewAlbumEntry={setNewAlbumEntry}
      />
      <Button 
        variant="outline-primary"
        onClick={() => setNewAlbumEntry(true)}
      >
        Add
      </Button>
      <Search
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          artistFilter={artistFilter}
          setArtistFilter={setArtistFilter}
      />
      <Portfolio
        albums={albums}
        titleFilter={titleFilter}
        artistFilter={artistFilter}
      />
    </div>
  );
};

  export default Container;