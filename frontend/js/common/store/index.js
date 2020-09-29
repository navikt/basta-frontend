import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './configureStore'
import history from '../history'

const store = configureStore()
syncHistoryWithStore(history, store)

export default store
