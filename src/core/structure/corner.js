import {FORMS} from "../../utils/constants";
import Rectangle from "./rectangle";

class Corner extends Rectangle {
    constructor(props) {
        super(props);
        this.type = FORMS.CORNER;
    }
}

export default Corner;
