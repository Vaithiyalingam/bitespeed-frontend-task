import backArrow from "../../public/assets/back_arrow.svg";
import messageBlack from "../../public/assets/message_black.svg";
import messageBlue from "../../public/assets/message_blue.svg";
import whatsappLogo from "../../public/assets/whatsapp_logo.svg";

export type TImages =
  | "backArrow"
  | "messageBlack"
  | "messageBlue"
  | "whatsappLogo";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  backArrow,
  messageBlack,
  messageBlue,
  whatsappLogo,
};
