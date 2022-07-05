/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
import React from 'react';
import { Pie } from '@ant-design/charts';

const ColorPieChart = (props) => {
  let config = {
    appendPadding: 2,
    data: props.data,
    angleField: props.angleField,
    colorField: props.colorField,
    color: props.colors,
    radius: 1,
    innerRadius: 0.54,
    legend: false,
    meta: {
      value: null,
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        formatter: function formatter() {
          return '';
        },
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      // content: '{value}',
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  };
  return <Pie {...config} />;
};
export default ColorPieChart;
