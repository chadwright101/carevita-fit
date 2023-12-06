import data from "@/app/_data/general-data.json";

const {
  contactPage: { phone },
} = data;

export async function GET() {
  const phoneNumber = phone;
  return Response.json(phoneNumber);
}
