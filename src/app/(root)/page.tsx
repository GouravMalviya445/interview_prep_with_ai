import React from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
import { getCurrentUser, getInterviewsByUserId, getLatestInterviews } from '@/lib/action/auth.action';

export default async function Root() {

  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id as string),
    await getLatestInterviews({userId: user?.id as string})
  ])

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;
  
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback </h2>
          <p className="text-lg">Practice on real interview questions & get instant feedback</p>
          <Button asChild className="btn-primary max-sm:w-full">
                <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="Robo-dude"
          width={400} height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* This section is for the user to see their past interviews */}
      <section className="flex flex-col gap-6 mt8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))) : (
                <p>You have&apos;t taken any interviews</p>
              )
          }
        </div>
      </section>

      <section  className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
              latestInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))) : (
                <p>There are no interviews available</p>
              )
          }
        </div>
      
      </section>

    </>
  )
}
