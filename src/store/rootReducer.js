import adminReducers from './reducers/adminReducers'
import userReducers from './reducers/userReducers'
const rootReducers = {
    admin : adminReducers,
    user : userReducers,
}
export default rootReducers