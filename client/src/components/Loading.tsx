import { motion } from "framer-motion";

export function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-black">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Cricket Ball */}
        <motion.div
          className="relative"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-2xl relative overflow-hidden">
            {/* Cricket ball seam */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-1 bg-white/30 rounded-full transform rotate-45"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-1 bg-white/30 rounded-full transform -rotate-45"></div>
            </div>
            {/* Stitching effect */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/50 transform -translate-y-1/2"></div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white tracking-wider">LUEUR</h1>
          <p className="text-emerald-300 text-sm mt-1">Fantasy Cricket</p>
        </motion.div>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-emerald-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
