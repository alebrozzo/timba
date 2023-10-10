import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  type DocumentData,
  QueryDocumentSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore"
import { firestore } from "$lib/firestore"
import type { DiceSet, DieType } from "$lib/types"

export async function getDiceSets(): Promise<DiceSet[]> {
  const querySnapshot = await getDocs(
    query(collection(firestore, "DiceSet").withConverter(diceSetConverter), where("isActive", "==", true))
  )
  return querySnapshot.docs.map((x) => x.data())
}

export async function getDiceSet(setId: NonNullable<DiceSet["id"]>): Promise<DiceSet | null> {
  const documentSnapshot = await getDoc(doc(firestore, "DiceSet", setId).withConverter(diceSetConverter))
  return documentSnapshot.exists() ? documentSnapshot.data() : null
}

export async function saveDiceSet(set: DiceSet): Promise<DiceSet[]> {
  if (!set.id) {
    const diceSetCollection = collection(firestore, "DiceSet").withConverter(diceSetConverter)
    const result = await addDoc(diceSetCollection, set)
    //TODO: how to know if no insert?
  } else {
    const result = await setDoc(doc(firestore, "DiceSet", set.id).withConverter(diceSetConverter), set)
    //TODO: how to know if no update?
  }

  return await getDiceSets()
}

export async function deleteDiceSet(setId: NonNullable<DiceSet["id"]>): Promise<DiceSet[]> {
  await updateDoc(doc(firestore, "DiceSet", setId), { isActive: false })
  return await getDiceSets()
}

const dieTypeConverter = {
  toFirestore(dieType: DieType): DocumentData {
    return { ...dieType, name: dieType.name ?? "" }
  },
  fromFirestore(data: DocumentData, id: string): DieType {
    return { faces: data.faces, count: data.count, name: data.name ?? "", id: id.toString() }
  },
}

const diceSetConverter = {
  toFirestore(set: DiceSet): DocumentData {
    return { ...set, dice: set.dice.map(dieTypeConverter.toFirestore), isActive: true }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>): DiceSet {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      name: data.name,
      slug: data.slug,
      dice: data.dice.map((x: DieType, ix: number) => dieTypeConverter.fromFirestore(x, ix)),
    }
  },
}
