import {message} from "antd";

export const toolbar = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{header: 1}, {header: 2}], // custom button values
  [{list: "ordered"}, {list: "bullet"}],
  [{script: "sub"}, {script: "super"}], // superscript/subscript
  [{indent: "-1"}, {indent: "+1"}], // outdent/indent
  [{direction: "rtl"}], // text direction

  [{size: ["small", false, "large", "huge"]}], // custom dropdown
  [{header: [1, 2, 3, 4, 5, 6, false]}],

  [{color: []}, {background: []}], // dropdown with defaults from theme
  [{font: []}],
  [{align: []}],
  ["link", "image"],
  ["clean"],
];

export const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const {status} = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const changeDateFormat = (date) => {
  const newDate = new Date(date).toLocaleDateString();
  const newTime = new Date(date).toLocaleTimeString();
  let [day, month, year] = newDate.split("/");
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;
  return [year, month, day].join("-") + "T" + newTime;
};

export const handleRate = (prevMonth, thisMonth) => {
  const rate = (+thisMonth * 100) / +prevMonth;

  return (rate - 100).toFixed(2);
};
