import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({
  closeModal,
  onEdit,
  isOpen,
  formEditProfileErrors,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, isValid , setValues} = useFormAndValidation();

  useEffect(() => {
    setValues({ name: currentUser.username, avatar: currentUser.avatar })
  },[currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) onEdit(event, { name: values.name, avatar: values.avatar });
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      closeModal={closeModal}
      name="edit-profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      {formEditProfileErrors.error && (
        <p className="modal__error">{formEditProfileErrors.error}</p>
      )}
      <label className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
          required
        />
        {formEditProfileErrors.name && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
      <label className="modal__label">
        Avatar *
        <input
          type="text"
          className="modal__input"
          name="avatar"
          placeholder="Avatar Url"
          onChange={handleChange}
          value={values.avatar || ""}
        />
        {formEditProfileErrors.avatar && (
          <p className="modal__error">This field is required</p>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
