
// import React, { useState } from "react";

// const DynamicFileUpload = () => {
//   const [formFields, setFormFields] = useState([
//     { type: "text", name: "Sponsors", value: "" },
//     { type: "file", name: "File Upload", value: "" },
//     { type: "text", name: "Image Link", value: "" }
//   ]);

//   const handleChange = (index, e) => {
//     const values = [...formFields];
//     if (e.target.type === "file") {
//       values[index].value = URL.createObjectURL(e.target.files[0]);
//     } else {
//       values[index].value = e.target.value;
//     }
//     setFormFields(values);
//   };

//   return (
//     <div>
//       {formFields.map((field, index) => {
//         return (
//           <div key={index}>
//             <label>{field.name}</label>
//             {field.type === "text" ? (
//               <input
//                 type="text"
//                 value={field.value}
//                 onChange={e => handleChange(index, e)}
//               />
//             ) : (
//               <div>
//                 <input
//                   type="file"
//                   onChange={e => handleChange(index, e)}
//                 />
//                 <img src={field.value} alt={field.name} />
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default DynamicFileUpload;


// import React, { useState } from "react";

// function DynamicFileUpload() {
//   const [fields, setFields] = useState([
//     {
//       id: 1,
//       sponsor: "",
//       file: "",
//       link: "",
//     },
//   ]);

//   const handleChange = (index, event) => {
//     const values = [...fields];
//     values[index][event.target.name] = event.target.value;
//     setFields(values);
//   };

//   const handleAddFields = () => {
//     const values = [...fields];
//     values.push({
//       id: fields.length + 1,
//       sponsor: "",
//       file: "",
//       link: "",
//     });
//     setFields(values);
//   };

//   const handleRemoveFields = (index) => {
//     const values = [...fields];
//     values.splice(index, 1);
//     setFields(values);
//   };

//   return (
//     <div>
//       {fields.map((field, index) => (
//         <div key={field.id}>
//           <input
//             type="text"
//             placeholder="Sponsors"
//             name="sponsor"
//             value={field.sponsor}
//             onChange={(event) => handleChange(index, event)}
//           />
//           <input type="file" name="file" />
//           <input
//             type="text"
//             placeholder="Image Link"
//             name="link"
//             value={field.link}
//             onChange={(event) => handleChange(index, event)}
//           />
//           <button onClick={() => handleRemoveFields(index)}>Remove</button>
//         </div>
//       ))}
//       <button onClick={handleAddFields}>Add More</button>
//     </div>
//   );
// }

// export default DynamicFileUpload;

import React, { useState } from 'react';

const DynamicFileUpload = () => {
  const [fields, setFields] = useState([{ sponsor: '', file: null, imgLink: '' }]);

  const handleAddField = () => {
    setFields([...fields, { sponsor: '', file: null, imgLink: '' }]);
  };

  const handleRemoveField = index => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleChanges = (index, event) => {
    const newFields = [...fields];
    if (event.target.name === 'file') {
      newFields[index][event.target.name] = URL.createObjectURL(event.target.files[0]);
    } else {
      newFields[index][event.target.name] = event.target.value;
    }
    setFields(newFields);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            name="sponsor"
            value={field.sponsor}
            onChange={event => handleChanges(index, event)}
          />
          <input
            type="file"
            name="file"
            onChange={event => handleChanges(index, event)}
          />
          <img src={field.file} alt="Preview" />
          <input
            type="text"
            name="imgLink"
            value={field.imgLink}
            onChange={event => handleChanges(index, event)}
          />
          <button onClick={() => handleRemoveField(index)}>X</button>
        </div>
      ))}
      <button onClick={handleAddField}>Add More</button>
    </div>
  );
};

export default DynamicFileUpload;
