import data from "@/app/_data/general-data.json";

const {
  contactPage: { email },
} = data;

export async function GET() {
  const emailAddress = email;
  return Response.json(emailAddress);
}
