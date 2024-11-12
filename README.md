## TODO

RSVP Site

Part 1 - Connect front and backend with mock data
- Backend
    - find GET request in /save/route.js
    - convert to POST (literally change the name)

- Frontend- Add submit function w/ axios or fetch (if axis add as a dependency)- have mocked data and POST to endpoint a la```// 
TODO: replace keys with header names in google sheetconst asRows = [  { name: ‘Test name’, attending: ‘yes’, contact: ‘some@email.com’ }]
	const res = await fetch("/rsvp/save", {
	  method: "POST",
	  body: JSON.stringify({ rows: asRows }),
	  headers: { "Content-Type": "application/json" },
	});	``` 
- - add <button>Save</button> w/ onClick function that calls above function
- Basic example: https://github.com/danielpowell4/nuptials/blob/main/src/app/rsvp/RsvpForm.js#L52-L86

- Backend (again)
- Uncomment lines that parse the data from the client’s callback and transform it (if needed) to the sheet
- Example: https://github.com/danielpowell4/nuptials/blob/main/src/app/rsvp/save/route.js#L52-L57
export const POST = async (req) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["RSVPs"];

  const body = await req.json();
  const { rows = [] } = body;

  for (const row of rows) {
    await sheet.addRow(formatRow(row));
  }

  return NextResponse.json(
    { message: "Submission recorded!" },
    { status: 200 }
  );
};

- Test
    - Click button on frontend, see row with data appears in google sheets
    - Change mock data (around asRows)… see saves!
    - When works, make sure to commit + push!

Part 2 - Build form on frontend
- Determine required fields
- Determine if you want to use a library or do it with react server actions 
    - Both are reasonable but a library like formik will be easier to add in client-side validation “quickly”
- If Formik
    - Find an example like https://formik.org/docs/examples/field-arrays
    - Notice that `onSubmit` is an async function (callback from part 1 will go there)
    - For submit to work in the form, button will need to have `type=“submit”` as a prop!!!
- If react server actions… find a tutorial!
    - https://react.dev/reference/react-dom/hooks/useFormStatus
- Tips
    - remember that <label>’s should have htmlFor as a prop that is the same as the input’s ID
    - radio button group’s are a wee bit annoying and should have same name but different value https://formik.org/docs/examples/radio-group

Part 3 -  redirect on success
- Add ‘thank you’ page (literally a neighboring file to the one you’re working on -> /thank-you/page.js)
- At bottom of the form submission, IF res.ok then use nextJS’s router to redirect to this new page
- https://nextjs.org/docs/app/api-reference/functions/use-router#userouter

Part 4 - Client-side Validation
- Either you’ll do it manually OR you’ll use a tool lip Yup or zod to create a validation schema
- https://formik.org/docs/guides/validation
- At bottom of guide, there are some tips on error message display
    - https://formik.org/docs/guides/validation#displaying-error-messages
- I’d probably make an ErrorMessage component and pass it the ‘name’ of the field






This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
