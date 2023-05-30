import { useState } from 'react'

import Button from 'react-bootstrap/Button';
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
            <form>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <input
                    type="text"
                    placeholder="artist"
                    name="artist"
                    onChange={(e) => setArtist(e.target.value)}
                    value={artist}
                />
                <input
                    type="text"
                    placeholder="Image Link"
                    name="img"
                    onChange={(e) => setImage(e.target.value)}
                    value={img}
                />
            </form>
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

export default NewAlbum;