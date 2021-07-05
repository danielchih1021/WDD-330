import {Auth} from './auth';
import { Errors, makeRequest} from './authHelpers';
makeRequest('login', 'POST', {
  password: 'user1',
  email: 'user1@email.com'
});

const myErrors = new Errors('errors');
const myAuth = new Auth(myErrors);

const loginForm = document.getElementById('login');
loginForm.querySelector('button').addEventListener('click', () => {
  myAuth.login(getPosts);
});