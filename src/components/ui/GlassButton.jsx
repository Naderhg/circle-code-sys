import { cn } from "../../lib/utils";

function GlassButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}

export default GlassButton;
