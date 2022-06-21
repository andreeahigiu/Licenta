import React, { useState } from 'react'
import "./Contact.css"
import contact from '../../utils/images/contact.jpg' 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import emailjs from "emailjs-com"

export default function Contact() {
  const [emailData, setEmailData] = useState({name:"", email:"", subject:"", message:""})

  function handleChange(e){
    console.log("value", e.target.value)
  }

  function sendEmail(e){
    console.log("sending the email...")

    e.preventDefault();

    emailjs.sendForm('service_7iy6ihf', 'template_4tc0mtj', e.target, '-P_tHJd5IIQfLzQ-x')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset()
  }

  return (
    <div className="contact-container">
        <div className="contact-image-container">
          <img className="img-contact" src={contact} alt={contact}/>
        </div>
        <div className="contact-form-container">
          <div className="first-message">Nu ezita să ne scrii dacă ai nelămuriri!</div>
          <div className="find-us-email"> 
            <p className="find-us">Ne poti gasi la adresa: </p>
            <Link
            className="contact-link-style"
            to='#'
            onClick={(e) => {
                window.location.href = "mailto:gustaresti@gmail.com";
                e.preventDefault();
            }}
        >
            gustaresti@gmail.com
            </Link>
          </div>
          <div className="find-us-social">
            <p className="find-us">Sau pe retelele de socializare:</p>
            <div className="socials">
            <Link
            className="contact-link-style"
            to='#'
            onClick={(e) => {
                window.location.href = "https://www.facebook.com/profile.php?id=100082216396713";
                e.preventDefault();
            }}
            >
            Facebook
            </Link>
            
            <Link
            className="contact-link-style"
            to='#'
            onClick={(e) => {
                window.location.href = "https://www.facebook.com/profile.php?id=100082216396713";
                e.preventDefault();
            }}
            >
            Instagram
            </Link>

            </div>

          </div>
          


          <form className="contact-form-fields" onSubmit={sendEmail}>
            <div className="contact-name">
            <TextField  size="small" className="text-field-contact" name="name" id="name" label="Nume" variant="outlined" onChange={(e) =>handleChange(e)}/>
            </div>
            <div className="contact-email">
            <TextField size="small" className="text-field-contact" name="email" id="email" label="Email" variant="outlined" onChange={(e) =>handleChange(e)}/>

            </div>
            <div className="contact-subject">
            <TextField size="small" className="text-field-contact" name="subject" id="subject" label="Subiect" variant="outlined" onChange={(e) =>handleChange(e)}/>
            </div>
            <div className="contact-message">
            <TextField
              className="message-field-contact"
               id="message"
               name="message"
               label="Mesajul tău"
               multiline
               rows={4}
                //defaultValue="Default Value"
        />
            </div>

            <Button className="submit-btn-contact" type='submit' variant="outlined">Trimite acum </Button>
          </form>
        </div>
    </div>
  )
}
