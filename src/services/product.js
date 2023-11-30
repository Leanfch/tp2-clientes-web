import { collection, getDocs, getDoc } from "firebase/firestore"
import { db } from "./firebase"

export async function fetchProducts() {
    const productsCollection = collection(db, "hosting")
    const querySnapshot = await getDocs(productsCollection)

    const products = []
    querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() })
    })

    return products
}

export async function fetchProductById(productId) {
    const productDoc = doc(db, "hosting", productId)
    const productSnapshot = await getDoc(productDoc)

    if (productSnapshot.exists()) {
        return { id: productSnapshot.id, ...productSnapshot.data() }
    } else {
        console.log("No such product!")
        return null
    }
}
