import { Manager, Socket } from 'socket.io-client';

export const connectToServer = () => {
    const manager = new Manager('localhost:3000/socket.io/socket.io.js');
    const socket = manager.socket('/');

    addListeners(socket);
};

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsList = document.querySelector<HTMLUListElement>('#clients')!;
    const formMessage = document.querySelector<HTMLFormElement>('#form-message')!;
    const txtMessage = document.querySelector<HTMLInputElement>('#txt-message')!;
    const messages = document.querySelector<HTMLUListElement>('#messages')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';

        clients.forEach((clientId) => {
            clientsHtml += `
                <li>${clientId}</li>
            `;
        });

        clientsList.innerHTML = clientsHtml;
    });

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();

        socket.emit('message-client', {
            id: socket.id,
            message: txtMessage.value
        });

        txtMessage.value = '';
    });

    socket.on('message-server', (payload: { fullName: string, message: string }) => {
        const messageHtml = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;

        const li = document.createElement('li');
        
        li.innerHTML = messageHtml;
        messages.appendChild(li);
    });
}
