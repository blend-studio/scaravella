import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const Reveal = ({ children, width = "fit-content", delay = 0.25 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" }); // Scatta una volta sola

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SlideIn = ({ children, direction = "left", delay = 0.2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
  
    const xOffset = direction === "left" ? -100 : 100;
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: xOffset }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
        transition={{ duration: 0.7, delay: delay, type: "spring", stiffness: 50 }}
      >
        {children}
      </motion.div>
    );
  };