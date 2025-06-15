export type PokemonColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "brown"
  | "black"
  | "white"
  | "gray";
  
export const colorMap: Record<PokemonColor, string> = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  yellow: "bg-yellow-300",
  purple: "bg-purple-400",
  pink: "bg-pink-300",
  brown: "bg-amber-600",
  black: "bg-gray-800 text-white",
  white: "bg-white text-black",
  gray: "bg-gray-400",
};