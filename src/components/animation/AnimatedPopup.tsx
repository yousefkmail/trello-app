import { motion, AnimatePresence } from "framer-motion";

export interface AnimatedPopupProps {
  isShown: boolean;
  children: React.ReactNode;
}

export function AnimatedPopup({
  isShown,
  children,
}: Partial<AnimatedPopupProps>) {
  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md p-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
