import { ISubsite } from "@/types/subsite.type";
import Image from "next/image";

interface SubsiteProps {
  subsite: ISubsite;
}

export default function Subsite(props: SubsiteProps) {
  return (
    <>
      <div className="subsite_header">
        <div className="subsite_header_top">
          {props.subsite.banner ? (
            <Image src={`${props.subsite.banner}`} alt={"banner"} fill={true} />
          ) : null}
        </div>
        <div className="subsite_header_bottom">
          <div className="subsite_header_bottom_avatar">
            <div className="subsite_header_bottom_avatar_img">
              <Image
                src={`${props.subsite.avatar}`}
                alt={"user avatar"}
                width={"80"}
                height={"80"}
              ></Image>
            </div>
          </div>
          {/* переделать обоим сущностям на name*/}
          {props.subsite.login ? (
            <div className="subsite_header_bottom_login">
              {props.subsite.login}
            </div>
          ) : (
            <div className="subsite_header_bottom_login">
              {props.subsite.name}
            </div>
          )}
          <div className="subsite_header_bottom_stats">
            {props.subsite.rating ? (
              <div className="subsite_header_bottom_stats_rating">
                +{props.subsite.rating}
              </div>
            ) : null}
            {props.subsite.signUpDate ? (
              <div className="subsite_header_bottom_stats_since">
                с 2022 {/*{props.subsite.signUpDate.getFullYear()}*/}
              </div>
            ) : null}
          </div>
          {props.subsite.description ? (
            <div className="subsite_header_bottom_description">
              {props.subsite.description}
            </div>
          ) : null}
          <div className="subsite_header_bottom_followers">
            <div className="subsite_header_bottom_followers_subscribers">
              <span>{props.subsite.subscribers}</span> подписчика
            </div>
            {props.subsite.subscriptions ? (
              <div className="subsite_header_bottom_followers_subscriptions">
                <span>{props.subsite.subscriptions}</span> подписки
              </div>
            ) : null}
          </div>
          <div className="subsite_header_bottom_controls">
            <div className="subsite_header_bottom_controls_tabs">
              <div className="subsite_header_bottom_controls_tabs_item">
                Записи
              </div>
            </div>
            <div className="subsite_header_bottom_controls_toggler">
              <Image
                src={"/expand.svg"}
                alt={"expand"}
                height={"24"}
                width={"24"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="subsite_feed"></div>
    </>
  );
}
