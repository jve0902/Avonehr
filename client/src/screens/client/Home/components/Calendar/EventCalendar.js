import React from "react";
import FullCalendar /*, { combineEventUis } */ from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function renderEventContent(eventInfo) {
  return (
    <>
      <p
        style={{
          color: "#fff",
          backgroundColor: "#2196f3",
          width: "100%",
          padding: "3px 5px",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        {eventInfo.timeText} {eventInfo.event.title}
      </p>
    </>
  );
}

const EventCalendar = ({ events, onDayClick }) => {
  const handleDateClick = (arg) => {
    // bind with an arrow function
    //alert(arg.dateStr);
    onDayClick(arg.dateStr);
  };
  console.log("events", events);
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="dayGridMonth"
      weekends={true}
      events={events}
      eventContent={renderEventContent}
      dateClick={handleDateClick}
    />
  );
};

export default EventCalendar;
