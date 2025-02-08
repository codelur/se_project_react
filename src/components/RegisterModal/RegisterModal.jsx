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

    const [avatarUrl, setAvatarUrl] = useState("");
    const handleAvatarUrlChange = (event) => {
        setAvatarUrl(event.target.value);
        formSignUpErrors.name = "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
          id="email"
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
          id="password"
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
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
        {formSignUpErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Avatar URL *
        <input
          type="text"
          className="modal__input"
          id="avatartUrl"
          name="avatartUrl"
          placeholder="Avatar Url"
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
        />
        {formSignUpErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
    </ModalWithForm>
    )
}

export default RegisterModal;