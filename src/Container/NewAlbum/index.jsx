import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { post } from "../../utilities/api"

const NewAlbum = ({ newAlbumEntry, onNewAlbumEntry }) => {
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [img, setImage] = useState("")

    const addNewAlbum = () => {
        const callback = (data) => {
            onNewAlbumEntry(false);
        };
    
        post("albums", { album: {title: title, artist: artist, img: img}}, callback);
        
        setTitle("");
        setArtist("");
        setImage("");
    };

    return (
    <Modal show={newAlbumEntry} onHide={() => onNewAlbumEntry(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Add a New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form style={formStyle}>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Artist"
                    name="artist"
                    onChange={(e) => setArtist(e.target.value)}
                    value={artist}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formArtist">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Image Link"
                    name="img"
                    onChange={(e) => setImage(e.target.value)}
                    value={img}
                />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => onNewAlbumEntry(false)}>
            Close
        </Button>
        <Button variant="primary" onClick={(e) => addNewAlbum() }>
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>
  );
}

const formStyle = {
    margin: "8px",
  };

export default NewAlbum;