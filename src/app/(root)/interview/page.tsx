import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/action/auth.action'
import React from 'react'

async function page() {
  const user = await getCurrentUser();
  console.log(user)
  
  return (
    <>
      <h3>Interview Generation</h3>
      <Agent
        userName={user?.name!}
        userId={user?.id}
        type="generate"
      />
    </>
  )
}

export default page