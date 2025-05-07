// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'



// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// // vite.config.js
// export default {
//   server: {
//     allowedHosts: [
//       'edd7-2401-4900-8823-733c-ec3e-5d80-e578-7f63.ngrok-free.app'
//     ]
//   }
// }
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  server: {
    allowedHosts: [
      'a6ce-2401-4900-8823-733c-306a-ac6a-ec92-ef63.ngrok-free.app'
    ]
  }
})


