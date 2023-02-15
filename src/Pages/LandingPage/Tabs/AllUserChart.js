
import React, { useState, useEffect } from "react";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  LineChart,
  Line,
  Legend
} from "recharts";
import moment from 'moment';

// const data = [
//   { name: 'Jan', sales: 4000 },
//   { name: 'Feb', sales: 3000 },
//   { name: 'Mar', sales: 2000 },
//   { name: 'Apr', sales: 2780 },
//   { name: 'May', sales: 1890 },
//   { name: 'Jun', sales: 2390 },
//   { name: 'Jul', sales: 3490 },
//   { name: 'Aug', sales: 2000 },
//   { name: 'Sep', sales: 2780 },
//   { name: 'Oct', sales: 1890 },
//   { name: 'Nov', sales: 2390 },
//   { name: 'Dec', sales: 3490 },
// ];


const AllUserChart = (props) => {

  // // const [state, setState] = useState([]);
  // const [content, setContent] = useState([]);
  // console.log("All user", content);
  // const [isLoader, setIsLoader] = useState(false);


  // const subAdminAllData = async () => {
  //   await AuthService.getMethod(`${ENDPOINT.dashboards.bar_listing}`, true)
  //     .then((res) => {
  //       setContent(res.data.data.map(item => ({
  //         ...item,
  //         date: moment(item.createdDate).format('MM-DD-YYYY')
  //       })));
  //       setIsLoader(true);
  //     })
  //     .catch((err) => {
  //       swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
  //     });
  // };


  // useEffect(() => {
  //   subAdminAllData();
  // }, [])


  

  // if (!isLoader) {
  //   return (
  //     <div className='loader'>
  //       <h3>Loading...</h3>
  //     </div>
  //   );
  // }


  return (
    <>
      <div className="BarChart p-3">
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            data={props.content}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date"  tickFormatter={(date) => moment(date).format("M-D-YYYY")} />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar type="monotone" dataKey="count" barSize={50} fill="#FF7851" />
            {/* <Bar type="monotone" dataKey="email" barSize={20} fill="#FF7851" /> */}
          
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default AllUserChart;