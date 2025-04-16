export interface Model {
  id: string;
  name: string;
  description: string;
  free: boolean;
}

export const models: Model[] = [
  {
    id: "meta-llama/llama-3-8b-instruct",
    name: "LLaMA 3 8B Instruct",
    description: "Fast, strong at general-purpose use, reasoning, Q&A",
    free: true,
  },
  {
    id: "mistralai/mixtral-8x7b-instruct",
    name: "Mixtral 8x7B Instruct",
    description: "Coding, complex tasks, very accurate",
    free: true,
  },
  {
    id: "openchat/openchat-3.5-1210",
    name: "OpenChat 3.5",
    description: "Chatty, responsive, good for conversation & logic",
    free: true,
  },
  {
    id: "meta-llama/llama-2-13b-chat",
    name: "LLaMA 2 13B Chat",
    description: "Balanced, smart, suitable for summaries & learning",
    free: true,
  },
  {
    id: "huggingfaceh4/zephyr-7b-beta",
    name: "Zephyr 7B Beta",
    description: "Friendly, aligned, best for teaching and clean output",
    free: true,
  },
];
