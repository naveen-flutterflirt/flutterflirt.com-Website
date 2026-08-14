

import { Variants} from "motion/react";
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};