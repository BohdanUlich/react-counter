import { FC, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { ActionItem } from "../types";

interface StoryButtonProps {
  actions: ActionItem[];
}

const StoryButton: FC<StoryButtonProps> = ({ actions }) => {
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);
  const [, forceUpdate] = useState({});

  // Update timestamps every minute when popup is open
  useEffect(() => {
    if (!isStoryOpen) return;

    const interval = setInterval(() => {
      forceUpdate({});
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isStoryOpen]);

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <>
      <div className="relative">
        <Button
          onClick={() => setIsStoryOpen(!isStoryOpen)}
          variant="default"
          className="flex items-center gap-1"
        >
          Story
          <ChevronDown
            className={`h-4 w-4 mt-1 transition-transform duration-200 ${
              isStoryOpen ? "transform rotate-180" : ""
            }`}
          />
        </Button>

        {/* Popup */}
        {isStoryOpen && actions.length > 0 && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 z-50 shadow-lg bg-secondary-background rounded-2xl p-3">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 px-3 text-sm font-medium"
              >
                <span>{action.text}</span>
                <span className="text-border text-xs">
                  {formatTimeAgo(action.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Backdrop - outside the absolute container, like in ThemeToggle */}
      {isStoryOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsStoryOpen(false)}
        />
      )}
    </>
  );
};

export default StoryButton;
