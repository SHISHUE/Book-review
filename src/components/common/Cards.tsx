import { useNavigate} from 'react-router-dom'

function Cards({ book }) {

    const navigate = useNavigate()

  return (
    <div className="w-[25vw] h-[18vw] cursor-pointer px-3 py-2 bg- text-black flex  mx-auto shadow-xl border-[1px] border-zinc-400  rounded-xl" onClick={() => navigate(`/book-details/${book.id}`)}>
      <img
        src={book?.volumeInfo?.imageLinks?.thumbnail}
        alt="book-thumbnail"
        className="w-[12vw] rounded-md"
      />

      <div className="flex flex-col px-3 justify-between">
        <h1 className="text-[1.5vw] font-semibold ">
          {book?.volumeInfo?.title}
        </h1>

        <div>
          <h3 className="text-[1.1vw] text-slate-500">
            <span className="font-bold text-zinc-900">Categories :</span>{" "}
            {book?.volumeInfo?.categories}
          </h3>
          <h3 className="text-[1.1vw] text-slate-500">
            <span className="font-bold text-zinc-900">Author :</span>
            {book?.volumeInfo?.authors
              ? book?.volumeInfo?.authors
              : "Anonymous"}
          </h3>
        </div>
      </div>

      {/* <h3>
            {book?.volumeInfo?.description
              ? book?.volumeInfo?.description
              : "Description not available"}
          </h3> */}
    </div>
  );
}

export default Cards;
