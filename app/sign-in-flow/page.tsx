import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getInitUser } from '../actions'

export default async function signFlow() {
  return await getInitUser()
}
