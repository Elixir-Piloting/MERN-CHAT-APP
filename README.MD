### **MERN CHAT APP** ###
---

## **This is a simple mern chat app, buit just to practice some learnt concepts**  ##

-After a successfull log in, a one hour cookie is stored in the clients browser

-every sensitive route uses an auth middleware that makes sure the token is valid, before handling any data


## **Project setup** ##

1 Backend

1.1 clone the repo

```sh
git clone https://github.com/Elixir-Piloting/MERN-CHAT-APP.git
cd MERN-CHAT-APP/server
```

1.2 Install the packages

```sh
npm i
```

1.3 Create a .env file

example .env
```sh
PORT = 3003
MONGO_URI =mongodb://localhost:27017/Was
CLIENT_URI=
JWT_SECRET=supersecret
NODE_ENV=development
```

1.4 Run the server
```sh
npm start dev
```

**YOU CAN TEST THE API ON THE FOLLOWING ENDPOINTS**

- base url depends on your port ie PORT ``` 8080 ``` would result in ```http://localhost:8080``` then the api endpoint resulting in the example ```http://localhost:8080/api/auth/signup```

(e.g., `http://localhost:8080`)

| **Method** | **Endpoint** | **Description** |
|------------|-------------|----------------|
| **POST**   | `/api/auth/signup` | Sign up a new user |
| **POST**   | `/api/auth/login` | Log in a user |
| **POST**   | `/api/chat/send-message/:recipientId` | Send a message to a user (replace `:recipientId` with their ID) |
| **GET**    | `/api/chat/fetch/:recipientId` | Fetch messages between you and another user |
| **GET**    | `/api/chat/messages` | Fetch all messages |


## **Contributing**

- ## clone the repo
```sh
git clone https://github.com/Elixir-Piloting/MERN-CHAT-APP.git
cd MERN-CHAT-APP
```

- ## create a feature branch ##
    - Before making changes, create a new branch for your feature or fix
    ```sh
    git checkout -b feature-name
    ```

    or (for Git 2.23+)

    ```sh
    git switch -c feature-new-login
    ```

- ## Make Changes & Commit
    Edit the code (fix a bug, add a feature, update documentation, etc.).

    Stage the changes
    ```sh
    git add .
    ```

    Commit with a clear message
    ```sh
    git commit -m "Added a new login system"
    ```

- ## Push Changes to Your Branch
    Send your changes to your GitHub repository

    ```sh
    git push origin feature-new-login
    ```

- ## Create a Pull Request (PR)
    1 Go to the original repository on GitHub.

    Click ```Pull Requests``` > ```New Pull Request```.

    Select your branch (feature-new-login).

    Add a description of what you changed.

    Click ```Create Pull Request```.


- ## Merge & Delete the Branch (After Approval) ##
    If accepted, your changes will be merged.

    You can delete your branch:
    ```sh
    git branch -d feature-new-login
    ```
    And delete it from GitHub:
    ```sh
    git push origin --delete feature-new-login
    ```


--
--

# licence

