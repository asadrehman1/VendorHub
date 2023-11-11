// import React from "react";
// import "./Contact.css";
// import { Button } from "@material-ui/core";

// const Contact = () => {
//   return (
//     <div className="contactContainer">
//       <a className="mailBtn" href="mailto:mymailforasad@gmail.com">
//         <Button>Contact: mymailforasad@gmail.com</Button>
//       </a>
//     </div>
//   );
// };

// export default Contact;
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_iffy11q",
        "template_n5yvwng",
        form.current,
        "hLKnMVr7J3CPR9_5k"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div style={{ width: "30%", margin: "auto" }}>
      <h1
        style={{
          textAlign: "center",
          font: "Roboto",
          marginTop: "10px",
          textDecoration: "underline",
          fontWeight:"100",
          color: "rgba(0, 0, 0, 0.678)"
        }}
      >
        Contact Us
      </h1>
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </StyledContactForm>
    </div>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;
  margin-bottom: 100px;
  margin-top: 50px;
  background-color: #f0f0f0;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
  padding: 32px;
  border-radius: 10px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background-color: #0067a5;
      color: white;
      border: none;
    }
  }
`;
