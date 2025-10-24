import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  ...props 
}) => {
  // Base classes - inline-flex so buttons size to content by default; callers can force full width with `!w-full`
  const baseClasses = "group relative inline-flex items-center justify-center gap-2 font-black rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg hover:shadow-2xl overflow-hidden";
  
  // Size classes - standard heights for touch targets
  const sizeClasses = {
    sm: "h-10 px-5 text-sm min-h-[2.5rem]",
    md: "h-12 px-7 text-base min-h-[3rem]",
    lg: "h-16 px-10 text-xl min-h-[4rem]",
  };
  
  // Variant classes - modern gradients and effects
  const variantClasses = {
    primary: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-400/50 shadow-yellow-400/30",
    secondary: "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-700/50 shadow-gray-900/30",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500/50 shadow-red-500/30",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:ring-green-500/50 shadow-green-500/30",
    outline: "bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-300 hover:border-yellow-400 focus:ring-yellow-400/30 shadow-md hover:shadow-xl",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {/* Animated shine effect */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;