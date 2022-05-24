import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageResults from "../imageResults/imageResults";

const Search = () => {
    const [searchText, setSearchText] = useState('nature');
    const apiKey = '17241914-90da7b93c0ccceb734849dcd1';
    const apiUrl = 'https://pixabay.com/api';
    const [images, setImages] = useState([]);

    useEffect(() => {
        searchImages();
        // eslint-disable-next-line
    }, [])

    const onTextChange = (e) => {
        const val = e.target.value;
        setSearchText(val);
    }


    const searchImages = async () => {
        await axios.get(`${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&safesearch=true`)
            .then(res => {
                setImages(res.data.hits)
            })
            .catch(err => console.log(err));
    }
    var style = {
        backgroundColor: 'black',
        color: 'white',
        marginLeft: 570,
        marginTop: 100,
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 30,
        borderTopStyle: "hidden",
        borderRightStyle: "hidden",
        borderLeftStyle: "hidden",
        outline: "none",
        borderBottomStyle: "groove",
    }

    var buttonStyle = {

        fontSize: "20px",
        marginLeft: "5px",
        backgroundColor: "#83a7b3",
        border: "2px solid #83a7b3",
        borderRadius: "5px"
    }

    return (
        <>
            <div>
                <input type="text" style={style}
                    placeholder="Search for images"
                    name="searchText"
                    value={searchText}
                    onChange={onTextChange}
                />
                <button style={buttonStyle} onClick={searchImages}>Search</button>
                <br />
                {images.length > 0 ? (<ImageResults images={images} />) : null}
            </div>
        </>
    )
}


export default Search;