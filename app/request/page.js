import { getRequestableSpaces } from "../../lib/notion";
import SpaceRequest from "./request";

export default async function RequestPage() {
  const spaces = await getRequestableSpaces();

  return (
    <div>
      <SpaceRequest spaces={spaces} />
    </div>
  );
}
