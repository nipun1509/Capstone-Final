"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );
    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentText, loop, speed, deleteSpeed, delay, displayText, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-white/60 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const AuthButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
AuthButton.displayName = "AuthButton";

const AuthInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-3 text-sm text-white shadow-sm transition-shadow placeholder:text-white/30 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
AuthInput.displayName = "AuthInput";

const PasswordInput = React.forwardRef<HTMLInputElement, { label?: string } & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, label, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="grid w-full items-center gap-2">
        {label && <Label htmlFor={id} className="text-white/70">{label}</Label>}
        <div className="relative">
          <AuthInput id={id} type={showPassword ? "text" : "password"} className={cn("pe-10", className)} ref={ref} {...props} />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-white/40 hover:text-white transition-colors focus-visible:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

interface SignInFormProps { onSuccess: (email: string, name?: string) => void }
function SignInForm({ onSuccess }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess(email);
  };
  return (
    <form onSubmit={handleSignIn} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
        <p className="text-sm text-white/50">Enter your email below to sign in</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="signin-email" className="text-white/70">Email</Label>
          <AuthInput
            id="signin-email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <PasswordInput name="password" label="Password" required autoComplete="current-password" placeholder="Password" />
        <AuthButton type="submit" variant="outline" className="mt-2 w-full bg-violet-600 border-violet-500 hover:bg-violet-700 text-white">
          Sign In
        </AuthButton>
      </div>
    </form>
  );
}

interface SignUpFormProps { onSuccess: (email: string, name?: string) => void }
function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess(email, name);
  };
  return (
    <form onSubmit={handleSignUp} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Create an account</h1>
        <p className="text-sm text-white/50">Enter your details below to sign up</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="signup-name" className="text-white/70">Full Name</Label>
          <AuthInput
            id="signup-name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="signup-email" className="text-white/70">Email</Label>
          <AuthInput
            id="signup-email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <PasswordInput name="password" label="Password" required autoComplete="new-password" placeholder="Password" />
        <AuthButton type="submit" variant="outline" className="mt-2 w-full bg-violet-600 border-violet-500 hover:bg-violet-700 text-white">
          Sign Up
        </AuthButton>
      </div>
    </form>
  );
}

interface AuthFormContainerProps {
  isSignIn: boolean;
  onToggle: () => void;
  onSuccess: (email: string, name?: string) => void;
}
function AuthFormContainer({ isSignIn, onToggle, onSuccess }: AuthFormContainerProps) {
  return (
    <div className="mx-auto grid w-full max-w-[360px] gap-4">
      {isSignIn
        ? <SignInForm onSuccess={onSuccess} />
        : <SignUpForm onSuccess={onSuccess} />
      }
      <div className="text-center text-sm text-white/50">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button type="button" onClick={onToggle} className="text-violet-400 hover:text-violet-300 underline-offset-4 hover:underline pl-1 transition-colors">
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
}

interface AuthContentProps {
  image?: { src: string; alt: string };
  quote?: { text: string; author: string };
}

export interface AuthUIProps {
  signInContent?: AuthContentProps;
  signUpContent?: AuthContentProps;
  onSuccess?: (email: string, name?: string) => void;
}

const defaultSignInContent = {
  image: {
    src: "https://i.ibb.co/XrkdGrrv/original-ccdd6d6195fff2386a31b684b7abdd2e-removebg-preview.png",
    alt: "Sign in illustration",
  },
  quote: { text: "Welcome Back! The journey continues.", author: "EmoLearn" },
};

const defaultSignUpContent = {
  image: {
    src: "https://i.ibb.co/HTZ6DPsS/original-33b8479c324a5448d6145b3cad7c51e7-removebg-preview.png",
    alt: "Sign up illustration",
  },
  quote: { text: "Create an account. A new chapter awaits.", author: "EmoLearn" },
};

export function AuthUI({ signInContent = {}, signUpContent = {}, onSuccess }: AuthUIProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn((prev) => !prev);

  const finalSignIn = {
    image: { ...defaultSignInContent.image, ...signInContent.image },
    quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };
  const finalSignUp = {
    image: { ...defaultSignUpContent.image, ...signUpContent.image },
    quote: { ...defaultSignUpContent.quote, ...signUpContent.quote },
  };
  const current = isSignIn ? finalSignIn : finalSignUp;

  return (
    <div className="w-full grid md:grid-cols-2 bg-[#0a0a0f] min-h-[480px]">
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear { display: none; }
      `}</style>

      <div className="flex items-center justify-center p-8 overflow-y-auto">
        <AuthFormContainer isSignIn={isSignIn} onToggle={toggleForm} onSuccess={onSuccess || (() => {})} />
      </div>

      <div
        className="hidden md:block relative bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${current.image.src})` }}
      >
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end p-6 pb-8">
          <blockquote className="space-y-1 text-center">
            <p className="text-lg font-medium text-white">
              "<Typewriter key={current.quote.text} text={current.quote.text} speed={60} />"
            </p>
            <cite className="block text-sm font-light text-white/50 not-italic">
              — {current.quote.author}
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
