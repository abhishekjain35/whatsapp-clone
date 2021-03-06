import HomeComponent from "../../components/home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onDisconnect,
  child,
  get,
  onValue,
  update,
  serverTimestamp,
  set,
  equalTo,
  query,
  orderByChild,
  onChildAdded,
} from "firebase/database";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const HomeContainer = () => {
  let [users, setUsers] = useState([]);
  let [activeUser, setActiveUser] = useState({});
  let [messages, setMessages] = useState([]);
  let auth = getAuth();
  let db = getDatabase();
  let navigate = useNavigate();

  const scrollIntoView = () => {
    document.getElementById("message-container").lastChild.scrollIntoView();
  };

  const fetchMessages = useCallback(() => {
    let messagesQuery = query(
      ref(db, "messages"),
      orderByChild("conversationId"),
      equalTo([getAuth().currentUser.uid, activeUser.uid].sort().join(""))
    );
    get(messagesQuery).then((messageSnapshot) => {
      let messagesData = [];
      messageSnapshot.forEach((docs) => {
        messagesData.push(docs.val());
      });
      messagesData.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(messagesData);
    });
  }, [activeUser.uid, db]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let snapshot = await get(child(ref(getDatabase()), `users`));
        if (snapshot.exists()) {
          let data = [];
          snapshot.forEach((doc) => {
            if (doc.val().uid === auth.currentUser.uid) {
              return;
            }
            data.push(doc.val());
          });
          setActiveUser(data[0] ? data[0] : {});
          setUsers(data);

          // Adding listeners for status of users
          snapshot.forEach((doc) => {
            const userRef = ref(db, "users/" + doc.val().uid + "/status");
            onValue(userRef, (snapshot) => {
              const userStatus = snapshot.val();
              let newData = JSON.parse(JSON.stringify(data));

              newData.forEach((user) => {
                if (user.uid === doc.val().uid) {
                  user["status"] = userStatus;
                }
              });
              setUsers(newData);
            });
          });
        } else {
        }
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  useEffect(() => {
    if (Object.keys(activeUser).length > 0) {
      fetchMessages();
    }
  }, [activeUser, db, fetchMessages]);

  useEffect(() => {
    if (Object.keys(activeUser).length > 0 && auth.currentUser) {
      let db = getDatabase();
      // For refresh
      update(ref(db, `users/${auth.currentUser.uid}`), {
        status: "online",
      });

      // Subscribe for disconnection
      let status = ref(db, `users/${auth.currentUser.uid}/status`);
      onDisconnect(status).set("offline");

      // listen to new messages
      let messagesRef = ref(db, "messages");
      onChildAdded(messagesRef, async (snap) => {
        if (auth.currentUser && snap.val().senderId !== auth.currentUser.uid) {
          if (
            snap.val().senderId === activeUser.uid &&
            snap.val().receiverId === auth.currentUser.uid &&
            snap.val().status !== "read"
          ) {
            await update(ref(db, `messages/${snap.val().docId}`), {
              status: "read",
            });
          } else if (
            snap.val().receiverId === auth.currentUser.uid &&
            snap.val().status !== "read" &&
            snap.val().status !== "delivered" &&
            snap.val().docId
          ) {
            await update(ref(db, `messages/${snap.val().docId}`), {
              status: "delivered",
            });
          }
        }
        if (auth.currentUser) {
          fetchMessages();
          const msgRef = ref(db, "messages/" + snap.val().docId + "/status");
          onValue(msgRef, () => {
            fetchMessages();
          });
        }
      });
    }
  }, [activeUser, auth.currentUser, db, fetchMessages]);

  const handleActiveUser = (user) => {
    setActiveUser(user);
  };

  const onFinish = async (data) => {
    const { message } = data;
    let id = v4();
    await set(ref(db, `messages/${id}`), {
      conversationId: [getAuth().currentUser.uid, activeUser.uid]
        .sort()
        .join(""),
      senderId: getAuth().currentUser.uid,
      receiverId: activeUser.uid,
      docId: id,
      message,
      status: "sent",
      timestamp: serverTimestamp(),
    });
  };
  return (
    <HomeComponent
      users={users}
      handleActiveUser={handleActiveUser}
      onFinish={onFinish}
      messages={messages}
      activeUser={activeUser}
    />
  );
};

export default HomeContainer;
