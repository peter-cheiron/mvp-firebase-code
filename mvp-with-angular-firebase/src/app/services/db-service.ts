import { Injectable, inject, signal } from "@angular/core";
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs, 
  serverTimestamp, 
  query,
  where
} from "@angular/fire/firestore";
import { Auth, onAuthStateChanged, User } from "@angular/fire/auth";


@Injectable({ providedIn: "root" })
export class DbService<T> {
  
  db = inject(Firestore);
  COLLECTION = "T";

  private auth = inject(Auth); // used for adding userID to activities
  user = signal<User|undefined>(undefined);

  constructor(){
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

    /** List the current user's Ts once (newest first). */
  async list(): Promise<T[]> {
    const col = collection(this.db, this.COLLECTION);
    const snap = await getDocs(col);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
  }


  /** Get a single T by id (once). Returns null if not found. */
  async get(id: string): Promise<T | null> {
    const ref = doc(this.db, this.COLLECTION, id);
    const snap = await getDoc(ref);
    return snap.exists() ? {id:snap.id, ...snap.data()} as T : null;
  }

  /** Create a T and return its new id. */
  async add(data:T): Promise<string> {
    // 3. Get the current user from the Auth service.
    const user = this.auth.currentUser;
    console.log("do we have a user", user?.uid)
    // 4. Ensure a user is logged in before adding.
    if (!user) {
      throw new Error("User must be logged in to create an T.");
    }
    // 5. Attach the userID to the T data.
    const res = await addDoc(collection(this.db, this.COLLECTION), {
      ...data,
      userId: user.uid, // 5. Add the user's unique ID to the document.
      createdAt: serverTimestamp() // It's good practice to add a creation timestamp.
    });
    return res.id;
  }

  /** Patch fields on a T. */
  async update(id: string, patch: Partial<T>): Promise<void> {
    await updateDoc(doc(this.db, this.COLLECTION, id), {
      ...patch,
      updatedAt: serverTimestamp(),
    } as any);
  }

  /** Delete a T. */
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, this.COLLECTION, id));
  }

  async filter(field: string, value: string): Promise<T[] | null> {
    try {
      const coll = collection(this.db, this.COLLECTION);
      // Support nested fields like "location.placeId"
      const q = query(coll, where(field, '==', value));//
      const snap = await getDocs(q);
      if (snap.empty) return null;
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
    } catch (err) {
      console.error('[TService.query] error:', err);
      return null;
    }
  }

  /** Does a document with this id exist? */
  async exists(id: string): Promise<boolean> {
    try {
      const snap = await getDoc(doc(this.db, this.COLLECTION, id));
      return snap.exists();
    } catch (e) {
      // If rules deny read, you can either rethrow or treat as non-existent:
      // throw e;
      return false;
    }
  }

}
