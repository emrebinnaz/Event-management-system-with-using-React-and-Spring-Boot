import React, {Component} from 'react';
import {Navbar, Nav,Button,Form,FormControl} from 'react-bootstrap'
import {Link,NavLink} from 'react-router-dom';
import Consumer from '../components/ContextAPI/Context';
import {isOrganizator, isLogin, isParticipant} from "../Authentication";
class NavigationBar extends Component {


    render() {
        const navbar = {
            backgroundColor : "#3f51b5",
            fontSize : "17px",
            letterSpacing : "1px",
            fontWeight : "500",
        }
        const font = {
            fontSize: "15px"
        }

        return (
            <Consumer>
                {
                    value => {
                        const {dispatch,username,authorities} = value;
                        return(
                            <div>
                            <Navbar style = {navbar}  className = {"p-3"} variant = "dark">
                                <Navbar.Brand href="#home">Etkinlik Yönetim Sistemi</Navbar.Brand>
                                <Link className = {isLogin() ? "nav-item text-white ml-5": "d-none"}>
                                    Hoşgeldin {localStorage.getItem("username")}</Link>
                                <Nav className="ml-auto">
                                    {!isLogin() ? <Link className ="nav-link"
                                                             to = {"/register"}>Kayıt ol</Link> : null}
                                    <Link className = {isLogin() ? "nav-link": "d-none"}
                                          to ={"/events"} >Etkinlikler </Link>
                                    {isOrganizator() ? <Link className ="nav-link"
                                                              to = {"/istatistik"}>Etkinlik İstatistikleri</Link> : null}
                                    {isOrganizator() ? <Link className ="nav-link"
                                                             to = {"/raffle"}>Etkinlik Çekilişi</Link> : null}
                                    {isOrganizator() ? <Link className ="nav-link"
                                                             to = {"/survey"}>Anketler</Link> : null}

                                    <Link className = {isParticipant() ? "nav-link": "d-none"}
                                          to ={`/myEvents/${localStorage.getItem('username')}`}>
                                        Etkinliklerim</Link>
                                    <Link className = {isLogin() ? "nav-link": "d-none"}
                                                      to ={"/login"}>
                                        Çıkış Yap</Link>

                                </Nav>
                                <Form inline>

                                </Form>
                            </Navbar>
                            </div>
                        );
                    }
                }
            </Consumer>
        );
    }
}

export default NavigationBar;