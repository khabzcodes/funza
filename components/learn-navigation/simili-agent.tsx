import React, { useRef, useState } from "react";
import { DailyProvider } from "@daily-co/daily-react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import { VideoBox } from "./video-box";
import { Button } from "../ui/button";
import { Icons } from "../icons";

interface SimliAgentProps {
  user: {
    name: string;
  }
  onStart: () => void;
  onClose: () => void;
}

const SIMLI_API_KEY = process.env.NEXT_PUBLIC_SIMLI_API_KEY;

export const SimliAgent: React.FC<SimliAgentProps> = ({ user, onStart, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const myCallObjRef = useRef<DailyCall | null>(null);
  const [chatbotId, setChatbotId] = useState<string | null>(null);

  const handleJoinRoom = async () => {
    setIsLoading(true);

    const response = await fetch("https://api.simli.ai/startE2ESession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: SIMLI_API_KEY,
        faceId: "e279cc3c-cbc4-47af-8d45-eb34eb443f3e",
        voiceId: "79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e",
        firstMessage: "",
        systemPrompt: "Act as a helpful tutor",
      }),
    });

    const data = await response.json();
    const roomUrl = data.roomUrl;

    let newCallObject = DailyIframe.getCallInstance();
    if (newCallObject === undefined) {
      newCallObject = DailyIframe.createCallObject({
        videoSource: false,
      });
    }

    newCallObject.setUserName(user.name);

    await newCallObject.join({ url: roomUrl });
    myCallObjRef.current = newCallObject;
    setCallObject(newCallObject);

    loadChatbot();
  };

  const loadChatbot = async () => {
    if (myCallObjRef.current) {
      let chatbotFound: boolean = false;

      const participants = myCallObjRef.current.participants();
      for (const [_, participant] of Object.entries(participants)) {
        if (participant.user_name === "Chatbot") {
          setChatbotId(participant.session_id);
          chatbotFound = true;
          setIsLoading(false);
          setIsAvatarVisible(true);
          onStart();
          break;
        }
      }
      if (!chatbotFound) {
        setTimeout(loadChatbot, 500);
      }
    } else {
      setTimeout(loadChatbot, 500);
    }
  };

  const handleLeaveRoom = async () => {
    if (callObject) {
      await callObject.leave();
      setCallObject(null);
      onClose();
      setIsAvatarVisible(false);
      setIsLoading(false);
    } else {
      console.log("CallObject is null");
    }
  };

  return (
    <>
      {isAvatarVisible && (
        <div className="h-[350px] w-[350px]">
          <div className="h-[350px] w-[350px]">
            <DailyProvider callObject={callObject}>
              {chatbotId && <VideoBox key={chatbotId} id={chatbotId} />}
            </DailyProvider>
          </div>
        </div>
      )}
      <div className="mb-auto" />
      <div className="flex flex-col items-center">
        {!isAvatarVisible ? (
          <Button size="sm" variant="default" className="w-full cursor-pointer"
            onClick={handleJoinRoom}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="size-4 animate-spin text-white" />
            ) : (
              <span className="font-abc-repro-mono font-bold w-[164px]">
                Ask Tutor
              </span>
            )}
          </Button>
        ) : (
          <>
            <div className="flex items-center gap-4 w-full">
              <Button size="sm" variant="destructive" className="w-full cursor-pointer"
                onClick={handleLeaveRoom}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="size-4 animate-spin text-white" />
                ) : (
                  <span className="font-abc-repro-mono font-bold w-[164px]">
                    Stop Session
                  </span>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};