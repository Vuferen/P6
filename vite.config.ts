import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import { webSocketServer } from './src/webSocketPluginVite';
import { Server } from 'socket.io';
const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
	  const io = new Server(server.httpServer)
  
	  io.on('connection', (socket) => {
		socket.emit('eventFromServer', 'Hello, World 👋')

		socket.on('message', (message) => {
			io.emit('message', {
				count: message,
				time: new Date().toLocaleString()
			});
		});
		socket.on('items1', items => {
			io.emit('items1', items)
			console.log("Item1-server")
		})
		socket.on('items2', items => {
			io.emit('items2', items)
		})

	  });
	  
	},
  }

/** @type {import('vite').UserConfig} */
const config = {
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
    plugins: [sveltekit(), webSocketServer]
};

export default config;