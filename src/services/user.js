import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    collection,
    getDocs,
} from "firebase/firestore"
import { db } from "./firebase"

/**
 * @param {string} id
 * @returns {Promise {id: string, email: string}[] }
 *
 */
export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "users"))
    const userList = []
    querySnapshot.forEach((doc) => {
        if (doc.id !== "lpzKk2JucWR1Bqyr3IOWlht8LQ33") {
            userList.push({
                id: doc.id,
                email: doc.data().email,
            })
        }
    })

    return userList
}
/**
 *
 * @param {string} id
 * @returns {Promise <{id: string, email: string}> }
 */
export async function getUserProfileById(id) {
    const refUser = doc(db, `users/${id}`)
    const docSnapshot = await getDoc(refUser)

    return {
        id: docSnapshot.id,
        email: docSnapshot.data().email,
        role: docSnapshot.data().role,
        name: docSnapshot.data().name,
        last_name: docSnapshot.data().last_name,
        hostingBought: docSnapshot.data().hostingBought,
    }
}

/**
 *
 * @param {string} id
 * @param {{email: string, name: string, last_name: string}} data
 * @returns {Promise}
 */
export async function createUserProfile(id, data) {
    const refUser = doc(db, `users/${id}`)
    return setDoc(refUser, { ...data, created_at: serverTimestamp() })
}

export default {
    getUsers,
    getUserProfileById,
    createUserProfile,
}
