import ioClient from 'socket.io-client';
// const ENDPOINT = 'https://bc3e-130-225-198-168.eu.ngrok.io';
const ENDPOINT = 'https://vuferen.github.io/';

const socket = ioClient(ENDPOINT);

export const io = socket;
