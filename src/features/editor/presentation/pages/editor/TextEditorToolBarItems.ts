import bold from '../../../../../images/bold.svg';
import italic from '../../../../../images/italic.svg';
import underline from '../../../../../images/underline.svg';
import strikethrough from '../../../../../images/strikethrough.svg';
import monospace from '../../../../../images/monospace.svg';
import fontSize from '../../../../../images/font-size.svg';
import indent from '../../../../../images/indent.svg';
import outdent from '../../../../../images/outdent.svg';
import ordered from '../../../../../images/list-ordered.svg';
import unordered from '../../../../../images/list-unordered.svg';
import left from '../../../../../images/align-left.svg';
import center from '../../../../../images/align-center.svg';
import right from '../../../../../images/align-right.svg';
import justify from '../../../../../images/align-justify.svg';
import color from '../../../../../images/color.svg';
import eraser from '../../../../../images/eraser.svg';
import link from '../../../../../images/link.svg';
import unlink from '../../../../../images/unlink.svg';
import emoji from '../../../../../images/emoji.svg';
import embedded from '../../../../../images/embedded.svg';
import image from '../../../../../images/image.svg';
import undo from '../../../../../images/undo.svg';
import redo from '../../../../../images/redo.svg';
import subscript from '../../../../../images/subscript.svg';
import superscript from '../../../../../images/superscript.svg';
import './texted-editor.style.scss';
/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
const ToolBarItems={
  options: [
    "history",
    "fontFamily",
    "blockType",
    "fontSize",
    "inline",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "emoji",
    "image",
  ],
  inline: {
    inDropdown: false,
    className: "test",
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript"
    ],
    bold: { icon: bold, className: undefined, title: "Gras" },
    italic: { icon: italic, className: undefined, title: "Italique" },
    underline: { icon: underline, className: undefined, title: "Souligner" },
    strikethrough: {
      icon: strikethrough,
      className: undefined,
      title: "Barrer"
    },
    monospace: { icon: monospace, className: undefined, title: "Subrillance" },
    superscript: { icon: superscript, className: undefined, title: "Exposant" },
    subscript: { icon: subscript, className: undefined, title: "Indice" }
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code"
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: "Format de Texte"
  },
  fontSize: {
    icon: fontSize,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,108],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: "Taille"
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana"
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: "Police"
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered", "indent", "outdent"],
    unordered: { icon: unordered, className: undefined, title: "Liste non ordorner" },
    ordered: { icon: ordered, className: undefined, title: "Liste ordonner" },
    indent: { icon: indent, className: undefined, title: "Retrait après" },
    outdent: { icon: outdent, className: undefined, title: "Retrait avant" },
    title: "Outils de Listes"
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
    left: { icon: left, className: undefined, title: "Gauche" },
    center: { icon: center, className: undefined, title: "Centre" },
    right: { icon: right, className: undefined, title: "Droit" },
    justify: { icon: justify, className: undefined, title: "Justifier" },
    title: "Alignement"
  },
  colorPicker: {
    icon: color,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)"
    ],
    title: "Couleur"
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
    link: { icon: link, className: undefined, title: "Lier" },
    unlink: { icon: unlink, className: undefined, title: "Delier" },
    linkCallback: undefined
  },
  emoji: {
    icon: emoji,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      "😀",
      "😁",
      "😂",
      "😃",
      "😉",
      "😋",
      "😎",
      "😍",
      "😗",
      "🤗",
      "🤔",
      "😣",
      "😫",
      "😴",
      "😌",
      "🤓",
      "😛",
      "😜",
      "😠",
      "😇",
      "😷",
      "😈",
      "👻",
      "😺",
      "😸",
      "😹",
      "😻",
      "😼",
      "😽",
      "🙀",
      "🙈",
      "🙉",
      "🙊",
      "👼",
      "👮",
      "🕵",
      "💂",
      "👳",
      "🎅",
      "👸",
      "👰",
      "👲",
      "🙍",
      "🙇",
      "🚶",
      "🏃",
      "💃",
      "⛷",
      "🏂",
      "🏌",
      "🏄",
      "🚣",
      "🏊",
      "⛹",
      "🏋",
      "🚴",
      "👫",
      "💪",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "🖖",
      "🤘",
      "🖐",
      "👌",
      "👍",
      "👎",
      "✊",
      "👊",
      "👏",
      "🙌",
      "🙏",
      "🐵",
      "🐶",
      "🐇",
      "🐥",
      "🐸",
      "🐌",
      "🐛",
      "🐜",
      "🐝",
      "🍉",
      "🍄",
      "🍔",
      "🍤",
      "🍨",
      "🍪",
      "🎂",
      "🍰",
      "🍾",
      "🍷",
      "🍸",
      "🍺",
      "🌍",
      "🚑",
      "⏰",
      "🌙",
      "🌝",
      "🌞",
      "⭐",
      "🌟",
      "🌠",
      "🌨",
      "🌩",
      "⛄",
      "🔥",
      "🎄",
      "🎈",
      "🎉",
      "🎊",
      "🎁",
      "🎗",
      "🏀",
      "🏈",
      "🎲",
      "🔇",
      "🔈",
      "📣",
      "🔔",
      "🎵",
      "🎷",
      "💰",
      "🖊",
      "📅",
      "✅",
      "❎",
      "💯"
    ],
    title: "Emojis"
  },
  image: {
    icon: image,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    previewImage: false,
    alignmentEnabled: true,
    uploadCallback: undefined,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto"
    },
    title: "Image depuis un internet"
  },
  remove: {
    icon: eraser,
    className: undefined,
    component: undefined,
    title: "Gommer"
  },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["undo", "redo"],
    undo: { icon: undo, className: undefined, title: "Retour arriere" },
    redo: { icon: redo, className: undefined, title: "Retour avant" },
    title: "Historique des modifications"
  }
};

export default ToolBarItems;