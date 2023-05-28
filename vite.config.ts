import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		https: {
			key: fs.readFileSync('./certs/localhost.key'),
			cert: fs.readFileSync('./certs/localhost.crt')
		}
	}
});
