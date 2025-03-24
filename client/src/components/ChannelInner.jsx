import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../assets';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
  
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };
    
    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();
  
    const MessagingHeader = () => {
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
      const additionalMembers = members.length - 3;
  
      if(channel.type === 'messaging') {
        return (
          <div className='team-channel-header__name-wrapper'>
            {members.map(({ user }, i) => (
              <div key={i} className='team-channel-header__name-multi'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className='team-channel-header__name user'>{user.fullName || user.id}</p>
              </div>
            ))}
  
            {additionalMembers > 0 && <p className='team-channel-header__name user'>and {additionalMembers} more</p>}
          </div>
        );
      }
  
      return (
        <div className='team-channel-header__channel-wrapper'>
          <p className='team-channel-header__name'># {channel.data.name}</p>
          <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
            <ChannelInfo />
          </span>
        </div>
      );
    };
  
    const getWatcherText = (watchers) => {
      if (!watchers) return 'No users online';
      if (watchers === 1) return '1 user online';
      return `${watchers} users online`;
    };

    const handleLeaveChannel = async () => {
      const confirmed = window.confirm("Are you sure you want to leave this channel?");
      if (!confirmed) return;
    
      try {
        await channel.removeMembers([client.userID]);
        window.location.reload(); // or redirect to another channel
      } catch (err) {
        console.error("Failed to leave channel", err);
        alert("Unable to leave the channel.");
      }
    };
    
    const handleDeleteChannel = async () => {
      const isDM = channel.type === 'messaging';
      const confirmMessage = isDM
        ? "This will permanently delete this direct message for everyone. Are you sure?"
        : "This will permanently delete this channel. Are you sure you want to continue?";
    
      const confirmed = window.confirm(confirmMessage);
      if (!confirmed) return;
    
      try {
        await channel.delete();
        window.location.reload(); // or redirect to another channel
      } catch (err) {
        console.error("Failed to delete channel", err);
        alert("Unable to delete the channel.");
      }
    };
    
    return (
      <div className='team-channel-header__container'>
        <MessagingHeader />
        <div className='team-channel-header__right'>
          <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
          <div className='team-channel-header__actions'>
            {channel.type === 'messaging' ? (
              <button onClick={handleDeleteChannel}>Delete Chat</button>
            ) : (
              client.userID === channel.data?.created_by?.id ? (
                <button onClick={handleDeleteChannel}>Delete Channel</button>
              ) : (
                <button onClick={handleLeaveChannel}>Leave Channel</button>
              )
            )}
          </div>
        </div>
      </div>
    );    
  };

  export default ChannelInner;