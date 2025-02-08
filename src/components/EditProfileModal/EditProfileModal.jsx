import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


function EditProfileModal({closeModal, onEdit, isOpen, formEditProfileErrors}){

    const [name, setName] = useState("");
    const handleNameChange = (event) => {
        setName(event.target.value);
        formEditProfileErrors.name = "";
    };

    const [avatar, setAvatar] = useState("");
    const handleAvatarChange = (event) => {
        setAvatar(event.target.value);
        formEditProfileErrors.name = "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onEdit(event,{name,avatar})){
            setName("");
            setAvatar("");    
        }
    };

    return(<ModalWithForm
        title="Change Profile Data"
        buttonText="Save Changes"
        closeModal={closeModal}
        name="edit-profile"
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
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
        {formEditProfileErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar *
        <input
          type="text"
          className="modal__input"
          name="avatar"
          placeholder="Avatar Url"
          onChange={handleAvatarChange}
          value={avatar}
        />
        {formEditProfileErrors.avatar && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      </ModalWithForm>  );

}

export default EditProfileModal;
