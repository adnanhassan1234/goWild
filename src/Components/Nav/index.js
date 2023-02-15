import React from "react";
import classes from './index.module.scss';
import Logo from "../Logo";
import {NavLink} from "react-router-dom";


const Nav = () => {
    return(
        <>
            <nav id={"nav"} className={classes.navBar}>
                <Logo  />
                <ul>
                    <li>
                        <NavLink to={"/dashboard"}>
                            <div className={classes.iconBox}>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M18.05 4.81774L12.29 0.78774C10.72 -0.31226 8.31 -0.252259 6.8 0.917741L1.79 4.82774C0.79 5.60774 0 7.20774 0 8.46774V15.3677C0 17.9177 2.07 19.9977 4.62 19.9977H15.4C17.95 19.9977 20.02 17.9277 20.02 15.3777V8.59774C20.02 7.24774 19.15 5.58774 18.05 4.81774Z" fill="white"/>
                                    <path d="M10.0098 16.7461C9.59977 16.7461 9.25977 16.4061 9.25977 15.9961V12.9961C9.25977 12.5861 9.59977 12.2461 10.0098 12.2461C10.4198 12.2461 10.7598 12.5861 10.7598 12.9961V15.9961C10.7598 16.4061 10.4198 16.7461 10.0098 16.7461Z" fill="white"/>
                                </svg>
                            </div>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/sub-admin"}>
                            <div className={classes.iconBox}>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M7.03906 0C4.41906 0 2.28906 2.13 2.28906 4.75C2.28906 7.32 4.29906 9.4 6.91906 9.49C6.99906 9.48 7.07906 9.48 7.13906 9.49C7.15906 9.49 7.16906 9.49 7.18906 9.49C7.19906 9.49 7.19906 9.49 7.20906 9.49C9.76906 9.4 11.7791 7.32 11.7891 4.75C11.7891 2.13 9.65906 0 7.03906 0Z" fill="white"/>
                                    <path d="M12.12 12.1489C9.33 10.2889 4.78 10.2889 1.97 12.1489C0.7 12.9989 0 14.1489 0 15.3789C0 16.6089 0.7 17.7489 1.96 18.5889C3.36 19.5289 5.2 19.9989 7.04 19.9989C8.88 19.9989 10.72 19.5289 12.12 18.5889C13.38 17.7389 14.08 16.5989 14.08 15.3589C14.07 14.1289 13.38 12.9889 12.12 12.1489Z" fill="white"/>
                                    <path opacity="0.4" d="M18.0284 5.33815C18.1884 7.27815 16.8084 8.97815 14.8984 9.20815C14.8884 9.20815 14.8884 9.20815 14.8784 9.20815H14.8484C14.7884 9.20815 14.7284 9.20815 14.6784 9.22815C13.7084 9.27815 12.8184 8.96815 12.1484 8.39815C13.1784 7.47815 13.7684 6.09815 13.6484 4.59815C13.5784 3.78815 13.2984 3.04815 12.8784 2.41815C13.2584 2.22815 13.6984 2.10815 14.1484 2.06815C16.1084 1.89815 17.8584 3.35815 18.0284 5.33815Z" fill="white"/>
                                    <path d="M20.0293 14.5904C19.9493 15.5604 19.3293 16.4004 18.2893 16.9704C17.2893 17.5204 16.0293 17.7804 14.7793 17.7504C15.4993 17.1004 15.9193 16.2904 15.9993 15.4304C16.0993 14.1904 15.5093 13.0004 14.3293 12.0504C13.6593 11.5204 12.8793 11.1004 12.0293 10.7904C14.2393 10.1504 17.0193 10.5804 18.7293 11.9604C19.6493 12.7004 20.1193 13.6304 20.0293 14.5904Z" fill="white"/>
                                </svg>
                            </div>
                            Sub Admins
                        </NavLink>
                    </li>
                   {/* <li>
                        <NavLink to={"/cards"}>
                            <div className={classes.iconBox}>
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M19.6739 7.93854L18.6939 12.1185C17.8539 15.7285 16.1939 17.1885 13.0739 16.8885C12.5739 16.8485 12.0339 16.7585 11.4539 16.6185L9.77385 16.2185C5.60385 15.2285 4.31385 13.1685 5.29385 8.98854L6.27385 4.79854C6.47385 3.94854 6.71385 3.20854 7.01385 2.59854C8.18385 0.178543 10.1739 -0.471457 13.5139 0.318543L15.1839 0.708543C19.3739 1.68854 20.6539 3.75854 19.6739 7.93854Z" fill="white"/>
                                    <path d="M13.074 16.8877C12.454 17.3077 11.674 17.6577 10.724 17.9677L9.14401 18.4877C5.17401 19.7677 3.08401 18.6977 1.79401 14.7277L0.514013 10.7777C-0.765987 6.80766 0.294013 4.70766 4.26401 3.42766L5.84401 2.90766C6.25401 2.77766 6.64401 2.66766 7.01401 2.59766C6.71401 3.20766 6.47401 3.94766 6.27401 4.79766L5.29401 8.98766C4.31401 13.1677 5.60401 15.2277 9.77401 16.2177L11.454 16.6177C12.034 16.7577 12.574 16.8477 13.074 16.8877Z" fill="white"/>
                                </svg>
                            </div>
                            Cards
                        </NavLink>
                    </li>*/}
                    <li>
                        <NavLink to={"/route-list"}>
                            <div className={classes.iconBox}>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M6.90932 2.59875C6.10932 -0.861249 0.899322 -0.871249 0.0993218 2.59875C-0.370678 4.62875 0.919322 6.34875 2.03932 7.41875C2.85932 8.18875 4.14932 8.18875 4.96932 7.41875C6.08932 6.34875 7.36932 4.62875 6.90932 2.59875ZM3.53932 4.19875C2.98932 4.19875 2.53932 3.74875 2.53932 3.19875C2.53932 2.64875 2.97932 2.19875 3.52932 2.19875H3.53932C4.09932 2.19875 4.53932 2.64875 4.53932 3.19875C4.53932 3.74875 4.09932 4.19875 3.53932 4.19875Z" fill="white"/>
                                    <path d="M4.53906 3.19922C4.53906 3.74922 4.09906 4.19922 3.53906 4.19922C2.98906 4.19922 2.53906 3.74922 2.53906 3.19922C2.53906 2.64922 2.97906 2.19922 3.52906 2.19922H3.53906C4.09906 2.19922 4.53906 2.64922 4.53906 3.19922Z" fill="white"/>
                                    <path opacity="0.4" d="M19.9393 14.5988C19.1393 11.1388 13.9093 11.1288 13.0993 14.5988C12.6293 16.6288 13.9193 18.3488 15.0493 19.4188C15.8693 20.1888 17.1693 20.1888 17.9893 19.4188C19.1193 18.3488 20.4093 16.6288 19.9393 14.5988ZM16.5593 16.1988C16.0093 16.1988 15.5593 15.7488 15.5593 15.1988C15.5593 14.6488 15.9993 14.1988 16.5493 14.1988H16.5593C17.1093 14.1988 17.5593 14.6488 17.5593 15.1988C17.5593 15.7488 17.1093 16.1988 16.5593 16.1988Z" fill="white"/>
                                    <path d="M17.5586 15.1992C17.5586 15.7492 17.1086 16.1992 16.5586 16.1992C16.0086 16.1992 15.5586 15.7492 15.5586 15.1992C15.5586 14.6492 15.9986 14.1992 16.5486 14.1992H16.5586C17.1086 14.1992 17.5586 14.6492 17.5586 15.1992Z" fill="white"/>
                                    <path d="M10.0287 17.75H7.34875C6.18875 17.75 5.17875 17.05 4.77875 15.97C4.36875 14.89 4.66875 13.7 5.53875 12.93L13.5287 5.94C14.0087 5.52 14.0188 4.95 13.8787 4.56C13.7288 4.17 13.3488 3.75 12.7087 3.75H10.0287C9.61875 3.75 9.27875 3.41 9.27875 3C9.27875 2.59 9.61875 2.25 10.0287 2.25H12.7087C13.8687 2.25 14.8787 2.95 15.2787 4.03C15.6887 5.11 15.3887 6.3 14.5187 7.07L6.52875 14.06C6.04875 14.48 6.03875 15.05 6.17875 15.44C6.32875 15.83 6.70875 16.25 7.34875 16.25H10.0287C10.4387 16.25 10.7787 16.59 10.7787 17C10.7787 17.41 10.4387 17.75 10.0287 17.75Z" fill="white"/>
                                </svg>
                            </div>
                            Route List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/treasure-chests-list"}>
                            <div className={classes.iconBox}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M0 7V13C0 14.66 1.34 16 3 16H17C18.66 16 20 14.66 20 13V7C20 5.34 18.66 4 17 4H3C1.34 4 0 5.34 0 7Z" fill="white"/>
                                    <path d="M3.33008 3.33V3.67C3.33008 3.79 3.33008 3.9 3.34008 4.02C3.39008 4.01 3.44008 4 3.50008 4H5.00008H15.0001H16.5001C16.5601 4 16.6101 4.01 16.6601 4.02C16.6701 3.91 16.6701 3.8 16.6701 3.67V3.33C16.6701 0.67 16.0001 0 13.3301 0H6.67008C4.00008 0 3.33008 0.67 3.33008 3.33Z" fill="white"/>
                                    <path d="M16.5001 16.0005H15.0001H5.00008H3.50008C3.44008 16.0005 3.39008 15.9905 3.34008 15.9805C3.33008 16.0905 3.33008 16.2005 3.33008 16.3305V16.6705C3.33008 19.3305 4.00008 20.0005 6.67008 20.0005H13.3301C16.0001 20.0005 16.6701 19.3305 16.6701 16.6705V16.3305C16.6701 16.2105 16.6701 16.1005 16.6601 15.9805C16.6101 15.9905 16.5601 16.0005 16.5001 16.0005Z" fill="white"/>
                                </svg>
                            </div>
                            Treasure Chest List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/users"}>
                            <div className={classes.iconBox}>
                                <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M7.03906 0C4.41906 0 2.28906 2.13 2.28906 4.75C2.28906 7.32 4.29906 9.4 6.91906 9.49C6.99906 9.48 7.07906 9.48 7.13906 9.49C7.15906 9.49 7.16906 9.49 7.18906 9.49C7.19906 9.49 7.19906 9.49 7.20906 9.49C9.76906 9.4 11.7791 7.32 11.7891 4.75C11.7891 2.13 9.65906 0 7.03906 0Z" fill="white"/>
                                    <path d="M12.12 12.1489C9.33 10.2889 4.78 10.2889 1.97 12.1489C0.7 12.9989 0 14.1489 0 15.3789C0 16.6089 0.7 17.7489 1.96 18.5889C3.36 19.5289 5.2 19.9989 7.04 19.9989C8.88 19.9989 10.72 19.5289 12.12 18.5889C13.38 17.7389 14.08 16.5989 14.08 15.3589C14.07 14.1289 13.38 12.9889 12.12 12.1489Z" fill="white"/>
                                </svg>
                            </div>
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/users-route"}>
                            <div className={classes.iconBox}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M10.75 21.4961C10.34 21.4961 10 21.1561 10 20.7461V18.7461C10 18.3361 10.34 17.9961 10.75 17.9961C11.16 17.9961 11.5 18.3361 11.5 18.7461V20.7461C11.5 21.1561 11.16 21.4961 10.75 21.4961Z" fill="white"/>
                                    <path opacity="0.4" d="M10.75 17.4961C10.34 17.4961 10 17.1561 10 16.7461V14.7461C10 14.3361 10.34 13.9961 10.75 13.9961C11.16 13.9961 11.5 14.3361 11.5 14.7461V16.7461C11.5 17.1561 11.16 17.4961 10.75 17.4961Z" fill="white"/>
                                    <path d="M10.75 13.4961C10.34 13.4961 10 13.1561 10 12.7461V9.74609C10 5.47609 13.48 1.99609 17.75 1.99609H20.75C21.16 1.99609 21.5 2.33609 21.5 2.74609C21.5 3.15609 21.16 3.49609 20.75 3.49609H17.75C14.3 3.49609 11.5 6.29609 11.5 9.74609V12.7461C11.5 13.1561 11.16 13.4961 10.75 13.4961Z" fill="white"/>
                                    <path d="M10.75 13.4961C10.34 13.4961 10 13.1561 10 12.7461V9.74609C10 6.29609 7.2 3.49609 3.75 3.49609H0.75C0.34 3.49609 0 3.15609 0 2.74609C0 2.33609 0.34 1.99609 0.75 1.99609H3.75C8.02 1.99609 11.5 5.47609 11.5 9.74609V12.7461C11.5 13.1561 11.16 13.4961 10.75 13.4961Z" fill="white"/>
                                    <path d="M2.74948 5.4975C2.55948 5.4975 2.36945 5.4275 2.21945 5.2775L0.219453 3.2775C-0.0705469 2.9875 -0.0705469 2.5075 0.219453 2.2175L2.21945 0.2175C2.50945 -0.0725 2.98951 -0.0725 3.27951 0.2175C3.56951 0.5075 3.56951 0.987498 3.27951 1.2775L1.80948 2.7475L3.27951 4.2175C3.56951 4.5075 3.56951 4.9875 3.27951 5.2775C3.12951 5.4275 2.93948 5.4975 2.74948 5.4975Z" fill="white"/>
                                    <path d="M18.7495 5.4975C18.5595 5.4975 18.3695 5.4275 18.2195 5.2775C17.9295 4.9875 17.9295 4.5075 18.2195 4.2175L19.6895 2.7475L18.2195 1.2775C17.9295 0.987498 17.9295 0.5075 18.2195 0.2175C18.5095 -0.0725 18.9895 -0.0725 19.2795 0.2175L21.2795 2.2175C21.5695 2.5075 21.5695 2.9875 21.2795 3.2775L19.2795 5.2775C19.1295 5.4275 18.9395 5.4975 18.7495 5.4975Z" fill="white"/>
                                </svg>
                            </div>
                            Users Route
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/treasure-hunt"}>
                            <div className={classes.iconBox}>
                                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.1905 1.5H2.31055C1.90055 1.5 1.56055 1.16 1.56055 0.75C1.56055 0.34 1.90055 0 2.31055 0H16.1905C16.6005 0 16.9405 0.34 16.9405 0.75C16.9405 1.16 16.6005 1.5 16.1905 1.5Z" fill="white"/>
                                    <path d="M16.1905 20H2.31055C1.90055 20 1.56055 19.66 1.56055 19.25C1.56055 18.84 1.90055 18.5 2.31055 18.5H16.1905C16.6005 18.5 16.9405 18.84 16.9405 19.25C16.9405 19.66 16.6005 20 16.1905 20Z" fill="white"/>
                                    <path opacity="0.4" d="M0 5.60156V14.4016C0 16.0616 1.34 17.4016 3 17.4016H15.5C17.16 17.4016 18.5 16.0616 18.5 14.4016V5.60156C18.5 3.94156 17.16 2.60156 15.5 2.60156H3C1.34 2.60156 0 3.94156 0 5.60156Z" fill="white"/>
                                </svg>
                            </div>
                            Treasure Hunt
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/support"}>
                            <div className={classes.iconBox}>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M0.751771 16.6C0.341771 16.6 0.00177137 16.26 0.00177137 15.85V10.15C-0.0482286 7.44 0.961772 4.88 2.84177 2.96C4.72177 1.05 7.24177 0 9.95177 0C15.4918 0 20.0018 4.51 20.0018 10.05V15.75C20.0018 16.16 19.6618 16.5 19.2518 16.5C18.8418 16.5 18.5018 16.16 18.5018 15.75V10.05C18.5018 5.34 14.6718 1.5 9.95177 1.5C7.64177 1.5 5.50177 2.39 3.91177 4.01C2.31177 5.64 1.46177 7.81 1.50177 10.13V15.84C1.50177 16.26 1.17177 16.6 0.751771 16.6Z" fill="white"/>
                                    <path d="M3.94195 10.3984H3.81195C1.71195 10.3984 0.00195312 12.1084 0.00195312 14.2084V16.0884C0.00195312 18.1884 1.71195 19.8984 3.81195 19.8984H3.94195C6.04195 19.8984 7.75195 18.1884 7.75195 16.0884V14.2084C7.75195 12.1084 6.04195 10.3984 3.94195 10.3984Z" fill="white"/>
                                    <path d="M16.192 10.3984H16.062C13.962 10.3984 12.252 12.1084 12.252 14.2084V16.0884C12.252 18.1884 13.962 19.8984 16.062 19.8984H16.192C18.292 19.8984 20.002 18.1884 20.002 16.0884V14.2084C20.002 12.1084 18.292 10.3984 16.192 10.3984Z" fill="white"/>
                                </svg>
                            </div>
                            Support
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/guidelines"}>
                            <div className={classes.iconBox}>
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M10 2.63759V18.6676C9.83 18.6676 9.65 18.6376 9.51 18.5576L9.47 18.5376C7.55 17.4876 4.2 16.3876 2.03 16.0976L1.74 16.0576C0.78 15.9376 0 15.0376 0 14.0776V1.99759C0 0.807591 0.97 -0.0924088 2.16 0.0075912C4.26 0.177591 7.44 1.23759 9.22 2.34759L9.47 2.49759C9.62 2.58759 9.81 2.63759 10 2.63759Z" fill="white"/>
                                    <path d="M20 2.00938V14.0794C20 15.0394 19.22 15.9394 18.26 16.0594L17.93 16.0994C15.75 16.3894 12.39 17.4994 10.47 18.5594C10.34 18.6394 10.18 18.6694 10 18.6694V2.63938C10.19 2.63938 10.38 2.58938 10.53 2.49938L10.7 2.38938C12.48 1.26938 15.67 0.199384 17.77 0.0193845H17.83C19.02 -0.0806155 20 0.809384 20 2.00938Z" fill="white"/>
                                    <path d="M5.75 6.57812H3.5C3.09 6.57812 2.75 6.23812 2.75 5.82812C2.75 5.41813 3.09 5.07812 3.5 5.07812H5.75C6.16 5.07812 6.5 5.41813 6.5 5.82812C6.5 6.23812 6.16 6.57812 5.75 6.57812Z" fill="white"/>
                                    <path d="M6.5 9.57812H3.5C3.09 9.57812 2.75 9.23812 2.75 8.82812C2.75 8.41813 3.09 8.07812 3.5 8.07812H6.5C6.91 8.07812 7.25 8.41813 7.25 8.82812C7.25 9.23812 6.91 9.57812 6.5 9.57812Z" fill="white"/>
                                </svg>
                            </div>
                            Guidelines
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/treasure-hunt-e-waiver"}>
                            <div className={classes.iconBox}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0Z" fill="white"/>
                                    <path d="M13.75 7.75H6.25C5.84 7.75 5.5 7.41 5.5 7C5.5 6.59 5.84 6.25 6.25 6.25H13.75C14.16 6.25 14.5 6.59 14.5 7C14.5 7.41 14.16 7.75 13.75 7.75Z" fill="white"/>
                                    <path d="M13.75 13.75H6.25C5.84 13.75 5.5 13.41 5.5 13C5.5 12.59 5.84 12.25 6.25 12.25H13.75C14.16 12.25 14.5 12.59 14.5 13C14.5 13.41 14.16 13.75 13.75 13.75Z" fill="white"/>
                                </svg>
                            </div>
                            Treasure Hunt E Waiver
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;