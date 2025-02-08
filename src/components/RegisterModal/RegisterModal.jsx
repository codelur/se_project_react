import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal ({ closeModal, onSignUp, isOpen, formSignUpErrors }) {

    const [email, setEmail] = useState("");
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        formSignUpErrors.name = "";
    };

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        formSignUpErrors.name = "";
    };

    const [name, setName] = useState("");
    const handleNameChange = (event) => {
        setName(event.target.value);
        formSignUpErrors.name = "";
    };

    const [avatar, setAvatar] = useState("");
    const handleAvatarChange = (event) => {
        setAvatar(event.target.value);
        formSignUpErrors.name = "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(onSignUp(event,{email, password, name, avatar})){
            setEmail("");
            setPassword("");
            setName("");
            setAvatar("");
        }
    }

    return (
        <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      closeModal={closeModal}
      name="signup"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
    <label htmlFor="email" className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
        {formSignUpErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
    </label>
    <label htmlFor="password" className="modal__label">
    Password *
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        {formSignUpErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
    </label>
    <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
        {formSignUpErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL *
        <input
          type="text"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar Url"
          onChange={handleAvatarChange}
          value={avatar}
        />
        {formSignUpErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
    </ModalWithForm>
    )
}

export default RegisterModal;