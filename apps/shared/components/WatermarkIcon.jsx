import React from "react";
import FacebookIcon from "./icons/FacebookIcon.jsx";
import GitHubIcon from "./icons/GitHubIcon.jsx";
import GitLabIcon from "./icons/GitLabIcon.jsx";
import LinkedInIcon from "./icons/LinkedInIcon.jsx";
import PinterestIcon from "./icons/PinterestIcon.jsx";
import RedditIcon from "./icons/RedditIcon.jsx";
import TwitchIcon from "./icons/TwitchIcon.jsx";
import TwitterIcon from "./icons/TwitterIcon.jsx";
import WeiboIcon from "./icons/WeiboIcon.jsx";
import "./WatermarkIcon.css";

export default function WatermarkIcon({ icon }) {
  switch (icon) {
    case "facebook":
      return <FacebookIcon />;
    case "github":
      return <GitHubIcon />;
    case "gitlab":
      return <GitLabIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "pinterest":
      return <PinterestIcon />;
    case "reddit":
      return <RedditIcon />;
    case "twitch":
      return <TwitchIcon />;
    case "twitter":
      return <TwitterIcon />;
    case "weibo":
      return <WeiboIcon />;
    default:
      return null;
  }
}
