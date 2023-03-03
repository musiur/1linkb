const mongoose = require("mongoose");

const Editor = mongoose.model(
  "Editor",
  new mongoose.Schema({
    username: String,
    editorData: Object
  })
);

module.exports = Editor;

// {
//     username: String,
//     appearance: {
//         background: [
//             {
//                 id: Number,
//                 color: String
//             }
//         ],
//         buttonConfig: {
//             buttonBackground: String,
//             buttonRoundness: String,
//             buttonRoundnessFor: Number,
//             buttonStyle: {
//                 i: Number,
//                 j: Number
//             },
//             buttonStyleFor: {
//                 background: String,
//                 border: String,
//                 color: String
//             }
//         },
//         iconStyle: String
//     },
//     books: [
//         {
//             id: Number,
//             bookbuttons: {
//                 id: Number,
//                 label: String,
//                 options: [
//                     {
//                         id: Number,
//                         label: String,
//                         url: String,
//                     }
//                 ]
//             },
//             bookcover: String,
//             outline: String,
//             pagecount: String,
//             title: String
//         }
//     ],
//     headers: {
//         name: String,
//         outline: String,
//         url: String,
//         profilePicture: String,
//         bannerPicture: String,
//         hide1link: Boolean
//     },
//     links: [
//         {
//             id: Number,
//             label: String,
//             url: String
//         }
//     ],
//     socialLinks: [
//         {
//             id: Number,
//             label: String,
//             url: String
//         }
//     ],
//   }
