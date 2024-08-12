import { AnimatePresence, motion, MotionStyle } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: -25 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 25 },
};

export function AnimatedState({
  children,
  className,
  style,
  state,
}: {
  children: React.ReactNode;
  className?: string;
  style?: MotionStyle;
  state: string;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        initial="initial"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        key={state}
        className={className}
        style={style}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}
