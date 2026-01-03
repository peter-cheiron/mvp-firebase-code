import { Injectable, inject } from "@angular/core";
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
import { Activity } from "../models/activity";


@Injectable({ providedIn: "root" })
export class DbActivityService {
  private db = inject(Firestore);
  private readonly COLLECTION = "activity";

    /** List the current user's Activitys once (newest first). */
  async list(): Promise<Activity[]> {
    const col = collection(this.db, this.COLLECTION);
    const snap = await getDocs(col);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Activity));
  }


  /** Get a single Activity by id (once). Returns null if not found. */
  async get(id: string): Promise<Activity | null> {
    const ref = doc(this.db, this.COLLECTION, id);
    const snap = await getDoc(ref);
    return snap.exists() ? {id:snap.id, ...snap.data()} as Activity : null;
  }

  /** Create a Activity and return its new id. */
  async add(data:Activity): Promise<string> {
    const res = await addDoc(collection(this.db, this.COLLECTION), {
      ...data,
    });
    return res.id;
  }

  /** Patch fields on a Activity. */
  async update(id: string, patch: Partial<Activity>): Promise<void> {
    await updateDoc(doc(this.db, this.COLLECTION, id), {
      ...patch,
      updatedAt: serverTimestamp(),
    } as any);
  }

  /** Delete a Activity. */
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, this.COLLECTION, id));
  }

    async filter(field: string, value: string): Promise<Activity[] | null> {
    try {
      const coll = collection(this.db, this.COLLECTION);
      // Support nested fields like "location.placeId"
      const q = query(coll, where(field, '==', value));//
      const snap = await getDocs(q);
      if (snap.empty) return null;
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Activity));
    } catch (err) {
      console.error('[ActivityService.query] error:', err);
      return null;
    }
  }

}
