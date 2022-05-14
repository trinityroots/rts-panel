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
        <img src={logo} alt="RTS-DPANEL" width="125" />
        // <svg width="170" height="32" viewBox="0 0 170 32">
        // <defs>
        //     <linearGradient id="rainbow" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse" >
        //         <stop stop-color="#EAFC37" offset="0%"/>
        //         <stop stop-color="#4FCB6B" offset="50%"/>
        //         <stop stop-color="#7C4DFF" offset="100%"/> 
        //     </linearGradient>
        // </defs>
        //     <text fill="url(#rainbow)">
        //     <tspan 
        //         font-size="25" 
        //         x="0" 
        //         y="30">
        //         RTS dPANEL
        //     </tspan>
        //     </text>
        // </svg>
    );
};

export default Logo;
