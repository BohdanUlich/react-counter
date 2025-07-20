import { useState, useCallback } from "react";
import StoryButton from "./StoryButton";
import {
  ActionItem,
  CounterState,
  AnimationState,
  STORAGE_KEYS,
  COUNTER_DEFAULTS,
  COUNTER_MIN_VALUE,
  COUNTER_MAX_VALUE,
} from "../types";
import ResetButton from "./ResetButton";
import { CounterInput } from "./CounterInput";
import { CounterControls } from "./CounterControls";

export const Counter = () => {
  // Load state from localStorage on first render
  const [state, setState] = useState<CounterState>(() => {
    const savedState = localStorage.getItem(STORAGE_KEYS.COUNTER_STATE);

    if (savedState) {
      try {
        const parsed: CounterState = JSON.parse(savedState);
        // Simple validation and return parsed data

        return {
          count: parsed.count || COUNTER_DEFAULTS.COUNT,
          step: parsed.step || COUNTER_DEFAULTS.STEP,
          actions: Array.isArray(parsed.actions) ? parsed.actions : [],
        };
      } catch (error) {
        console.error("Failed to load counter state:", error);
      }
    }

    // Default state if no saved data or parsing failed
    return {
      count: COUNTER_DEFAULTS.COUNT,
      step: COUNTER_DEFAULTS.STEP,
      actions: [],
    };
  });

  const [animation, setAnimation] = useState<AnimationState>({
    isAnimating: false,
    animationType: null,
  });

  const getCounterAnimationClass = () => {
    if (!animation.isAnimating) return "";

    switch (animation.animationType) {
      case "increment":
        return "animate-pulse scale-110 transition-transform duration-300";
      case "decrement":
        return "animate-pulse scale-90 transition-transform duration-300";
      case "reset":
        return "animate-spin transition-transform duration-300";
      default:
        return "";
    }
  };

  const triggerAnimation = useCallback(
    (type: "increment" | "decrement" | "reset") => {
      setAnimation({ isAnimating: true, animationType: type });
      setTimeout(() => {
        setAnimation({ isAnimating: false, animationType: null });
      }, COUNTER_DEFAULTS.ANIMATION_DURATION);
    },
    []
  );

  const addAction = useCallback(
    ({
      actionText,
      prevActions,
    }: {
      actionText: string;
      prevActions: ActionItem[];
    }) => {
      const actionItem: ActionItem = {
        text: actionText,
        timestamp: Date.now(),
      };

      return [actionItem, ...prevActions].slice(
        0,
        COUNTER_DEFAULTS.MAX_ACTIONS
      );
    },
    []
  );

  const onIncrement = useCallback(() => {
    setState((prev) => {
      const stepValue = prev.step ?? COUNTER_DEFAULTS.STEP;
      const newCount = prev.count + stepValue;
      const shouldIncrement = newCount <= COUNTER_MAX_VALUE;

      if (shouldIncrement) {
        triggerAnimation("increment");
        const newActions = addAction({
          actionText: `Incremented by ${stepValue}`,
          prevActions: prev.actions,
        });

        const newState = { ...prev, count: newCount, actions: newActions };

        localStorage.setItem(
          STORAGE_KEYS.COUNTER_STATE,
          JSON.stringify(newState)
        );

        return newState;
      }
      return prev;
    });
  }, [addAction, triggerAnimation]);

  const onDecrement = useCallback(() => {
    setState((prev) => {
      const stepValue = prev.step ?? COUNTER_DEFAULTS.STEP;
      const newCount = prev.count - stepValue;
      const shouldDecrement = newCount >= COUNTER_MIN_VALUE;

      if (shouldDecrement) {
        triggerAnimation("decrement");
        const newActions = addAction({
          actionText: `Decremented by ${stepValue}`,
          prevActions: prev.actions,
        });

        const newState = { ...prev, count: newCount, actions: newActions };

        localStorage.setItem(
          STORAGE_KEYS.COUNTER_STATE,
          JSON.stringify(newState)
        );

        return newState;
      }
      return prev;
    });
  }, [addAction, triggerAnimation]);

  const onReset = useCallback(() => {
    triggerAnimation("reset");

    setState((prev) => {
      const newActions = addAction({
        actionText: "Reset",
        prevActions: prev.actions,
      });

      const newState = {
        ...prev,
        count: COUNTER_DEFAULTS.COUNT,
        actions: newActions,
      };

      localStorage.setItem(
        STORAGE_KEYS.COUNTER_STATE,
        JSON.stringify(newState)
      );

      return newState;
    });
  }, [addAction, triggerAnimation]);

  const onStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9-]/g, "");
    const value =
      inputValue === ""
        ? undefined
        : Number(inputValue) || COUNTER_DEFAULTS.STEP;
    setState((prev) => ({
      ...prev,
      step: value,
    }));
  };

  const canIncrement =
    state.count + (state.step ?? COUNTER_DEFAULTS.STEP) <= COUNTER_MAX_VALUE;
  const canDecrement =
    state.count - (state.step ?? COUNTER_DEFAULTS.STEP) >= COUNTER_MIN_VALUE;

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen p-6 bg-background">
      <StoryButton actions={state.actions} />

      <div className="w-full max-w-lg">
        {/* Counter Display */}
        <div className="relative text-center">
          <div
            className={`text-[160px] md:text-[200px] font-medium text-primary ${getCounterAnimationClass()}`}
          >
            {state.count}
          </div>

          <CounterControls
            iconSize={10}
            buttonSize="iconLarge"
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            canIncrement={canIncrement}
            canDecrement={canDecrement}
            isMobile={false}
          />
        </div>

        <CounterInput currentCount={state.step} onSetCount={onStepChange} />
      </div>

      <div className="relative w-full">
        <ResetButton onReset={onReset} />

        <CounterControls
          iconSize={10}
          buttonSize="iconMedium"
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          canIncrement={canIncrement}
          canDecrement={canDecrement}
          isMobile={true}
        />
      </div>
    </div>
  );
};
