`use strict`

// import the dom
import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOne.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}


// // GET ONE function
// const getOne = () => {
//   DOM.listOutput.innerHTML = ``;
//   const id=inputOne;
//   axios.get('/read/:id')
//     .then((response) => {
//       if (!Array.isArray(response.data)) {
//         writeItem(response.data);
//       } else {
//         for (let item of response.data) {
//           writeItem(item);
//         }
//       }
//     }).catch((err) => {
//       console.log(err);
//     });
// }


// POST function
const post = () => {
  axios.post(`/create`, {   name : DOM.inputName.value,
                            description : DOM.inputDescription.value, 
                            price : DOM.inputPrice.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

// Set up the buttons' on click events
// CREAT 
DOM.buttonCreate.onclick = () => post();
// READ One
DOM.buttonOne.onclick = () => get();

// run the get function on page load
get();