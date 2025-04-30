import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const LandingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Fullscreen Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 bg-gradient-to-br from-gray-900 to-black text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h1>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Practice on real interview questions & get instant feedback
        </p>
        <div className="flex gap-4">
        <Button variant="outline" className="rounded-full bg-white/10 px-6 py-2">
          <Link href="/register">Sign Up</Link>
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full text-white text-sm">
          <Link href="/login">Login</Link>
        </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-800 text-sm text-gray-500">
        © {new Date().getFullYear()} PrepWise. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
