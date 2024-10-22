import React from "react";
import { render, screen } from "@testing-library/react";
import Notifications from "./Notifications";
import { BrowserRouter as Router } from "react-router-dom";

const bookingDetailsMock = [
  { room: "Room 101", time: "10:00 AM" },
  { room: "Room 102", time: "11:00 AM" },
];

const notificationDetailsMock = [
  { name: "COMP602 Lecture", date: "2024-10-23" },
  { name: "COMP603 Lab", date: "2024-10-24" },
];

describe("Notifications Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Notifications bookingDetails={bookingDetailsMock} notificationDetails={notificationDetailsMock} />
      </Router>
    );
  });

  // Update this test to use getAllByText
  test("renders the notifications header", () => {
    const headerElements = screen.getAllByText(/notifications/i); // Use getAllByText
    expect(headerElements.length).toBeGreaterThan(0); // Check if at least one header is present
  });

  test("renders booking notifications", () => {
    const bookingElements = screen.getAllByText(/your booking has been confirmed/i);
    expect(bookingElements).toHaveLength(2);
  });

  test("renders class notifications", () => {
    const classNotificationElements = screen.getAllByText(/upcoming class/i);
    expect(classNotificationElements).toHaveLength(2);
  });

  test("displays no bookings found message when no bookings are provided", () => {
    render(
      <Router>
        <Notifications bookingDetails={[]} notificationDetails={notificationDetailsMock} />
      </Router>
    );
    const noBookingsElement = screen.getByText(/no bookings found/i);
    expect(noBookingsElement).toBeInTheDocument();
  });

  test("displays no class notifications found message when no notifications are provided", () => {
    render(
      <Router>
        <Notifications bookingDetails={bookingDetailsMock} notificationDetails={[]} />
      </Router>
    );
    const noClassNotificationsElement = screen.getByText(/no class notifications found/i);
    expect(noClassNotificationsElement).toBeInTheDocument();
  });
});