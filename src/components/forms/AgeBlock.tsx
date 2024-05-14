// import {
//   SelectChangeEvent,
//   MenuItem,
//   Box,
//   Divider,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
// } from '@mui/material';
// import { useState } from 'react';
// import { months, SERVICE_MESSAGES } from 'src/constants/SERVICE_MESSAGES';
// import { CustomerContectBirdthDate } from './RegistrationBlock';

// const days: string[] = [];
// const years: number[] = [];
// for (let i = 1; i < 32; i++) {
//   days.push(i.toString());
// }
// for (let i = 2024; i > 1924; i--) {
//   years.push(i);
// }
// export const AgeBlock = () => {
//   const [day, setDay] = useState<string>('');
//   const [month, setMonth] = useState<string>('');
//   const [year, setYear] = useState<string>('');

//   const handleDayChange = (event: SelectChangeEvent) => {
//     setDay(event.target.value);
//   };
//   const handleMonthChange = (event: SelectChangeEvent) => {
//     setMonth(event.target.value);
//   };
//   const handleYearChange = (event: SelectChangeEvent) => {
//     setYear(event.target.value);
//   };

//   const getDaysItems = days.map(day => {
//     return (
//       <MenuItem
//         divider={true}
//         value={day}
//         key={`day${day}`}
//         sx={{ width: 1, fontSize: '45%' }}
//       >
//         {day.length === 1 ? '0' + day : day}
//       </MenuItem>
//     );
//   });

//   const getMonthsItems = months.map(month => {
//     return (
//       <MenuItem
//         divider={true}
//         value={month}
//         key={month}
//         sx={{ width: 1, fontSize: '45%' }}
//       >
//         {month}
//       </MenuItem>
//     );
//   });
//   const getYearsItems = years.map((year, index) => {
//     return (
//       <MenuItem
//         divider={true}
//         value={index}
//         key={`year${year}`}
//         sx={{ width: 1, fontSize: '45%' }}
//       >
//         {year}
//       </MenuItem>
//     );
//   });
//   return (
//     <CustomerContectBirdthDate.Provider value={{ day, month, year }}>
//       <Box sx={{ mt: 3, mb: 3, mr: 'auto', ml: 'auto', minWidth: 120 }}>
//         <Divider sx={{ mb: 2 }}>Data of your birth</Divider>
//         <Grid container spacing={2}>
//           <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
//             <InputLabel id="day" sx={{ fontSize: '50%' }}>
//               {SERVICE_MESSAGES.day}
//             </InputLabel>
//             <Select
//               labelId="day"
//               id="day"
//               value={day}
//               label="day"
//               sx={{ fontSize: '50%' }}
//               onChange={handleDayChange}
//             >
//               {getDaysItems}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
//             <InputLabel id="month" sx={{ fontSize: '50%' }}>
//               {SERVICE_MESSAGES.month}
//             </InputLabel>
//             <Select
//               labelId="month"
//               id="month"
//               value={month}
//               label="month"
//               sx={{ fontSize: '50%' }}
//               onChange={handleMonthChange}
//             >
//               {getMonthsItems}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
//             <InputLabel id="year" sx={{ fontSize: '50%' }}>
//               {SERVICE_MESSAGES.year}
//             </InputLabel>
//             <Select
//               labelId="year"
//               id="year"
//               value={year}
//               label="year"
//               sx={{ fontSize: '50%' }}
//               onChange={handleYearChange}
//             >
//               {getYearsItems}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Box>
//     </CustomerContectBirdthDate.Provider>
//   );
// };
