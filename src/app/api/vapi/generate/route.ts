import {NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function POST(request: NextRequest, response: NextResponse) {
  const { type, role, level, techstack, amount, userId } = await request?.json();
  if (!type || !role || !level || !techstack || !amount || !userId) {
    return NextResponse.json({
      success: false,
      error: "Missing required parameters"
    }, {status: 400})
  }
  
  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioral and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      role, type, level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString()
    }

    await db.collection("interviews").add(interview);

    return NextResponse.json({
      success: true,
    })
    
  } catch (error) {
    console.log(error);
        
    return NextResponse.json({
      success: false,
      error
    }, {status: 200})
  }
}