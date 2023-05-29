import { useState } from "react";

import { ALBUMS } from "../static/albums"

import Search from "./Search"
import Portfolio from "./Portfolio";

const Container = () => {
    /*
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      getProducts(queriedProducts => setProducts(queriedProducts));
    },[]);
    */
    const albums = ALBUMS;
    albums.sort((a, b) => a.artist.localeCompare(b.artist));

    const [titleFilter, setTitleFilter] = useState("");
    const [artistFilter, setArtistFilter] = useState("");
  
    return (
      <div className="App">
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
  }

  export default Container;