import React, { useEffect, useRef, useState } from 'react';
import s from './css/About.module.css'

const About = () => {

   const [x, setX] = useState(0)
   const [y, setY] = useState(0)

   const blockRef = useRef()
   const spotRef = useRef()

   const moveSpot = (e) => {
      setX(e.pageX - blockRef.current.offsetLeft - spotRef.current.clientWidth / 2)
      setY(e.pageY - blockRef.current.offsetTop - spotRef.current.clientHeight / 2)
      // setX(e.pageX - spotRef.current.clientWidth / 2)
      // setY(e.pageY - spotRef.current.clientHeight / 2)
   }
   useEffect(() => {
      window.addEventListener('mousemove', moveSpot)
      return () => {
         window.removeEventListener('mousemove', moveSpot)
      };
   }, []);

   return (
      <div className={s.content}>
         <div className={s.outerBlock} ref={blockRef}>
            <div className={s.block}>
               <p className={s.text}>It's just a test page</p>
            </div>
            <div style={{ top: y, left: x }} className={s.spot} ref={spotRef}></div>
         </div>
      </div>
   );
}

export default About;