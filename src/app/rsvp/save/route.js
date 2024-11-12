import { GoogleSpreadsheet } from "google-spreadsheet";

function formatRow(fields) {
  const rowData = { addedOn: new Date().toISOString() };

  for (const [key, value] of Object.entries(fields)) {
    rowData[key] = transformDataForHumans(value).trim();
  }

  return rowData;
}

function transformDataForHumans(data) {
  if (typeof data === "object" && !Array.isArray(data)) {
    // Transform object values recursively
    let transformedString = "";

    for (const [key, value] of Object.entries(data)) {
      transformedString += `${key}: ${transformDataForHumans(value)}\n`;
    }

    return transformedString;
  } else if (Array.isArray(data)) {
    // Check if the value is an array
    const transformedArray = data.map((item) => {
      if (typeof item === "object" && !Array.isArray(item)) {
        return transformDataForHumans(item);
      } else {
        return item.toString();
      }
    });

    return transformedArray.join("\n\n");
  } else {
    // Handle other value types
    return data.toString();
  }
}

import { NextResponse } from "next/server";

export const POST = async (req) => {
  console.log('IN POST');
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

// sheet.addRow({Name: 'Baby', Attending: 'Y', Email: 'dan@gobloom.io', Phone: '999-555'})

  return NextResponse.json(
    { message: "Submission recorded!" },
    { status: 200 }
  );
};