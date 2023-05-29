import Form from 'react-bootstrap/Form';

const SearchBar = ({ placeholder, filter, onFilterChange }) => {
    return (
      <Form style={searchBarStyle}>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            value={filter}
            placeholder={placeholder}
            onChange= { (e) => onFilterChange(e.target.value) }/>
        </Form.Group>
      </Form>
    );
  }

  const Search = ({ titleFilter, setTitleFilter, artistFilter, setArtistFilter }) => {
    return (
      <div style={searchDivStyle}>
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
      </div>
    );
  }

  const searchDivStyle = {
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  };

  const searchBarStyle = {
    fontSize: "calc('10px' + '2vmin')",
    marginLeft: "8px",
    marginRight: "8px",
  };

  export default Search;