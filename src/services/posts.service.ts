import { type User } from 'firebase/auth'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore'

import { db } from '@/firebase'
import type { Post } from '@/types/post'

export const addPost = async (
  post: Omit<Post, 'id' | 'uid' | 'createdAt'>,
  user: User,
) => {
  await addDoc(collection(db, 'posts'), {
    ...post,
    uid: user.uid,
    createdAt: Date.now(),
  })
}

export const fetchUserPosts = async (user: User): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    where('uid', '==', user.uid),
    orderBy('createdAt', 'desc'),
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[]
}
