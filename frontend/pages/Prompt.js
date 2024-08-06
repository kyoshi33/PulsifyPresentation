import styles from "../styles/Prompt.module.css"
import { useEffect, useState } from 'react';
import Link from "next/link";

import Header from "../components/Header";
import PromptCard from '../components/PromptCard'
import MessageCard from '../components/MessageCard'

function Prompt() {

    return (
        <>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.promptCardInstance}>
                    <PromptCard projectName='Funk' stars={4} prompt='test prompt' />
                </div>



                <div className={styles.messagesContainer}>
                    <div className={styles.scrollWindow}>

                        <MessageCard />
                        <MessageCard />
                        <MessageCard />
                        <MessageCard />
                        <MessageCard />
                        <MessageCard />
                        <MessageCard />
                        <MessageCard />
                        <MessageCard />

                    </div>
                </div>


                <div className={styles.inputContainer} >
                    <textarea placeholder="Nouveau commentaire..." className={styles.input}>
                    </textarea>
                    <div className={styles.publish}>Publier</div>
                </div>

            </div>
        </>
    )
}

export default Prompt;
