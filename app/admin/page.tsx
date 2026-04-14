import { redirect } from 'next/navigation'

export default function Admin() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sv48v185'
  redirect(`https://www.sanity.io/desk;${projectId}`)
}