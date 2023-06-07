import './style.css';

import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
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

connectToServer();
