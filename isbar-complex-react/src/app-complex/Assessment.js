import React from "react";

export class Assessment extends React.Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <div class="title">
        <p>Assessment</p>
    </div>

    <div class="main">
        <div class="content">
            <textarea class="textarea" rows="6">Latest clinical assessment :</textarea>
            <div class="sign">
                <p class="sign-title">Vital signs time</p>
                <ul>
                    <li>
                        <div style="width:100%;">
                            <div class="time" style="float: left;position: relative;display:flex;flex-wrap: inherit;">
                                <p class="p1">AM</p>
                                <p class="p2">PM</p>
                            </div>
                            <input style="width: 8%;height:35px;margin-left: 1%;font-size: 18px" />
                            :
                            <input style="width: 8%;height:35px;font-size: 18px" />

                            <input style="width: 10%;height:35px;margin-left: 3%;font-size: 18px" placeholder="DD" />
                            /
                            <input style="width: 10%;height:35px;margin-left: 3%;font-size: 18px" placeholder="MM" />
                            /
                            <input style="width: 12%;height:35px;margin-left: 3%;font-size: 18px" placeholder="YYYY" />
                        </div>
                    </li>
                    <li>
                        <label>Temp.</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>Resp rate</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>Pulse</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>Pain Score</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>SpO2</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>O2 rate/device</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>B.P</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>Urine output</label>
                        <input type="text" class="input" />
                    </li>
                    <li>
                        <label>Hb</label>
                        <input type="text" class="input" />
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="foot">
        <ul class="foot-ul">
            <li class="foot-li" id="arrow-left">
                <img src="img/arrow1.png" width="60" />
            </li>
            <li class="foot-li">
                <div class="foot-li-div foot-li-div-0">
                    <p>I</p>
                </div>
            </li>
            <li class="foot-li">
                <div class="foot-li-div foot-li-div-1">
                    <p>S</p>
                </div>
            </li>
            <li class="foot-li">
                <div class="foot-li-div foot-li-div-2">
                    <p>B</p>
                </div>
            </li>
            <li class="foot-li">
                <div class="foot-li-div foot-li-div-3 checked">
                    <p>A</p>
                </div>
            </li>
            <li class="foot-li">
                <div class="foot-li-div foot-li-div-4">
                    <p>R</p>
                </div>
            </li>
            <li class="foot-li" id="arrow-right">
                <img src="img/arrow2.png" width="60" />
            </li>
        </ul>
    </div>
            </div>
        )
    }
}
