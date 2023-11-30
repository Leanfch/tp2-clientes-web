import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { auth } from "./firebase.js"
import { createUserProfile, getUserProfileById } from "./user.js"

let userData = {
    id: null,
    email: null,
    role: null,
}
let observers = []

if (localStorage.getItem("user")) {
    userData = JSON.parse(localStorage.getItem("user"))
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        getUserProfileById(user.uid).then((profile) => {
            setUserData({
                id: user.uid,
                email: user.email,
                role: profile.role,
            })
            localStorage.setItem("user", JSON.stringify(userData))
        })
    } else {
        clearUserData()
        localStorage.removeItem("user")
    }
})

/**
 *
 * @param {{email: string, password: string, role: string, name: string, last_name: string}} user
 * @returns {Promise}
 */
export async function register({ email, password, name, last_name }) {
    try {
        console.log(email, password, name, last_name)
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )

        createUserProfile(userCredentials.user.uid, { email, name, last_name })

        return {
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
            name,
            last_name,
        }
    } catch (error) {
        return {
            code: error.code,
            message: error.message,
        }
    }
}

/**
 * Inicia sesión.
 *
 * @param {{email: string, password: string}} user
 * @return {Promise}
 */
export function login({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            setUserData({
                id: userCredentials.user.uid,
                email: userCredentials.user.email,
                role: userCredentials.user.role,
            })

            return { ...userData }
        })
        .catch((error) => {
            return {
                code: error.code,
                message: error.message,
            }
        })
}

/**
 *
 * @returns {Promise}
 */
export function logout() {
    const promise = signOut(auth)
    clearUserData()

    return signOut(auth)
}

/**
 *
 * Agrega un observer
 *
 * @param {({id: null|string, email: null|string}) => void} observer
 * @returns {() => void} Cancela la subscripción
 */
export function subscribeToAuth(observer) {
    observers.push(observer)

    notify(observer)

    return () => {
        observers = observers.filter((obs) => obs !== observer)
    }
}

/**
 * Notifica a todos los observers.
 */
function notifyAll() {
    observers.forEach((observer) => notify(observer))
}

/**
 * Notifica a un observador.
 *
 * @param {({id: null|string, email: null|string}) => void} observer
 */
function notify(observer) {
    observer({ ...userData })
}

/**
 *
 * @param {{id: null|string, email: null|string}} newData
 */
function setUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    }
    notifyAll()
}

function clearUserData() {
    setUserData({
        id: null,
        email: null,
    })
}

export function getUserData() {
    return { ...userData }
}
