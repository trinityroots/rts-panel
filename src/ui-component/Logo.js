// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

    const logo = "https://trinityroots.github.io/rts-panel/rts.png"

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        // <img src={logo} alt="RTS-DPANEL" width="150" />
        <svg width="170" height="32" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <linearGradient id="gradient" y1=".5" y2="1">
                <stop stop-color="#fbca26" offset="0%"/>
                <stop stop-color="#ce576a" offset="50%"/>
                <stop stop-color="#6608a5" offset="100%"/>
            </linearGradient>
            </defs>
            <g>
                <text 
                    id="text" 
                    y="20" 
                    font-family="sans-serif" 
                    font-size="25" 
                    font-weight="bold"
                    stroke="url(#gradient)" 
                    fill="url(#gradient)">
                        RTS dPANEL
                </text>
            </g>
        </svg>
    );
};

export default Logo;
