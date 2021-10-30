import React from "react";


export class Recommendation extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="container  mx-auto px-10 sm:px-8 max-w-7xl py-10">
                <sl-form>
                    <sl-textarea rows={4}>
                    </sl-textarea>
                </sl-form>
            </div>
        )
    }
}
