import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({closeModal, onLogin, isOpen, formLoginErrors}){

    const [email, setEmail] = useState("");
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        formLoginErrors.name = "";
    };

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        formLoginErrors.name = "";
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(onLogin(event,{email, password})){
            setEmail("");
            setPassword("");
        }
    };
    return (
        <ModalWithForm
      title="Log In"
      buttonText="Log In"
      closeModal={closeModal}
      name="login"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
    <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
        {formLoginErrors.email && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        {formLoginErrors.password && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
    </ModalWithForm>
    );
}


export default LoginModal;
