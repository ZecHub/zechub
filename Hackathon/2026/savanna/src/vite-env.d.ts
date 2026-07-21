/// <reference types="vite/client" />

// Garante a tipagem dos imports de imagem (import logo from "./x.png").
// O vite/client já cobre isso, mas mantemos explícito caso os tipos do
// Vite não estejam no escopo do tsconfig.
declare module "*.png" {
  const src: string;
  export default src;
}