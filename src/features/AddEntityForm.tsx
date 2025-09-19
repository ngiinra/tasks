import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BeatLoader } from "react-spinners";

function AddEntityForm({
  entityName,
  children,
  isLoading,
  clicked,
  setClicked,
}: {
  entityName?: string;
  children: React.ReactNode;
  isLoading: boolean;
  clicked: boolean;
  setClicked: Function;
}) {
  function handleShowForm() {
    setClicked((pre: boolean) => !pre);
  }
  return (
    <div className="w-full border-1 rounded-md text-center">
      <p
        className={`cursor-pointer transition-all duration-400 ${
          clicked
            ? "opacity-0 invisible h-0"
            : "visible opacity-100 h-auto py-3"
        }`}
        onClick={handleShowForm}
      >
        + افزودن {entityName}
      </p>
      <form
        className={`transition-all duration-200 overflow-hidden ${
          clicked ? "visible opacity-100 h-65" : "opacity-0 invisible h-0"
        }`}
      >
        <div
          className={`relative h-full w-full overflow-hidden p-3
          }`}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 border-b-1 mb-3">
              <h2 className="text-md">افزودن {entityName}</h2>
              <MdOutlineKeyboardBackspace
                className="size-8 opacity-80 hover:opacity-100 cursor-pointer"
                onClick={handleShowForm}
              />
            </div>

            {children}
          </div>
          {isLoading && (
            <div className="absolute inset-0 bg-green-800/80 flex items-center justify-center">
              <BeatLoader />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddEntityForm;
