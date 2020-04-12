import * as React from "react";
import ReactPlayer from "react-player";
import { Helmet } from "react-helmet";
import "./styles.css";
import Chat from "./Chat";
import isMobile from "./isMobile";

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const onReady = () => {
    setIsReady(true);
  };
  return (
    <div className="App">
      <Helmet>
        <title>eurorack cloud radio by @gear.productions</title>
        <script
          type="text/javascript"
          src="https://platform-api.sharethis.com/js/sharethis.js#property=5e923fe47966f10012731de8&product=inline-share-buttons"
        />
      </Helmet>
       <Chat />
      <div className="share">
        <div className="title">
          eurorack cloud radio by{" "}
          <a href="https://www.instagram.com/gear.productions/" target="_blank">
            @gear.productions
          </a>
        </div>
        <div className="sharethis-inline-share-buttons" />
      </div>
      {!isReady && <div className="loading">loading</div>}
      <ReactPlayer
        className="react-player"
        height="100%"
        width="100%"
        playing
        controls={isMobile()}
        onReady={onReady}
        url="https://d17jt2qgcfqmxo.cloudfront.net/out/v1/23d18db026564b0e9c105c1a2bcec702/index.m3u8"
      />
    </div>
  );
}
