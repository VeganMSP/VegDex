import {getHomePageFromDb, updateHomePage} from "@/services/MetaService";

export const GET = async () => Response.json(await getHomePageFromDb());

export const POST = async (request: Request) => {
  const body: {content: string} = await request.json();
  try {
    await updateHomePage(body.content);
  } catch (e) {
    console.error(e);
    return Response.error();
  }
  return new Response(null, {status: 204});
};