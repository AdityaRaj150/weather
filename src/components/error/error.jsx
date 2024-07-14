import { motion } from "framer-motion";
import styles from "./error.module.css"

export default function ErrorP({message}){
    return<motion.div 
    initial={{y:-20, opacity: 0}}
    animate={{opacity:1, y:0}}
    exit={{opacity:0, y:-20}}
    className={styles.main}>
        <h2>An Error Occured</h2>
        <p>{message}</p>
    </motion.div>
}