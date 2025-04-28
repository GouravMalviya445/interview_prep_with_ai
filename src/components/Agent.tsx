"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image'
import React, { useState } from 'react'

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}


function Agent({ userName }: AgentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messages = [
    "Whats your name?",
    "My name is John Doe Nice to meet you",
  ]
  const lastMessage = messages[messages.length - 1];
  
  return (
    <>
      <div className='call-view'>
        <div className='card-interviewer'>
          <div className='avatar'>
            <Image
              alt='agent'
              src='/ai-avatar.png'
              width={65}
              height={54}
              className='object-cover'
            />
            {isSpeaking && <span className='animate-speak'/>}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className='card-border'>
          <div className='card-content'>
            <Image
              alt='User avatar'
              src='/user-avatar.png'
              width={540}
              height={540}
              className='object-cover rounded-full size-[120px]'
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className='transcript-border'>
          <div className='transcript'>
            <p key={lastMessage} className={cn("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100")}>
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      
      <div className='w-full flex justify-center'>
        {callStatus !== "ACTIVE" ? (
          <button className='btn-call relative'>
            <span
              className={cn("absolute animate-ping rounded-full opacity-75", callStatus === "CONNECTING" && "hidden")}
            />
            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : "..."}
            </span>
          </button>
        ) : (
          <button className='btn-disconnect'>
            End
          </button>
        )}
      </div>
    </>
  )
}

export default Agent