import React from 'react';
import { Dimensions } from 'react-native';
import moment from 'moment';
import Popover from './Popover';
import CalendarView from './SingleDatePicker';

const MaxWidth = Dimensions.get("screen").width;

type PopoverDatePickerProps = {
  date: moment.Moment | null;
  setDate: (date: moment.Moment | null) => void;
};

const PopoverDatePicker = (Props: PopoverDatePickerProps) => {
  return (
    <Popover
      width={MaxWidth - 60}
      text={moment(Props.date).isValid() ? moment(Props.date).format("YYYY/ MM/ DD") : "날짜를 선택해주세요."} >
      <CalendarView
          date={Props.date}
          setDate={Props.setDate}
          minDate={moment().add(-6, "months")}
          maxDate={moment().add(6, "months")}
        />
    </Popover>
  );
}

export default PopoverDatePicker;
