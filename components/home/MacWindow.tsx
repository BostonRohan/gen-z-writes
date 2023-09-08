export default function MacWindow() {
  const TabButton = ({
    color,
    activeBorderColor,
    activeColor,
  }: {
    color: string;
    activeColor: string;
    activeBorderColor: string;
  }) => {
    return (
      <button
        className={`${color} rounded-[50%] w-[11px] h-[11px] active:${activeColor} active:border ${activeBorderColor}`}
      />
    );
  };
  return (
    <div className="bg-white min-h-[292px] h-full max-w-[600px] w-full rounded-md shadow-[0px_0px_20px_#acacac]">
      <div className="titlebar flex items-center px-4 justify-center h-full">
        <div className="flex gap-1 mr-auto">
          <TabButton
            activeBorderColor="border-[#b03537]"
            activeColor="bg-[#ff5c5c]"
            color="bg-[#ff5c5c]"
          />
          <TabButton
            activeBorderColor="border-[#af7c33]"
            activeColor="bg-[#c08e38]"
            color="bg-[#ffbd4c]"
          />
          <TabButton
            activeBorderColor="border-[#128435]"
            activeColor="bg-[#c08e38]"
            color="bg-[#00ca56]"
          />
        </div>
        <h4 className="mr-auto font-semibold text-sm">Gen Z Writes</h4>
      </div>
      <textarea
        defaultValue="Hey Ruby, can we think of some text to put here? :)"
        className="w-full h-full min-h-[292px] text-black rounded-md p-4 focus:outline-none"
      ></textarea>
    </div>
  );
}
