import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  type DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore"
import { firestore } from "$lib/firestore"
import type { DiceSet, DieType } from "$lib/types"

export async function getDiceSets(): Promise<DiceSet[]> {
  const querySnapshot = await getDocs(collection(firestore, "DiceSet").withConverter(diceSetConverter))
  return querySnapshot.docs.map((x) => x.data())
}

export async function getDiceSet(setId: NonNullable<DiceSet["id"]>): Promise<DiceSet | null> {
  const documentSnapshot = await getDoc(doc(firestore, "DiceSet", setId).withConverter(diceSetConverter))
  return documentSnapshot.exists() ? documentSnapshot.data() : null
}

export async function saveDiceSet(set: DiceSet): Promise<DiceSet[]> {
  console.log("##!## saveDiceSet", set)

  if (!set.id) {
    const diceSetCollection = collection(firestore, "DiceSet").withConverter(diceSetConverter)
    const result = await addDoc(diceSetCollection, set)
    console.log("#### Add result", result)
  } else {
    const result = await setDoc(doc(firestore, "DiceSet", set.id).withConverter(diceSetConverter), set)
    console.log("#### Set result", result)
  }

  return await getDiceSets()
}

export async function deleteDiceSet(setId: NonNullable<DiceSet["id"]>): Promise<DiceSet[]> {
  await deleteDoc(doc(firestore, "DiceSet", setId))
  return await getDiceSets()
}

const dieTypeConverter = {
  toFirestore(dieType: DieType): DocumentData {
    return { ...dieType, name: dieType.name ?? "" }
  },
  fromFirestore(data: DocumentData): DieType {
    return { faces: data.faces, count: data.count, name: data.name ?? "" }
  },
}

const diceSetConverter = {
  toFirestore(diceSet: DiceSet): DocumentData {
    return diceSet
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>): DiceSet {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      name: data.name,
      slug: data.slug,
      dice: data.dice.map(dieTypeConverter.fromFirestore),
    }
  },
}
