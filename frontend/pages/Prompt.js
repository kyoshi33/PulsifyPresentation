import styles from "../styles/Prompt.module.css"
import { useEffect, useState } from 'react';
import Link from "next/link";

import Header from "../components/Header";
import PromptCard from '../components/PromptCard'

function Prompt() {

    return (
        <>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.promptCardInstance}>
                    <PromptCard />
                </div>
            </div>
        </>
    )
}

export default Prompt;
