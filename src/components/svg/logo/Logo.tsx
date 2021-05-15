import anime from "animejs";
import React from "react"
import './logo.style.scss';

export default class Logo extends React.Component<any,any> {
    plumeRef: React.RefObject<SVGAElement>;
    constructor(props:any){
        super(props);
        this.plumeRef=React.createRef();
    }


    render() {
        return (
            <svg
            id="Logo"
                data-name="Calque 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 278.59 277.6"
            >
                <defs>
                    <radialGradient
                        id="prefix__b"
                        data-name="D\xE9grad\xE9 sans nom 20"
                        cx={136.71}
                        cy={136.68}
                        r={128.59}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.69} stopColor="#a3195b" />
                        <stop offset={0.71} stopColor="#952567" />
                        <stop offset={0.76} stopColor="#684a8c" />
                        <stop offset={0.81} stopColor="#4268ac" />
                        <stop offset={0.86} stopColor="#2580c4" />
                        <stop offset={0.91} stopColor="#1191d5" />
                        <stop offset={0.95} stopColor="#049ce0" />
                        <stop offset={1} stopColor="#009fe3" />
                    </radialGradient>
                    <radialGradient
                        id="prefix__c"
                        data-name="D\xE9grad\xE9 sans nom 28"
                        cx={151.93}
                        cy={150.97}
                        r={118.54}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.69} stopColor="#312783" />
                        <stop offset={0.72} stopColor="#2a3890" />
                        <stop offset={0.77} stopColor="#1b5dae" />
                        <stop offset={0.83} stopColor="#0f7ac5" />
                        <stop offset={0.89} stopColor="#078ed6" />
                        <stop offset={0.95} stopColor="#029be0" />
                        <stop offset={1} stopColor="#009fe3" />
                    </radialGradient>
                    <linearGradient
                        id="prefix__a"
                        x1={136.71}
                        y1={197.26}
                        x2={217.47}
                        y2={197.26}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0} stopColor="#2d2377" />
                        <stop offset={0.09} stopColor="#2f277a" />
                        <stop offset={0.19} stopColor="#343483" />
                        <stop offset={0.28} stopColor="#3d4992" />
                        <stop offset={0.38} stopColor="#4966a7" />
                        <stop offset={0.48} stopColor="#588bc1" />
                        <stop offset={0.49} stopColor="#598ec3" />
                        <stop offset={0.59} stopColor="#486aa0" />
                        <stop offset={0.71} stopColor="#354279" />
                        <stop offset={0.83} stopColor="#28265d" />
                        <stop offset={0.93} stopColor="#20144c" />
                        <stop offset={1} stopColor="#1d0e46" />
                    </linearGradient>
                </defs>
                <g id="id_plume"  className="prefix__plume" ref={this.plumeRef}>
                    <path
                        d="M217.47 127.42a59.26 59.26 0 00-15.16 13.28 107.63 107.63 0 00-10.89 16.19c-3.2 5.69-6.06 11.6-8.75 17.63s-5.17 12.17-7.56 18.39-4.65 12.51-6.86 18.85L165 221.3q-1.68 4.77-3.56 9.5a178.53 178.53 0 01-8.75 18.73c-1.67 3.1-3.47 6.18-5.46 9.25a85.76 85.76 0 01-6.7 9.14l-.84-.16a56.25 56.25 0 01-2.37-11.24 87.41 87.41 0 01-.58-11 105.66 105.66 0 012.4-21.44q1.14-5.25 2.73-10.38c1.06-3.42 2.29-6.79 3.53-10.17q3.75-10.09 8.53-19.88a175.93 175.93 0 0110.79-19c2-3.06 4.16-6.07 6.44-9s4.7-5.75 7.28-8.46c1.27-1.37 2.63-2.67 4-4s2.8-2.51 4.27-3.71 2.94-2.36 4.51-3.42c.78-.54 1.55-1.08 2.36-1.58s1.58-1 2.43-1.48c6.52-3.79 13.94-6.39 21.27-6.37z"
                        fill="url(#prefix__a)"
                    />
                    <path
                        d="M217.24 126.59s-56 35.49-77.57 141.17c0 0 19.54-25.37 25.41-25.37"
                        fill="none"
                        stroke="#e6007e"
                        strokeMiterlimit={10}
                    />
                </g>
                <path
                    d="M265.31 123.31a106.22 106.22 0 10-142 142 129 129 0 11142-142z"
                    opacity={0.87}
                    fill="url(#prefix__b)"
                />
                <path
                    d="M270.46 138.64a97.91 97.91 0 10-130.85 130.87 118.88 118.88 0 11130.85-130.87z"
                    fill="url(#prefix__c)"
                />
            </svg>
        )
    }

}
