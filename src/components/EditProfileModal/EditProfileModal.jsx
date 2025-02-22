import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({
  closeModal,
  onEdit,
  isOpen,
  formEditProfileErrors,
  isLoading,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, setValues, errors } = useFormAndValidation();

  useEffect(() => {
    setValues({ name: currentUser.username, avatar: currentUser.avatar });
  }, [currentUser, setValues]);

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
      isLoading={isLoading}
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
        {errors.name && (
          <p className="modal__error">{errors.name}</p>
        )}
      </label>
      <label className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar Url"
          onChange={handleChange}
          value={values.avatar || ""}
          required
        />
        {errors.avatar && (
          <p className="modal__error">{errors.avatar}</p>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
