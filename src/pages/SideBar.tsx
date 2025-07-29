import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const SideBar = () => {
  return (
    <div className="bg-[rgb(33,35,39)] z-2 h-screen text-[rgb(171,178,189)] border-amber-600 border-r-[2px] w-full p-2">
      <div className="flex justify-between ">
        <p className="text-xl">Portfolio<span className="text-amber-600">Pilot</span></p>
        <TbLayoutSidebarLeftCollapse className="w-6 h-6"/>
      </div>
      <button className="w-[6rem] h-[2rem] my-10 text-white font-bold bg-amber-500 rounded-2xl hover:bg-amber-600 text-[1rem] cursor-pointer hover:scale-105 transition-all duration-500">New Chat</button>
    </div>
  )
}

export default SideBar
