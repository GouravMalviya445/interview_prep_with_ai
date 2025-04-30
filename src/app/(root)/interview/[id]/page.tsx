import { getInterviewById } from '@/lib/action/general.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

async function page({ params }: RouteParams) {
  const { id } = await params;
  const interview = await getInterviewById(id);

  if (!interview) redirect("/");
  
  return (
    <>
      <div className='flex flex-row gap-4 justify-between '>
        <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
          <div className='flex flex-row gap-4 items-center'>
            <Image 
              src={getRandomInterviewCover()}
              alt='cover-image'
              className='rounded-full object-cover size-[40px]'
              width={40}
              height={40}
            />
            <h3 className='capitalize'>{interview.role} Interview</h3>
          </div>
        </div>
      </div> 
    </>
  )
}

export default page