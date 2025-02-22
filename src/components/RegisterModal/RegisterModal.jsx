import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal ({ closeModal, onSignUp, isOpen, formSignUpErrors, switchModal }) {

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

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(await onSignUp(event,{email, password, name, avatar})){
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
      altButtonText={"or Log In"}
      switchModal={switchModal}
      modal={"login"}
    >
        {formSignUpErrors.errors && (
          <p className="modal__error">{formSignUpErrors.errors}</p>
        )}
    <label  className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
        {formSignUpErrors.email && (
          <p className="modal__error">This field is required</p>
        )}
    </label>
    <label  className="modal__label">
    Password *
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        {formSignUpErrors.password && (
          <p className="modal__error">This field is required</p>
        )}
    </label>
    <label className="modal__label">
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
      <label  className="modal__label">
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
        {formSignUpErrors.avatar && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
    </ModalWithForm>
    )
}

export default RegisterModal;