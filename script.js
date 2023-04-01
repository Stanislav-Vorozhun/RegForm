'use strict';

const form = document.getElementById('form');
const {
  username,
  userSurname,
  birhtDate,
  email,
  password,
  passConfirm } = form.elements;
const today = new Date().toISOString().split("T")[0];

birhtDate.setAttribute('max', today);

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/;

const fields = [
  { id: 'username', validate: value => value.trim().length < 25 && value.trim().length >= 2 && value.trim().length !== 0, error: 'Name is required' },
  { id: 'userSurname', validate: value => value.trim().length < 25 && value.trim().length >= 2 && value.trim().length !== 0, error: 'Surname is required' },
  { id: 'birhtDate', validate: value => value !== '', error: 'Birth date is required' },
  { id: 'email', validate: value => emailRegex.test(value), error: 'Provide a valid email address' },
  { id: 'password', validate: value => passwordRegex.test(value), error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character' },
  { id: 'passConfirm', validate: value => value.trim() === password.value.trim(), error: 'Password doesn\'t match' }];

const validateField = ({ id, validate, error }) => {
  const element = form.elements[id];
  const value = element.value.trim();
  const isValid = validate(value);
  const message = isValid ? '' : error;
  element.parentElement.classList.toggle('error', !isValid);
  element.parentElement.classList.toggle('success', isValid);
  element.parentElement.querySelector('.error').innerText = message;
  return isValid;
};

const validateForm = () => fields.every(validateField);

form.addEventListener('submit', async e => {
  e.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    const formData = {
      username: username.value,
      userSurname: userSurname.value,
      birhtDate: birhtDate.value,
      email: email.value,
      password: password.value,
      passConfirm: passConfirm.value,
    };
    console.log(formData);
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log(response);
    alert('Registration completed successfully');
  }
});
