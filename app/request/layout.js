import SpaceForm from "./form.js";
import { getRequestableSpaces } from "../../lib/notion.js";

export default async function Layout({ children }) {
  const spaces = await getRequestableSpaces();
  return (
    <div>
      <SpaceForm locations={spaces} />
      <div className="absolute right-0 top-20 w-2/3">{children}</div>
    </div>
  );
}
