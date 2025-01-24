import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './EditForm.module.css';

const EditFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(17, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      'Phone number must be in the format XXX-XX-XX'
    )
    .required('Required'),
});

function EditForm({ contact, onSave, onCancel }) {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, actions) => {
    onSave({
      id: contact.id,
      name: values.username,
      number: values.phone,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        username: contact.name,
        phone: contact.number,
      }}
      onSubmit={handleSubmit}
      validationSchema={EditFormSchema}
    >
      <Form className={css.form}>
        <div>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="username"
            id={nameFieldId}
          />
          <ErrorMessage
            name="username"
            className={css.error}
            component="span"
          />
        </div>

        <div>
          <label className={css.label} htmlFor={phoneFieldId}>
            Number
          </label>
          <Field
            className={css.field}
            type="tel"
            name="phone"
            id={phoneFieldId}
          />
          <ErrorMessage name="phone" className={css.error} component="span" />
        </div>

        <div className={css.wrap}>
          <button className={css.btn} type="submit">
            Save
          </button>

          <button className={css.btn} type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default EditForm;
