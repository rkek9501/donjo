import React, { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Direction } from "react-native-calendars/src/types";
import moment from "moment";
import Svg, { Path } from "react-native-svg";

const Arrow = ({ direction }: {direction: Direction}) => <Svg width="16" height="22" viewBox="0 0 16 22" fill="none" rotation={direction === "right" ? 0 : 180}>
  <Path d="M1.52197 1.86957L12 10.5L1.52197 20.1304" stroke="black" strokeWidth="4" />
</Svg>;

const DATE_FORMAT = "YYYY-MM-DD";
const MONTH_FORMAT = "YYYY-MM";
const now = moment();
// const minDate = moment().add(-6, "months");
// const maxDate = moment().add(6, "months");

type CalendarViewProps = {
  date?: moment.Moment | null;
  setDate?: (date: moment.Moment | null) => void;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
};
const CalendarView = (Props: CalendarViewProps) => {
  const [date, setDate] = useState<string | null>(Props.date?.format(DATE_FORMAT) || null );

  useEffect(() => {
    Props.setDate?.(date ? moment(date) : null);
  }, [date]);

  const maxMonth = useMemo(() => {
    if (typeof Props.maxDate !== "undefined") {
      return Props.maxDate.format(MONTH_FORMAT);
    }
    return null;
  }, [Props.maxDate]);
  const minMonth = useMemo(() => {
    if (typeof Props.minDate !== "undefined") {
      return Props.minDate.format(MONTH_FORMAT);
    }
    return null;
  }, [Props.minDate]);

  return <Calendar
    // markingType={'period'}
    initialDate={now.format(DATE_FORMAT)}
    minDate={Props.minDate?.format(DATE_FORMAT)}
    maxDate={Props.maxDate?.format(DATE_FORMAT)}
    onDayPress={day => {
      if (date === day.dateString) {
        setDate(null);
      } else {
        setDate(day.dateString);
      }
    }}
    onDayLongPress={day => {
      // console.log('selected day', day);
    }}
    monthFormat={'yyyy MM'}
    onMonthChange={month => {
      // console.log('month changed', month);
    }}
    renderArrow={(direction) => <Arrow direction={direction} />}
    hideExtraDays={true}
    disableMonthChange={true}
    // firstDay={1}
    // hideDayNames={true}
    // showWeekNumbers={true}
    onPressArrowLeft={(subtractMonth, month) => {
      const monthString = moment(new Date(month)).format(MONTH_FORMAT);
      if (monthString > minMonth) subtractMonth();
    }}
    onPressArrowRight={(addMonth, month) => {
      const monthString = moment(new Date(month)).format(MONTH_FORMAT);
      if (monthString < maxMonth) addMonth();
    }}
    disableAllTouchEventsForDisabledDays={true}
    // renderHeader={date => {
    //   /*Return JSX*/
    // }}
    enableSwipeMonths={true}
    markedDates={{
      [date]: {
        selected: true, // selectedColor: 'blue', // marked: true,
      },
    }}
  />
}

export default CalendarView;
