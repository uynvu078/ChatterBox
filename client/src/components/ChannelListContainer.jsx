import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

import Cookies from 'universal-cookie'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout, setToggleContainer }) => (
  <div className="channel-list__topbar">
    <div className="topbar-icons">
      <img src={HospitalIcon} alt="Hospital" className="topbar-icon" />
      <img src={LogoutIcon} alt="Logout" className="topbar-icon" onClick={logout} />
    </div>
    <button className="menu-button" onClick={() => setToggleContainer((prev) => !prev)}>
      ☰
    </button>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
      <p className="channel-list__header__text">ChatterBox</p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {

  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} setToggleContainer={setToggleContainer} /> 
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div> 
    </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, setToggleContainer, wrapperClass = "channel-list__container", }) => {

  return (
    <div className={wrapperClass}>
      <ChannelListContent
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}
      />
    </div>
  )
}

export default ChannelListContainer