"use client";

import React from "react";

import {
  Button,
  Form,
  TextField,
  Label,
  Text,
  Input,
} from "react-aria-components";
import { useRouter } from "next/navigation";

import formStyles from "./RsvpForm.module.css";



export default function RsvpForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState();
  const [isSaving, setIsSaving] = React.useState(false);
  const [guest, setGuest] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attending: "yes",
  });

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();
        const asRows = [
          {
            name: "Test Name",
            attending: "yes",
            email: "some@gmail.com",
            phone: "555-555-5555",
          },
        ];
        setIsSaving(true);
        try {
          const res = await fetch("/rsvp/save", {
            method: "POST",
            body: JSON.stringify({ rows: asRows }),
            headers: { "Content-Type": "application/json" },
          });

          if (res.ok) {
            // router.push("/rsvp/thanks");
            console.log("guest", guest);
            setIsSaving(false);
          } else {
            throw new Error("Failed to save RSVP");
          }
        } catch (err) {
          console.error(err);
          setIsSaving(false);
          setErrorMsg(err.message);
        }
      }}
    >
      <div>
        <TextField
          value={guest.firstName}
          style={{ color: "black", marginBottom: 10 }}
          className={`react-aria-TextField ${formStyles.GuestItem__name}`}
          onChange={(val) => setGuest({ ...guest, firstName: val })}
        >
          <Label style={{ marginRight: 4 }}>Fist Name</Label>
          <Input />
        </TextField>
        <TextField
          value={guest.lastName}
          style={{ color: "black", marginBottom: 10 }}
          className={`react-aria-TextField ${formStyles.GuestItem__name}`}
          onChange={(val) => setGuest({ ...guest, lastName: val })}
        >
          <Label style={{ marginRight: 4 }}>Last Name</Label>
          <Input />
        </TextField>
        <TextField
          value={guest.attending}
          style={{ color: "black", marginBottom: 10 }}
          className={`react-aria-TextField ${formStyles.GuestItem__name}`}
          onChange={(val) => setGuest({ ...guest, attending: val })}
        >
          <Label style={{ marginRight: 4 }}>Attending</Label>
          <Input />
        </TextField>
        <TextField
          value={guest.email}
          style={{ color: "black", marginBottom: 10 }}
          className={`react-aria-TextField ${formStyles.GuestItem__name}`}
          onChange={(val) => setGuest({ ...guest, email: val })}
        >
          <Label style={{ marginRight: 4 }}>Email</Label>
          <Input />
        </TextField>
        <TextField
          value={guest.phone}
          style={{ color: "black", marginBottom: 10 }}
          className={`react-aria-TextField ${formStyles.GuestItem__name}`}
          onChange={(val) => setGuest({ ...guest, phone: val })}
        >
          <Label style={{ marginRight: 4 }}>Phone</Label>
          <Input />
        </TextField>
      </div>
      <Button
        style={{ color: "blue" }}
        type="submit"
        onInvalid={() => {}}
        onReset={() => {}}
      >
        Submit
      </Button>
    </Form>
  );
}
