import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { BsChevronDoubleRight } from "../../utils/icons";
import { Sidebar } from "../../pages/Places/Sidebar";

export const LayoutSidebarCrud = ({ value }) => {
  const { activeSidebarCrud, setActiveSidebarCrud } = useStateContext();

  return (
    <div className={`flex flex-col h-full w-[500px] h-full right-0 top-0 fixed bg-gray-200 shadow-xl transition duration-500 ease-in-out`}>
      <div className="relative top-0 text-white flex flex-row justify-between items-center gap-2 z-10 p-3">
        <BsChevronDoubleRight
          className="text-blue-400 absolute left-3 top-3 cursor-pointer"
          size={20}
          onClick={() => setActiveSidebarCrud(!activeSidebarCrud)}
        />        
      </div>

      <div className="absolute top-0 w-full overflow-y-auto">        
        { value === 'Places' && <Sidebar /> }
      </div>
    </div>
  );
};