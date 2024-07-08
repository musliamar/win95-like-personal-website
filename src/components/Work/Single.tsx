import React from "react";
import { TbZoomIn } from "react-icons/tb";

// Assets
import GithubIcon from "../../media/github.png";
import YoutubeIcon from "../../media/yt.png";
import PreviewIcon from "../../media/preview.png";
import Me from "../../media/me.png";

export const Single = ({
  data: { name, desc, picture, yt, github, livePreview }
}: {
  data: {
    name: string;
    desc: string;
    picture: string;
    yt: string;
    github: string;
    livePreview: string;
  };
}) => (
  <>
    <div className="single-project">
      {window.innerWidth > 830 && (
        <div style={{ position: "relative" }}>
          <img
            src={picture !== "none" ? picture : Me}
            alt="Github icon"
            width="200"
            height="130"
          />
          <a href={picture} target="_blank" rel="noreferrer">
            <TbZoomIn
              size={24}
              style={{
                position: "absolute",
                bottom: 5,
                right: 5,
                backgroundColor: "#c1c1c1BF",
                borderRadius: "100%",
                padding: 3
              }}
            />
          </a>
        </div>
      )}
      <div className="details">
        <h3>{name}</h3>
        <span>{desc}</span>
        <div className="icons">
          {github !== "none" && (
            <a href={github} target="_blank" rel="noreferrer">
              <img src={GithubIcon} alt="Linkedin icon" width="30" />
            </a>
          )}
          {livePreview !== "none" && (
            <a href={livePreview} target="_blank" rel="noreferrer">
              <img src={PreviewIcon} alt="Linkedin icon" width="30" />
            </a>
          )}
          {yt !== "none" && (
            <a href={yt} target="_blank" rel="noreferrer">
              <img src={YoutubeIcon} alt="Linkedin icon" width="30" />
            </a>
          )}
        </div>
      </div>
    </div>
    <hr className="divider" />
  </>
);
