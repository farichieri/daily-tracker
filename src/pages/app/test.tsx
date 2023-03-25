import "react-datepicker/dist/react-datepicker.css";
import { formatISO, setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import React, { useState } from "react";

const TestPaget = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const createCalendarEvent = async () => {
    const token = localStorage.getItem("gcl");
    console.log({ token });

    if (!endDate || !setEndDate) return;
    console.log("Creating calendar event");
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: startDate && formatISO(startDate),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: formatISO(endDate),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    console.log({ event });
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token, //Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.error) {
          alert("Event created, check your Google Calendar!");
        } else {
          alert(data.error.message);
        }
      });
  };

  return (
    <PremiumLayout withPadding={false}>
      <div className="my-32 text-red-500">
        <p>from</p>
        <DatePicker
          className="rounded-16"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          injectTimes={[
            setHours(setMinutes(new Date(), 1), 0),
            setHours(setMinutes(new Date(), 5), 12),
            setHours(setMinutes(new Date(), 59), 23),
          ]}
          dateFormat="MMMM d, yyyy HH:MM"
        />
        <p>to</p>
        <DatePicker
          wrapperClassName="datePicker"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          injectTimes={[
            setHours(setMinutes(new Date(), 1), 0),
            setHours(setMinutes(new Date(), 5), 12),
            setHours(setMinutes(new Date(), 59), 23),
          ]}
          dateFormat="MMMM d, yyyy HH:MM"
        />
        <p>Event name</p>
        <input
          type="text"
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
        />
        <p>Event description</p>
        <input
          type="text"
          onChange={(e) => setEventDescription(e.target.value)}
          value={eventDescription}
        />
        <button onClick={() => createCalendarEvent()}>
          Create Calendar Event
        </button>
      </div>
    </PremiumLayout>
  );
};

export default TestPaget;
