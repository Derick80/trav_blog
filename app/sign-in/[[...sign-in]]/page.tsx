import { getInitUser } from '@/app/actions'

export default async function Page() {
  return await getInitUser()
}
