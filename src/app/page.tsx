import FullBanner from "@/components/FullBanner";
import MainBanner from "@/components/home/MainBanner";
import SplitBanner from "@/components/SplitBanner";
import SplitBannerChild from "@/components/SplitBannerChild";

export default function Home() {
  return (
    <div className="w-full h-fit">
      <MainBanner/>
      <SplitBanner className="border-y-4 border-black">
        <SplitBannerChild icon="/mono_pokeball.svg" alt="pokeball">
          Include Pokémon from Kanto to Paldea! Choose from one to multiple regions!
        </SplitBannerChild>
        <SplitBannerChild icon="/hint.svg" alt="hint">
          Have unlimited attempts to guess the hidden Pokémon! As you guess, the Pokémon will be revealed!
        </SplitBannerChild>
        <SplitBannerChild icon="/api.svg" alt="API">
          All data is supplied by the free open-source RESTful API, <a href="https://pokeapi.co/" className="underline text-red-400">PokéAPI</a>
        </SplitBannerChild>
      </SplitBanner>
      <FullBanner>
        <h1 className="text-4xl font-bold mb-4">Test Your Pokemon Knowledge!</h1>
        <p className="indent-8 text-xl px-32 text-center">
          Pokédle, a Pokémon themed guessing game inspired by Wordle, tests if you can uncover the hidden chosen Pokémon. Like Wordle, as you continue to guess, based on your guessed 
          Pokémon, hints will be given out to help you to the correct Pokémon! Additionally, series of hints will be available if you choose to use them, gradually becoming more 
          helpful! 
        </p>
      </FullBanner>
    </div>
  );
}
