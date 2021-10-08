//Want to compartmentalize the table contents

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Bar from './Bar';

// export default function TableContents() {
//   return (
//     <tbody>
//       <tr>
//         <th>Test</th>
//         <th>Actions</th>
//         <th>"High Score</th>
//         <th>Percentile</th>
//       </tr>
//       <tr id="odd-row">
//         <th>Squats</th>
//         <th>
//           <Link to="/squats" style={{ color: 'blue' }}>
//             Play
//           </Link>
//         </th>
//         {this.props.name ? (
//           <th>{this.state.maxSquat ? this.state.maxSquat : '?'}</th>
//         ) : (
//           <th>
//             {Number(localStorage.getItem('squatCount'))
//               ? Number(localStorage.getItem('squatCount'))
//               : '?'}
//           </th>
//         )}
//         {this.props.name ? (
//           <th>
//             <Bar
//               bgcolor={
//                 this.percentRank(
//                   this.state.allSquatNums,
//                   this.state.maxSquat
//                 ) <= 0.25
//                   ? 'red'
//                   : this.percentRank(
//                       this.state.allSquatNums,
//                       this.state.maxSquat
//                     ) > 0.25 &&
//                     this.percentRank(
//                       this.state.allSquatNums,
//                       this.state.maxSquat
//                     ) <= 0.75
//                   ? 'goldenrod'
//                   : this.percentRank(
//                       this.state.allSquatNums,
//                       this.state.maxSquat
//                     ) > 0.75
//                   ? 'green'
//                   : '#e0e0de'
//               }
//               completed={
//                 this.percentRank(this.state.allSquatNums, this.state.maxSquat)
//                   ? (
//                       this.percentRank(
//                         this.state.allSquatNums,
//                         this.state.maxSquat
//                       ) * 100
//                     ).toFixed(2)
//                   : '?'
//               }
//             />
//           </th>
//         ) : (
//           <th>
//             <Bar
//               bgcolor={
//                 this.percentRank(
//                   this.state.allSquatNums,
//                   Number(localStorage.getItem('squatCount'))
//                 ) <= 0.25
//                   ? 'red'
//                   : this.percentRank(
//                       this.state.allSquatNums,
//                       Number(localStorage.getItem('squatCount'))
//                     ) > 0.25 &&
//                     this.percentRank(
//                       this.state.allSquatNums,
//                       Number(localStorage.getItem('squatCount'))
//                     ) <= 0.75
//                   ? 'goldenrod'
//                   : this.percentRank(
//                       this.state.allSquatNums,
//                       Number(localStorage.getItem('squatCount'))
//                     ) > 0.75
//                   ? 'green'
//                   : '#e0e0de'
//               }
//               completed={
//                 this.percentRank(
//                   this.state.allSquatNums,
//                   Number(localStorage.getItem('squatCount'))
//                 )
//                   ? (
//                       this.percentRank(
//                         this.state.allSquatNums,
//                         Number(localStorage.getItem('squatCount'))
//                       ) * 100
//                     ).toFixed(2)
//                   : '?'
//               }
//             />
//           </th>
//         )}
//       </tr>
//       <tr>
//         <th>Pushups</th>
//         <th>
//           <Link to="/pushups" style={{ color: 'blue' }}>
//             Play
//           </Link>
//         </th>
//         {this.props.name ? (
//           <th>{this.state.maxPushup ? this.state.maxPushup : '?'}</th>
//         ) : (
//           <th>
//             {Number(localStorage.getItem('pushupCount'))
//               ? Number(localStorage.getItem('pushupCount'))
//               : '?'}
//           </th>
//         )}
//         {this.props.name ? (
//           <th>
//             <Bar
//               bgcolor={
//                 this.percentRank(
//                   this.state.allPushupNums,
//                   this.state.maxPushup
//                 ) <= 0.25
//                   ? 'red'
//                   : this.percentRank(
//                       this.state.allPushupNums,
//                       this.state.maxPushup
//                     ) > 0.25 &&
//                     this.percentRank(
//                       this.state.allPushupNums,
//                       this.state.maxPushup
//                     ) <= 0.75
//                   ? 'goldenrod'
//                   : this.percentRank(
//                       this.state.allPushupNums,
//                       this.state.maxPushup
//                     ) > 0.75
//                   ? 'green'
//                   : '#e0e0de'
//               }
//               completed={
//                 this.percentRank(this.state.allPushupNums, this.state.maxPushup)
//                   ? (
//                       this.percentRank(
//                         this.state.allPushupNums,
//                         this.state.maxPushup
//                       ) * 100
//                     ).toFixed(2)
//                   : '?'
//               }
//             />
//           </th>
//         ) : (
//           <th>
//             <Bar
//               bgcolor={
//                 this.percentRank(
//                   this.state.allPushupNums,
//                   Number(localStorage.getItem('pushupCount'))
//                 ) <= 0.25
//                   ? 'red'
//                   : this.percentRank(
//                       this.state.allPushupNums,
//                       Number(localStorage.getItem('pushupCount'))
//                     ) > 0.25 &&
//                     this.percentRank(
//                       this.state.allPushupNums,
//                       Number(localStorage.getItem('pushupCount'))
//                     ) <= 0.75
//                   ? 'goldenrod'
//                   : this.percentRank(
//                       this.state.allPushupNums,
//                       Number(localStorage.getItem('pushupCount'))
//                     ) > 0.75
//                   ? 'green'
//                   : '#e0e0de'
//               }
//               completed={
//                 this.percentRank(
//                   this.state.allPushupNums,
//                   Number(localStorage.getItem('pushupCount'))
//                 )
//                   ? (
//                       this.percentRank(
//                         this.state.allPushupNums,
//                         Number(localStorage.getItem('pushupCount'))
//                       ) * 100
//                     ).toFixed(2)
//                   : '?'
//               }
//             />
//           </th>
//         )}
//       </tr>
//       <tr id="odd-row">
//         <th>Dips</th>
//         <th>
//           <Link to="/dips" style={{ color: 'blue' }}>
//             Play
//           </Link>
//         </th>
//         {this.props.name ? (
//           <th>{this.state.maxDip ? this.state.maxDip : '?'}</th>
//         ) : (
//           <th>
//             {Number(localStorage.getItem('dipCount'))
//               ? Number(localStorage.getItem('dipCount'))
//               : '?'}
//           </th>
//         )}
//         {this.props.name ? (
//           <th>
//             <Bar
//               bgcolor={
//                 this.percentRank(this.state.allDipNums, this.state.maxDip) <=
//                 0.25
//                   ? 'red'
//                   : this.percentRank(this.state.allDipNums, this.state.maxDip) >
//                       0.25 &&
//                     this.percentRank(
//                       this.state.allDipNums,
//                       this.state.maxDip
//                     ) <= 0.75
//                   ? 'goldenrod'
//                   : this.percentRank(this.state.allDipNums, this.state.maxDip) >
//                     0.75
//                   ? 'green'
//                   : '#e0e0de'
//               }
//               completed={
//                 this.percentRank(this.state.allDipNums, this.state.maxDip)
//                   ? (
//                       this.percentRank(
//                         this.state.allDipNums,
//                         this.state.maxDip
//                       ) * 100
//                     ).toFixed(2)
//                   : '?'
//               }
//             />
//           </th>
//         ) : (
//           <th>
//             <Bar
//               bgcolor={
//                 this.percentRank(
//                   this.state.allDipNums,
//                   Number(localStorage.getItem('dipCount'))
//                 ) <= 0.25
//                   ? 'red'
//                   : this.percentRank(
//                       this.state.allDipNums,
//                       Number(localStorage.getItem('dipCount'))
//                     ) > 0.25 &&
//                     this.percentRank(
//                       this.state.allDipNums,
//                       Number(localStorage.getItem('dipCount'))
//                     ) <= 0.75
//                   ? 'goldenrod'
//                   : this.percentRank(
//                       this.state.allDipNums,
//                       Number(localStorage.getItem('dipCount'))
//                     ) > 0.75
//                   ? 'green'
//                   : '#e0e0de'
//               }
//               completed={
//                 this.percentRank(
//                   this.state.allDipNums,
//                   Number(localStorage.getItem('dipCount'))
//                 )
//                   ? (
//                       this.percentRank(
//                         this.state.allDipNums,
//                         Number(localStorage.getItem('dipCount'))
//                       ) * 100
//                     ).toFixed(2)
//                   : '?'
//               }
//             />
//           </th>
//         )}
//       </tr>
//     </tbody>
//   );
// }
