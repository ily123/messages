# Messages
[Messages](https://messages-io.herokuapp.com/) is a free open-source instant chat messenger.

<div align="center">👉👉👉 <a href="https://messages-io.herokuapp.com/">Live Website Deployed Here</div>

## Messages in Action


🔥Main page where you can log in as demo user🔥

![image](https://user-images.githubusercontent.com/44654658/147894553-94f3bb2c-4818-4e85-bcff-983c791bf6be.png)
---
🔥Welcome page for new users where they can create their first workspace!🔥

![image](https://user-images.githubusercontent.com/44654658/147894640-e4109030-0a13-4941-9c3f-45db23fe6941.png)

---
🔥Control menu for the Workspace where the user edit/delete their workspace, or join other workspaces🔥
![image](https://user-images.githubusercontent.com/44654658/147894694-1dfdf344-c3f4-4ecc-817b-a77a6e1e3fc5.png)

---

🔥One of many modals that allow user to interact with the app. Here the user is adding a new channel to their workspace🔥
![image](https://user-images.githubusercontent.com/44654658/147894729-bcac2d0a-5bee-4059-9f78-b4b2ee3ec057.png)

---
🔥The real-time chat!🔥
![image](https://user-images.githubusercontent.com/44654658/147894806-485c0a32-07dd-4a45-ac3f-d1b6b3fcb58f.png)



## Summary of the main features

[Oney](https://messages-io.herokuapp.com/) includes MVP functionality for the following features:
- Workspaces (or Servers)
	- _Summary_: users can create workspaces and invite their friends there
	- CREATE: users can POST new workspaces
	- READ: users can fetch information about workspaces
	- UPDATE: users can modify workspace metadata of owned workspaces
	- DELETE: users can delete their own servers and READ workspaces
- Channels
	- _Summary_: users can create channels within a server, and then post messages there
	- CREATE: users can POST new channels to a workspaces that they own
	- READ: users fetch information about channels when they log into a workspace
	- UPDATE: users can modify channel metadata inside owned workspaces
	- DELETE: users can delete channels on workspaces that they own
-  Live Chat (web socket feature)
	- _Summary_: users can post messages inside a channel, and the messages are broadcasted to all clients currently connected to that channel using websockets
	- CREATE: users can POST messages to any channel within a workspace they belong to
	- READ: users fetch messages when loading the chat for the first time, and also via web socket connection
	- UPDATE: users can modify their own messages, and also all messages inside a workspace they own
	- DELETE: users can delete their own messages, and also all messages inside a workspace they own
- Direct Messages
	- This feature was dropped due to time constraints, but is work in progress

## Documentation (see wiki)
Detailed documentation with the database schema, back-end routes, front-end routes, user stores, and feature overview can be found in the [wiki](https://github.com/ily123/messages/wiki) 🔥🔥🔥

## Tech details

The app is a combination of an Express.js back-end, wrapped over a relational database, and a React front-end.

- Database
	- **PostgresQL** as the main (and only) data store
	- **Sequelize** for object mapping and migrations
- Back-end API (JavaScript)
	- **Express** with assorted libraries as server
	- **WS** library to enable message streaming
- Front-end client (JavaScript)
	- UI is written in **React** using functional components
	- **Redux** is used for state management

## Code snippet
```
  function Message ({ messageId, content, user, channelId }) {
    const [editable, setEditable] = useState(false)
    const [content_, setContent] = useState('')
    const dispatch = useDispatch()
    // fetch owner id & logged in user to enable edit controls
    const { session: loggedInUser, workspaces, chat } = useSelector(state => state)
    const serverId = chat.server_id
    const { owner_id: serverOwnerId } = workspaces[+serverId]    
                             
    useEffect(() => {        
      setContent(content)    
    }, [content])            
                             
    const toggleEdit = () => setEditable(state => !state)    
    const disableEdit = () => setEditable(false)    
                             
    const saveEdit = async (_) => {    
      await dispatch(patchMessageRequest(messageId, content_))    
      disableEdit()          
    }                        
                             
    const deleteMessage = async () => {    
      await dispatch(deleteMessageRequest(messageId))    
    }                        
    const enableMessageEditControls = loggedInUser.id == user.id || loggedInUser.id == serverOwnerId    
    return (                 
      <div className={styles.messageWrapper}>    
        {enableMessageEditControls && (    
          <div className={styles.messageControls}>    
            <i class='fas fa-pen' onClick={(_) => toggleEdit()} />    
            <i class='fas fa-trash' onClick={(_) => deleteMessage()} />    
          </div>             
        )}                   
        <div className={styles.message}>    
          <span><b>{user.username} said:</b></span>    
          <TextareaAutosize    
            className={`${styles.messageContent} ${editable && styles.bgTan}`}    
            disabled={!editable}    
            onChange={(e) => setContent(e.target.value)}    
            value={content_}    
          />                 
        </div>               
        <button              
          className={`${styles.saveEdits} ${editable && styles.visible}`}    
          onClick={saveEdit}    
        >save edits          
        </button>            
      </div>                 
    )                        
  } 
```


## Contribution
- [Ilya Novikov](https://github.com/ily123)
