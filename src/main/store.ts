import { app, ipcMain } from 'electron'
import PouchDB from 'pouchdb'
import path from 'path'
import fs from 'fs'
import { Customer, NewCustomer } from '../shared/types/ipc'
import { randomUUID } from 'crypto'

// Determinar o caminho base para o banco de dados com base no sistema operacional
let dbPath

dbPath = path.join(app.getPath('userData'), 'my_db')

//Verificar e criar o diretório se não existir
const dbDir = path.dirname(dbPath)

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

//inicializar o DB
const db = new PouchDB<Customer>(dbPath)

//função para adicionar no banco
async function addCustomer(doc: NewCustomer): Promise<PouchDB.Core.Response | void> {
  const id = randomUUID()

  const data: Customer = {
    ...doc,
    _id: id
  }

  return db
    .put(data)
    .then((response) => response)
    .catch((err) => console.log('Erro ao cadastrar', err))
}

ipcMain.handle('add-customer', async (event, doc: NewCustomer) => {
  const result = await addCustomer(doc)
  return result
})

//Função de buscar todos os clientes
async function fetchAllCustumers(): Promise<Customer[] | void> {
  try {
    const result = await db.allDocs({ include_docs: true })
    return result.rows.map((row) => row.doc as Customer)
  } catch (err) {
    console.log('Erro ao buscar')
    return []
  }
}

ipcMain.handle('fetch-all-customers', async () => {
  const result = await fetchAllCustumers()
  return result
})

//Buscar cliente pelo ID
async function fetchCustomerById(docId: string) {
  return db
    .get(docId)
    .then((doc) => doc)
    .catch((err) => {
      console.log('Erro ao buscaro pelo Id', err)
      return null
    })
}

ipcMain.handle('fetch-customer-id', async (event, docId) => {
  const result = await fetchCustomerById(docId)
  return result
})

//deletar um cliente pelo ID
async function deleteCustomer(docId: string) {
  try {
    const doc = await db.get(docId)

    const result = await db.remove(doc._id, doc._rev)

    return result
  } catch (err) {
    console.log('Erro ao deletar o cliente', err)
    return null
  }
}

ipcMain.handle('delete-customer', async (event, docId) => {
  const result = await deleteCustomer(docId)
  return result
})
