import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { Opener } from "./opener/Opener";
import { SystemProsIntro } from "./systempros/SystemProsIntro";
import { LVL2Intro } from "./lvl2/LVL2Intro";
import { FundYourBusinessIntro } from "./fundyourbusiness/FundYourBusinessIntro";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FundYourBusinessIntro"
        component={FundYourBusinessIntro}
        durationInFrames={2937}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LVL2Intro"
        component={LVL2Intro}
        durationInFrames={3072}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SystemProsIntro"
        component={SystemProsIntro}
        durationInFrames={2880}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="GHLWhatsAppOpener"
        component={Opener}
        durationInFrames={909}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
