import PromptSection from "./PromptSection"
import SideBar from "./SideBar"

const MainSection = () => {
  return (
    <div className="flex w-full">
      <div className="w-[25%] fixed inset-0">
        <SideBar/>
      </div>
      <div className="w-[75%] fixed top-0 left-0 ml-[25%] h-screen">
        <PromptSection />
      </div>
    </div>
  )
}

export default MainSection
