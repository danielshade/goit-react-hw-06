import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { nanoid } from 'nanoid/non-secure';
import css from './ContactForm.module.css';

const ContactFormSchema = Yup.object().shape({
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

const initialValues = {
  username: '',
  phone: '',
};

function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.username,
        number: values.phone,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
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
            placeholder="Enter name..."
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
            placeholder="Enter phone number (XXX-XX-XX)..."
          />
          <ErrorMessage name="phone" className={css.error} component="span" />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
