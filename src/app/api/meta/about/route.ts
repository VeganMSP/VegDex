import {getAboutPageFromDb, updateAboutPage} from "@/services/MetaService";

export const GET = async () => Response.json(await getAboutPageFromDb());

export const POST = async (request: Request) => {
  const body: {content: string} = await request.json();
  try {
    await updateAboutPage(body.content);
  } catch (e) {
    console.error(e);
    return Response.error();
  }
  return new Response(null, {status: 204});
};