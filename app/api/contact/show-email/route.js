import data from "@/app/_data/general-data.json";

const {
  contactPage: { email },
} = data;

export async function GET() {
  return Response.json(email);
}
