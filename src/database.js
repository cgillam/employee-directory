import faker from "faker"

const generateUsers = (number) => new Array(number).fill().reduce(users => {
    const user = {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }


    return [...users, user];
}, []);

const generateNewUsers = (number) => {
    localStorage.removeItem("users")
    const users = generateUsers(number)
    localStorage.setItem('users', JSON.stringify(users))
    return (users)
}

export default (number) => {
    const currentUsers = localStorage.getItem("users")
    return currentUsers ? JSON.parse(currentUsers) : generateNewUsers(number)
}