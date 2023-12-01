import {getAboutPageFromDb, updateAboutPage} from "@/services/MetaService";
import {auth} from "@/auth";

export const GET = async () => Response.json(await getAboutPageFromDb());

export const POST = auth(async (request: Request) => {
  const {auth} = request as any;
  if (!auth) return new Response(null, {status: 401});
  const body: { content: string } = await request.json();
  try {
    await updateAboutPage(body.content);
  } catch (e) {
    console.error(e);
    return Response.error();
  }
  return new Response(null, {status: 204});
}) as any;