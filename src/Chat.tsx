import { useCollectionData } from 'react-firebase-hooks/firestore';
import * as firebase from "firebase";
import * as React from "react";

var config = {
    apiKey: "AIzaSyAEM42tKBf6AAOAaENrCYmVDdSLFgLGHzw",
    authDomain: "eurorack-cloud.firebaseapp.com",
    databaseURL: "https://eurorack-cloud.firebaseio.com",
    projectId: "eurorack-cloud",
    storageBucket: "eurorack-cloud.appspot.com",
    messagingSenderId: "525698843432",
    appId: "1:525698843432:web:73b409650a0e444cd4061d",
    measurementId: "G-R22G5726ZZ"

};
const app = firebase.initializeApp(config);
const messagesCollection = app.firestore().collection('messages');

interface Message {
    content: string
    author?: string
}

export default function Chat() {
    const [messageDraft, setMessageDraft] = React.useState<string>("");
    const [messages, loading, error] = useCollectionData<Message>(messagesCollection.orderBy("timestamp"), {});

    const messagesContainerRef = React.useRef<HTMLDivElement>(null);
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        messagesCollection.add({
            content: messageDraft,
            timestamp: new Date().getTime()
        })

        setMessageDraft("");

        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight + 100;
        }
    }

    React.useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight + 100;
        }
    }, [messagesContainerRef])

    return (
        <div className="Chat">

            <div className="Chat--Messages" ref={messagesContainerRef}>
                {messages?.map((message) => {
                    return (<div className={"Chat--Message"} >
                        <div className="Chat--Message--Author">{message.author || "anonymous"}</div>
                        <div className="Chat--Message--Content">{message.content}</div>
                    </div>);
                })}
            </div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Send a message." onChange={(e) => setMessageDraft(e.target.value)} value={messageDraft} />

            </form>
        </div>
    );
}
