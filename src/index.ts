type Item =
  {
    name: "name" | "address";
    label: string;
    tagName: "input";
    type: "text";
    placeholder: string;
  } | {
    name: "email";
    label: string;
    tagName: "input";
    type: "email";
    placeholder: string;
  } | {
    name: "tel";
    label: string;
    tagName: "input";
    type: "tel";
    placeholder: string;
  } | {
    name: "time";
    tagName: "input";
    type: "checkbox";
    label: string;
    values: {label: string, value: number}[];
  } | {
    name: "contact";
    label: string;
    tagName: "input";
    type: "radio";
    values: { label: string, value: number }[];
  } | {
    name: "inquiry_kind";
    label: string;
    tagName: "select";
    options: { text: string, value: number } [];
  } | {
    name: "inquiry_detail";
    label: string;
    tagName: "textarea";
    placeholder: string;
  }
;


// DO NOT EDIT!!!!
const items: Item[] = [
  {
    name: "name",
    label: "お名前",
    tagName: "input",
    type: "text",
    placeholder: "例）山田　太郎",
  },
  {
    name: "email",
    label: "メールアドレス",
    tagName: "input",
    type: "email",
    placeholder: `例）example@gmail.com`,
  },
  {
    name: "tel",
    label: "電話番号",
    tagName: "input",
    type: "tel",
    placeholder: "例）080-1234-5678",
  },
  {
    name: "address",
    label: "ご住所",
    tagName: "input",
    type: "text",
    placeholder: "例）東京都千代田区丸の内1丁目9-2",
  },
  {
    name: "contact",
    label: "ご希望の返信方法",
    tagName: "input",
    type: "radio",
    values: [
      { label: "メール", value: 0 },
      { label: "電話", value: 1 },
      { label: "どちらでも可", value: 2 },
    ],
  },
  {
    name: "time",
    label: "連絡可能な時間帯（電話）",
    tagName: "input",
    type: "checkbox",
    values: [
      { label: "09:00〜12:00", value: 0 },
      { label: "13:00〜16:00", value: 1 },
      { label: "16:00〜19:00", value: 2 },
    ],
  },
  {
    name: "inquiry_kind",
    label: "お問い合せの種類",
    tagName: "select",
    options: [
      { text: "返品について", value: 0 },
      { text: "発送について", value: 1 },
      { text: "その他", value: 2 },
    ],
  },
  {
    name: "inquiry_detail",
    label: "お問い合せ内容",
    tagName: "textarea",
    placeholder: "例）お問い合わせ内容詳細をご記入ください",
  },
];



// _____________________________________________________________________________
//

function createInputRow(item: Item) {
  switch (item.name){
    case "contact":
      let radioRows = "";
      for(var itemVal of item.values){
        radioRows += `<input type="radio" name="q1" value=${itemVal.value}> ${itemVal.label}`
      }
      return `
      <tr>
        <th>
        ${item.label}
        </th>
        <td>` + radioRows
        +`</td>
      </tr>
      `;
    case "time":
      let radioRows = "";
      for(var itemVal of item.values){
        radioRows += `<input type="radio" name="q1" value=${itemVal.value}> ${itemVal.label}`
      }
      return `
      <tr>
        <th>
        ${item.label}
        </th>
        <td>`+ radioRows
        +`</td>
      </tr>
      `;
    case "name":
    case "email":
    case "tel":
    case "address":
      return `
        <tr>
          <th>
          ${item.label}
          </th>
          <td>
            <input placeholder=${item.placeholder}>
            </input>
          </td>
        </tr>
        `;
    default:
      return `
        <tr>
          <th>
          ${item.label}
          </th>
          <td>
            <input>
            </input>
          </td>
        </tr>
      `;
  }
}

function createSelectRow(item: Item) {
  let optionRows = "";
  for(var itemOption of item.options){
    optionRows += "<option value=${itemOption.value}>${itemOptions.text}</option>"
  }
  if (item.name != "inquiry_kind") return "";
  return `
    <tr>
      <th>
      ${item.label}
      </th>
      <td>
        <select>
          <option value=${item.options[0].value}>${item.options[0].text}</option>
          <option value=${item.options[1].value}>${item.options[1].text}</option>
          <option value=${item.options[2].value}>${item.options[2].text}</option>
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: Item) {
  if(item.name != "inquiry_detail") return "";
  return `
    <tr>
      <th>
      ${item.label}
      </th>
      <td>
        <textarea placeholder=${item.placeholder}></textarea>
      </td>
    </tr>
  `;
}

function createTable() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case "input":
          return createInputRow(item);
        case "select":
          return createSelectRow(item);
        case "textarea":
          return createTextAreaRow(item);
      }
    })
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");
  if (!form) throw new Error("element named \"form\" not found");
  form.innerHTML = createTable();
}

createFormDom();
