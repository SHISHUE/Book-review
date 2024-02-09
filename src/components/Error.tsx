import { BiSolidError } from "react-icons/bi";

function Error() {
  return (
    <div className="w-full h-screen bg-zinc-900 flex justify-center items-center">
      <h1 className="text-red-500 text-[3vw] leading-none flex flex-col items-center gap-3"><BiSolidError className="text-[8vw]"/> 404 Page Not Found</h1>
    </div>
  )
}

export default Error