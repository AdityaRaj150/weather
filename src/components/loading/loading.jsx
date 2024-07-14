import {motion} from "framer-motion"
import styles from './loading.module.css'
export default function Loading(){

  return <motion.div className={styles.main}
     variants={{
               hidden: {opacity:0},
               visible: {opacity: 1},
          }}
     
     initial="hidden"
     animate="visible"
     exit='hidden'
     
     >
     <motion.div 
     variants={{
          visible: {transition: {staggerChildren:0.1}}
     }}
     className={styles.circles} >
          <motion.div className={styles.loader}></motion.div>
          <motion.div
            variants={{
               hidden: {borderRadius:10, y:-20},
               visible: {borderRadius: 500, y:0}
          
            }}
          ></motion.div>
          <motion.div
            variants={{
               hidden: {borderRadius:10, y:-20},
               visible: {borderRadius: 500, y:0}
            }}
          ></motion.div>
          <motion.div
            variants={{
               hidden: {borderRadius:10, y:-20},
               visible: {borderRadius: 500, y:0}
            }}
          ></motion.div>
     </motion.div>
     <p>Loading.</p>

  </motion.div>

}