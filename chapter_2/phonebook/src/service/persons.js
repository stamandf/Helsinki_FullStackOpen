import axios from 'axios';

const baseUrl =  'http://localhost:3001/persons';

const getPhoneBook = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    console.log('update request =', request);
    return request.then(response => response.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}
const phoneBookService = { 
    getPhoneBook,
    create,
    update,
    deletePerson
}
export default phoneBookService;