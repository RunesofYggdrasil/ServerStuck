"use server";

import fetchAPI from "../api/fetch";
import { Message, Pronoun } from "./prisma-definitions";

export async function handleSearchPronouns(
  pronounKey: number | number[] | string | string[] | (string | number)[]
): Promise<Pronoun[]> {
  const pronounRequests: Pronoun[] = [];
  let getPronounRequest: Pronoun;
  if (Array.isArray(pronounKey)) {
    for (let i = 0; i < pronounKey.length; i++) {
      const currentKey = pronounKey[i];
      if (typeof currentKey == "string") {
        getPronounRequest = await fetchAPI(
          "GET",
          "/pronouns/name/" + currentKey
        );
      } else {
        getPronounRequest = await fetchAPI(
          "GET",
          "/pronouns/" + currentKey.toString()
        );
      }
      pronounRequests.push(getPronounRequest);
    }
  } else {
    if (typeof pronounKey == "string") {
      getPronounRequest = await fetchAPI("GET", "/pronouns/name/" + pronounKey);
    } else {
      getPronounRequest = await fetchAPI(
        "GET",
        "/pronouns/" + pronounKey.toString()
      );
    }
    pronounRequests.push(getPronounRequest);
  }

  return pronounRequests;
}

export async function handlePronouns(
  pronounKey: number | number[] | string | string[] | (string | number)[]
): Promise<string> {
  const searchPronounsRequest: Pronoun[] = await handleSearchPronouns(
    pronounKey
  );
  if (searchPronounsRequest.length == 0) {
    return "";
  } else if (searchPronounsRequest.length == 1) {
    const searchPronounCases = searchPronounsRequest[0].cases;
    if (Array.isArray(searchPronounCases)) {
      return searchPronounCases[0] + "/" + searchPronounCases[1];
    } else {
      return searchPronounCases.nom + "/" + searchPronounCases.obj;
    }
  } else {
    const pronounCases: string[] = [];
    for (let i = 0; i < searchPronounsRequest.length; i++) {
      const searchPronounCases = searchPronounsRequest[i].cases;
      if (Array.isArray(searchPronounCases)) {
        pronounCases.push(searchPronounCases[0]);
      } else {
        pronounCases.push(searchPronounCases.nom);
      }
    }
    return pronounCases.join("/");
  }
}

export async function handlePronounsMessage(
  pronounKey: number | number[] | string | string[] | (string | number)[],
  messageID?: number
): Promise<string> {
  const searchPronounsRequest: Pronoun[] = await handleSearchPronouns(
    pronounKey
  );
  if (searchPronounsRequest.length == 0) {
    return "";
  } else {
    let messageText: string = "";
    if (messageID != undefined) {
      const getMessageRequest: Message = await fetchAPI(
        "GET",
        "/message/" + messageID
      );
      messageText = getMessageRequest.message;
    } else {
      try {
        const getMessageRequest: Message = await fetchAPI(
          "GET",
          "/message/first/type/PRONOUN"
        );
        messageText = getMessageRequest.message;
      } catch (error) {
        messageText = "";
      }
    }
    return messageText;
  }
}

function findNextMessageForm(messageText: string) {
  const messageFormIndices = [
    messageText.indexOf("{NOM}") >= 0
      ? messageText.indexOf("{NOM}")
      : messageText.length,
    messageText.indexOf("{OBJ}") >= 0
      ? messageText.indexOf("{OBJ}")
      : messageText.length,
    messageText.indexOf("{DET}") >= 0
      ? messageText.indexOf("{DET}")
      : messageText.length,
    messageText.indexOf("{POS}") >= 0
      ? messageText.indexOf("{POS}")
      : messageText.length,
    messageText.indexOf("{REF}") >= 0
      ? messageText.indexOf("{REF}")
      : messageText.length,
  ];
  const messageFormNextIndex = Math.min(...messageFormIndices);
  if (messageFormNextIndex >= messageText.length) {
    return -1;
  } else {
    return messageFormNextIndex;
  }
}
