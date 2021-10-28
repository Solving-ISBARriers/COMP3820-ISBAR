import React from "react";
import '@shoelace-style/shoelace/dist/themes/light.css';

export class Recommendation extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <sl-form>
                    <sl-textarea rows={4}>
                    </sl-textarea>
                </sl-form>
            </div>
        )
    }
}
