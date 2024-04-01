import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { ChatMessage, createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed to solve my problem. Use intelligent, simple, and understandable language. Be concise. It is helpful to explain your thoughts step by step and with bullet points.`;

type DemoBot = Omit<Bot, "session">;

const systemGuidelinesMessage: ChatMessage = {
  role: "system",
  content: `

  You are an expert medical doctor who always answers questions with the most relevant information using the tools at your disposal.
  These tools have information regarding symptoms that the user has stated. Do not hallucinate or provide false information about telephone numbers, addresses, websites, or any other information. Make sure it comes from the context provided.
  Here are some guidelines that you must follow:
  - * provide information on their specialist departments,the availability of medical coordinators and interpreters and any remote interpretation services
  - * Add details on their website for further information would be helpful. 
  - * provide a list of such hospitals with their contact details and reception hours
  - * Answer in the language of the user question


  `,
};

export const DEMO_BOTS: DemoBot[] = [
  {
    id: "1",
    avatar: "1fa7a",
    name: "Mutilingual Medical Assistant in Japan",
    botHello: "Hello! How can I assist you today?",
    context: [systemGuidelinesMessage],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.3,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    datasource: "ClinicsJapan",
    hideContext: true,
  },
  {
    id: "2",
    avatar: "1f916",
    name: "My files",
    botHello: "Hello! How can I assist you today?",
    context: [],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.5,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: false,
    hideContext: false,
  },
];

export const createDemoBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  DEMO_BOTS.forEach((demoBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(demoBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: true,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
