import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import 'stream-chat-react/dist/css/v2/index.css';
import './App.css';

const cookies = new Cookies();
const apiKey = '78pvpbyqbnwc';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toggleContainer, setToggleContainer] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        
      <button
        className="menu-button"
        onClick={() => setToggleContainer((prev) => !prev)}
      >
        ☰
      </button>


        {/* Desktop Sidebar */}
        <div className="channel-list__container">
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        </div>

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />

        {/* Mobile Sidebar */}
        <div className={`channel-list__container-responsive ${toggleContainer ? 'active' : ''}`}>
          <div
            className="channel-list__container-toggle"
            onClick={() => setToggleContainer((prev) => !prev)}
          />
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            toggleContainer={toggleContainer}
            setToggleContainer={setToggleContainer}
            wrapperClass="channel-list__container-responsive-inner"
          />
        </div>

      </Chat>
    </div>
  );
};

export default App;
