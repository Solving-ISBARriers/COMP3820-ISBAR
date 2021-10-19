import React from "react";

export class Assessment extends React.Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <div className="title">
        <p>Assessment</p>
    </div>

    <div className="main">
        <div className="content">
            <textarea className="textarea" rows="6" value="Latest clinical assessment :" />
            <div className="sign">
                <p className="sign-title">Vital signs time</p>
                <ul>
                    <li>
                        <div>
                            <div className="time" >
                                <p className="p1">AM</p>
                                <p className="p2">PM</p>
                            </div>
                            <input />
                            :
                            <input />

                            <input />
                            /
                            <input />
                            /
                            <input />
                        </div>
                    </li>
                    <li>
                        <label>Temp.</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>Resp rate</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>Pulse</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>Pain Score</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>SpO2</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>O2 rate/device</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>B.P</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>Urine output</label>
                        <input type="text" className="input" />
                    </li>
                    <li>
                        <label>Hb</label>
                        <input type="text" className="input" />
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div className="foot">
        <ul className="foot-ul">
            <li className="foot-li" id="arrow-left">
                <img src="img/arrow1.png" width="60" />
            </li>
            <li className="foot-li">
                <div className="foot-li-div foot-li-div-0">
                    <p>I</p>
                </div>
            </li>
            <li className="foot-li">
                <div className="foot-li-div foot-li-div-1">
                    <p>S</p>
                </div>
            </li>
            <li className="foot-li">
                <div className="foot-li-div foot-li-div-2">
                    <p>B</p>
                </div>
            </li>
            <li className="foot-li">
                <div className="foot-li-div foot-li-div-3 checked">
                    <p>A</p>
                </div>
            </li>
            <li className="foot-li">
                <div className="foot-li-div foot-li-div-4">
                    <p>R</p>
                </div>
            </li>
            <li className="foot-li" id="arrow-right">
                <img src="img/arrow2.png" width="60" />
            </li>
        </ul>
    </div>
            </div>
        )
    }
}
