import React, {Component} from "react";
import {Plus, Server, Settings, User} from "react-feather";
import {Link} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const Page = styled(Link)`
  text-decoration: none;

  border-radius: 4px;
  grid-template-columns: 25px auto;
  grid-auto-flow: column;
  padding: 10px 15px;
  display: grid;
  grid-gap: 8px;
  gap: 8px;
  align-items: center;
  color: ${props => props.active ? "#bcc8d2" : "#c7d3dc"};
  cursor: pointer;
  background-color: ${props => props.active ? "#2a2c30" : "inherit"};
  border-color: ${props => props.active ? "#7d7e80" : "inherit"};;

  &:hover {
    background-color: #222426;
    color: #fff;
  }
`;

const Section = styled.div`
  padding: 10px 0;
  font-weight: bolder;
  position: fixed;

  @media screen and (max-width: 768px) {
    position: relative;
  }

  @media (min-width: 900px) {
    padding: 25px;
  }`

const SectionTitle = styled.div`
  font-size: 16px;
  letter-spacing: 2px;
  padding: 0 15px;
  margin-bottom: 10px;
  font-weight: bolder;
  text-transform: uppercase;
  cursor: pointer;
  color: #ffffff;
`

const SectionWrap = styled.div`
  display: grid;
  position: sticky;
  gap: 5px;
`

class AccountSidebar extends Component {

    render() {
        let url = window.location.pathname;

        return (
            <>
                <ReactTooltip effect='solid'/>

                <Section>
                    <SectionTitle>General</SectionTitle>
                    <SectionWrap>

                        <Page to="/account" active={url === "/account"}>
                            <Server/> Servers
                        </Page>

                        <Page to="/account/settings" active={url === "/account/settings"}>
                            <Settings/> Settings
                        </Page>

                        {/*<Page to="/account/bots" active={url === "/account/bots"}>
                            <User/> Bots
                        </Page>

                        <Page to="/account/servers/new" active={url === "/account/servers/new"}>
                            <Plus/> New Server
                        </Page>*/}

                    </SectionWrap>
                </Section>

            </>
        )
    }

}

export default AccountSidebar;