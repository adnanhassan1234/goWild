
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
  Legend
} from "recharts";
import moment from 'moment';

const BannedUserChart = (props) => {


  return (
    <>
        <div className="BarChart p-3">
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            data={props.bannedContent}
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

export default BannedUserChart;