import { ipcMain, app } from 'electron'

// bidirecional
ipcMain.handle('fetchUsers', () => {
  console.log('buscando usuarios...')

  return [
    { id: 1, nome: 'Matheus' },
    { id: 2, nome: 'Lucas' },
    { id: 3, nome: 'Ana' }
  ]
})

ipcMain.handle('get-version', () => {
  return app.getVersion()
})
