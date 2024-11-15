"use client";

import React from "react";

import { Button, RadioGroup, NumberField, TextField } from "@/components";
import { Radio } from "react-aria-components";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";

import formStyles from "./RsvpForm.module.css";

const emptyGuest = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  attending: "yes",
  guestCount: 1,
};

const initialValues = {
  ...emptyGuest,
};

export default function RsvpForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState();

  return (
    <Formik initialValues={initialValues}>
      {({
        values,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        ...formikBag
      }) => {
        return (
          <Form
            style={{ background: "#F7F3E9" }}
            onSubmit={async (event) => {
              event.preventDefault();

              formikBag.setSubmitting(true);
              // - loading thanks page
              router.prefetch("/rsvp/thanks");

              try {
                console.log("TRY", values);

                const res = await fetch("/rsvp/save", {
                  method: "POST",
                  body: JSON.stringify({ row: values }),
                  headers: { "Content-Type": "application/json" },
                });

                if (res.ok) {
                  if (values.attending === "yes") {
                    router.push("/rsvp/thanks");
                  } else {
                    router.push("/rsvp/miss-you");
                  }
                } else {
                  throw new Error("Failed to save RSVP");
                }
              } catch (err) {
                console.error(err);
                setErrorMsg(err.message);
                formikBag.setSubmitting(false);
              }
            }}
          >
            <div className={formStyles.formSection}>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  gap: "1.15rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  isRequired
                  label="First name"
                  name={`firstName`}
                  value={values.firstName}
                  onChange={(val) => setFieldValue(`firstName`, val)}
                  onBlur={() => setFieldTouched(`firstName`)}
                />
                <TextField
                  isRequired
                  label="Last name"
                  name={`lastName`}
                  value={values.lastName}
                  onChange={(val) => setFieldValue(`lastName`, val)}
                  onBlur={() => setFieldTouched(`lastName`)}
                />
                <TextField
                  isRequired
                  label="Email"
                  name={`email`}
                  value={values.email}
                  onChange={(val) => setFieldValue(`email`, val)}
                  onBlur={() => setFieldTouched(`email`)}
                />
                <TextField
                  isRequired
                  label="Phone"
                  name={`phone`}
                  value={values.phone}
                  onChange={(val) => setFieldValue(`phone`, val)}
                  onBlur={() => setFieldTouched(`phone`)}
                />
              </div>
            </div>
            <div className={formStyles.formSection}>
              <h2>Are you able to attend?</h2>

              <RadioGroup
                name={`attending`}
                orientation="horizontal"
                onChange={(val) => {
                  setFieldValue(`attending`, val);
                  setFieldTouched(`attending`);
                }}
                value={values.attending}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>

              {values.attending === "yes" && (
                <NumberField
                  style={{ marginTop: "1rem" }}
                  label="Number of guests"
                  name={`guestCount`}
                  value={values.guestCount}
                  // className={`react-aria-TextField ${formStyles.GuestItem__phone}`}
                  onChange={(val) => setFieldValue(`guestCount`, val)}
                  onBlur={() => setFieldTouched(`guestCount`)}
                />
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ color: "black" }}
            >
              {isSubmitting ? "..." : "Submit"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
