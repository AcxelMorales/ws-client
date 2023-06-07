import './style.css';

import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
  
    <input id="jwt" placeholder="JWT" autocomplete="off" />
    <button id="btnJwt">Connect</button>

    <br />

    <span id="server-status">Offline</span>

    <ul id="clients"></ul>

    <form id="form-message">
      <input 
        name="txt-message" 
        id="txt-message" 
        placeholder="Write message"
        autocomplete="off"
      />
    </form>
    
    <h3>Messages</h3>
    <ul id="messages"></ul>
  </div>
`;

const jwt = document.querySelector<HTMLInputElement>('#jwt')!;
const buttonJwt = document.querySelector<HTMLButtonElement>('#btnJwt')!;

buttonJwt.addEventListener('click', () => {
  if (jwt.value.trim().length === 0) return alert('Enter a valid JWT');
  connectToServer(jwt.value);
});
