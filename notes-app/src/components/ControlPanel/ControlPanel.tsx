import ColorOption from "./ColorOption.tsx";
import colorOptions from "../../assets/colorOptions.json"
import AddButton from "./AddButton.tsx";



const ControlPanel = () => {
    return (
        <div id="controls">
            <AddButton />
            {colorOptions.map((color) => (
                <ColorOption key={color.id} color={color} />
            ))}
        </div>
    );
};

export default ControlPanel;