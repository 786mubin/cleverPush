import React, { useState } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import { saveAs } from 'file-saver';
const ImageResults = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState('');

    // console.log("images is : ", images)
    const handleOpen = (img) => {
        // console.log("image is  : ", img)
        setIsOpen(true);
        setCurrentImg(img);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const downladFile = (imgFile) => {
        saveAs(imgFile);
        // const url = window.URL.createObjectURL(new Blob([imgFile]));

        // var link = document.createElement("a");
        // link.href = url;
        // link.setAttribute('download',"new.jpg");
        // document.body.appendChild(link);
        // // link.download = "image.jpg";
        // link.click();
    }


    if (images) {
        // console.log("images is : ", images)
        var imageList = (
            <GridList cols={4}>
                {images.map(img => (
                    <GridTile

                        title={img.tags.substr(0,20)+"..."}
                        key={img.id}
                        actionIcon={
                            <div>
                                <IconButton onClick={() => handleOpen(img.largeImageURL)}>
                                    <ZoomIn color="white" />
                                </IconButton>

                                <IconButton onClick={() => downladFile(img.largeImageURL)}>
                                    <FileFileDownload color="white" />
                                </IconButton>

                            </div>
                        }
                    >
                        <img src={img.largeImageURL} alt="waiting..." />
                    </GridTile>
                ))
                }
            </GridList>
        )
    }
    else {
        imageList = null;
    }

    const actions = [
        <FlatButton label="Close" primary={true} onClick={handleClose} />
    ]

    return (
        <>
            <div style={{ marginLeft: 50, marginRight: 50, marginTop: 20 }}>
                {imageList}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={isOpen}
                    onRequestClose={handleClose}
                >
                    <img src={currentImg} alt="" style={{ width: '100%' }} />
                </Dialog>
            </div>
        </>
    )
}

export default ImageResults;