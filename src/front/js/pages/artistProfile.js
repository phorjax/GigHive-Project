import React, { useContext, useEffect, useState, useLayoutEffect} from "react";

import Modal from 'react-bootstrap/Modal';

import Carousel from "better-react-carousel";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";


import CalendarPlaceholder from "./CalendarPlaceholder.png";

import "../../styles/artistProfile.css";

import { Context } from "../store/appContext";
import { useParams } from "react-router";

export function ArtistProfile() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const artists = store.artists;
  const artist = artists.filter(artist => artist.id == id)[0]


  // <---variables/functions for mesaging modal--->
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [enableMessage, setEnableMessage] = useState("btn btn-sm purplebutton disabled")

  useLayoutEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      setIsLoggedIn(true);
      setEnableMessage("btn btn-sm purplebutton");
    }
  }, [store.token, isLoggedIn]);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [messageBody, setMessageBody] = useState("")
  const [messageSubject, setMessageSubject] = useState("")

  const testSenderID = 123
  const testReceiverID = 456

  useEffect(() => {
    // actions.getUser();
    console.log(store.user)
  }, []);

  const sendMessage = () => {
    const date= new Date()
    const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    
    actions.sendMessage ( 
      messageSubject,
      messageBody,
      testSenderID,
      testReceiverID,
      formattedDate
    )

    handleClose()
  }
  
  // <----variables/functions for images/lightbox--->
  const images = artist?.images == null ? ["https://cdn.musichouseschool.com/BandPlayingOnStage_1.jpg", "https://www.stopthebreaks.com/wp-content/uploads/2020/10/iStock-161838634.jpg",  "https://musiciansunion.org.uk/MusiciansUnion/media/content/news/bass-player-on-stage.jpg"] : artist?.images.split(", ")

  const [isOpen, setIsOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  function ExpandPhoto() {
    setIsOpen(true);
  }
  function changeImgIndex(index){
    setImgIndex(index)
  }

  // <----randomly sets star rating and highlights correct stars--->
  const [oneStar, setOneStar] = useState ("fa-solid fa-star s1")
  const [twoStar, setTwoStar] = useState ("fa-solid fa-star s2")
  const [threeStar, setThreeStar] = useState ("fa-solid fa-star s3")
  const [fourStar, setFourStar] = useState ("fa-solid fa-star s4")
  const [fiveStar, setFiveStar] = useState ("fa-solid fa-star s5")

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  let starRating = getRandomIntInclusive(3,5)
  console.log(starRating)
  useEffect(()=>{
    if (starRating == 5){
      setOneStar("fa-solid fa-star s1 goldRating")
      setTwoStar("fa-solid fa-star s2 goldRating")
      setThreeStar("fa-solid fa-star s3 goldRating")
      setFourStar("fa-solid fa-star s4 goldRating")
      setFiveStar("fa-solid fa-star s5 goldRating")
    }
    else if (starRating == 4){
      setTwoStar("fa-solid fa-star s2 goldRating")
      setThreeStar("fa-solid fa-star s3 goldRating")
      setFourStar("fa-solid fa-star s4 goldRating")
      setFiveStar("fa-solid fa-star s5 goldRating")
    }
    else if (starRating == 3){
      setThreeStar("fa-solid fa-star s3 goldRating")
      setFourStar("fa-solid fa-star s4 goldRating")
      setFiveStar("fa-solid fa-star s5 goldRating")
    }
    else if (starRating == 2){
      setFourStar("fa-solid fa-star s4 goldRating")
      setFiveStar("fa-solid fa-star s5 goldRating")
    }
    else {
      setFiveStar("fa-solid fa-star s5 goldRating")
    }
  }, [])

  return (
  <div className="container-fluid">

      {/* <----Code for LightBox----> */}
      {isOpen && <Lightbox
        mainSrc={images[imgIndex]}
        nextSrc={images[(imgIndex + 1) % images.length]}
        prevSrc={images[(imgIndex + images.length - 1) % images.length]}
        onCloseRequest={() => setIsOpen(false)}
        onMovePrevRequest={() => setImgIndex((imgIndex + images.length - 1) % images.length)}
        onMoveNextRequest={() => setImgIndex((imgIndex + 1) % images.length)}
      />}

{/* <-----------------Code for Messaging Modal---------------------> */}
<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send {artist?.artist_name} a message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="form-group">
          <input type="text" class="form-control mb-2" id="messageSubject" placeholder="Message Subject" onChange={(e) => setMessageSubject(e.target.value)}/>
          <textarea class="form-control" id="messageBody" rows="3" placeholder="Write your message here" onChange={(e) => setMessageBody(e.target.value)}></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" variant="secondary" onClick={handleClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </Modal.Footer>
    </Modal>

      <div className="row mt-3 px-2 gx-3 d-flex mainRow">
        <div className="col-md-5 mt-2 p-0 h-100">
          <img
            onClick={() => {
              ExpandPhoto();
              changeImgIndex(0);
            }}
            src={images[0]}
            className="profile-main-img object-fit-contain rounded"
          ></img>
        </div>
        <div className="col-md-7 px-3" id="info-section">
          <div class="d-flex flex-row mb-0">
            <div>
              <h2 className="artistName m-0">{artist?.artist_name}</h2>
            </div>
            <div className="mx-2 pt-1">
              <button className={enableMessage} onClick={handleShow}>Message</button>
            </div>
          </div>
          <div className="row mt-0">
            <div className="star-wrapper">
              <i className={oneStar}></i>
              <i className={twoStar}></i>
              <i className={threeStar}></i>
              <i className={fourStar}></i>
              <i className={fiveStar}></i>
            </div>
          </div>
          <div className="row mt-3">
            <p>{artist?.about_info}</p>
            <p className="my-0">
              <b>Music Type: </b>
              {artist?.genre}
            </p>
            <p>
              <b>Performance Type:</b> {artist?.performance_type}
            </p>
          </div>
          <div className="row px-2">
            {artist?.instagram ? (
              <a
                href={`http://instagram.com/${artist?.instagram}`}
                target="_blank"
                className="social-link rounded-circle mx-2 d-flex justify-content-center align-items-center"
              >
                <i className="fa-brands fa-instagram fa-xl"></i>
              </a>
            ) : null}
            {artist?.tiktok ? (
              <a
                href={`http://tiktok.com/@${artist?.tiktok}`}
                target="_blank"
                className="social-link rounded-circle mx-2 d-flex justify-content-center align-items-center"
              >
                <i className="fa-brands fa-tiktok fa-xl"></i>
              </a>
            ) : null}
            {artist?.facebook ? (
              <a
                href={`http://facebook.com/${artist?.facebook}`}
                target="_blank"
                className="social-link rounded-circle mx-2 d-flex justify-content-center align-items-center"
              >
                <i className="fa-brands fa-facebook fa-xl"></i>
              </a>
            ) : null}
            {artist?.twitter ? (
              <a
                href={`http://twitter.com/${artist?.twitter}`}
                target="_blank"
                className="social-link rounded-circle mx-2 d-flex justify-content-center align-items-center"
              >
                <i className="fa-brands fa-twitter fa-xl"></i>
              </a>
            ) : null}
            {artist?.soundcloud ? (
              <a
                href={`http://soundcloud.com/${artist?.soundcloud}`}
                target="_blank"
                className="social-link rounded-circle mx-2 d-flex justify-content-center align-items-center"
              >
                <i className="fa-brands fa-soundcloud fa-xl"></i>
              </a>
            ) : null}
            {artist?.spotify ? (
              <a
                href={`http://spotify.com`}
                target="_blank"
                className="social-link rounded-circle mx-2 d-flex justify-content-center align-items-center"
              >
                <i className="fa-brands fa-spotify fa-xl"></i>
              </a>
            ) : null}
          </div>
        </div>
        <div className="row px-2 d-flex justify-content-between align-items-start">
            <div className="col-md-5 mx-1">
            <div className="row mt-2">
              <Carousel cols={3} rows={1} gap={35} loop>
              {images.map((image, index) => {
                return ( <Carousel.Item><img
                  onClick={() => {
                    ExpandPhoto();
                    changeImgIndex(index);
                  }}
                  className="col-md m-2 rounded smImage object-fit-cover"
                  src={image}
                ></img></Carousel.Item>
        
        )})}</Carousel>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <img className="calendar" src={CalendarPlaceholder} />
              </div>
              <div className="col-md-6">
                <img className="calendar" src={CalendarPlaceholder} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}