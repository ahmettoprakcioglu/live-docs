import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  const { id, emailAddresses, firstName, lastName, imageUrl } = clerkUser;
  const user = {
    id,
    info: {
      id,
      email: emailAddresses[0].emailAddress,
      name: `${firstName} ${lastName}`,
      avatar: imageUrl,
      color: getUserColor(id)
    }
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: []
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}