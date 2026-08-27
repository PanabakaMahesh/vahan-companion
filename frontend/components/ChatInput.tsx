"use client";

import { FormEvent, useState } from "react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

const suggestions = [
  "I bought a used bike",
  "I bought a used car",
  "I want to transfer a vehicle",
  "I want to check my transfer status",
];

export default function ChatInput({
  onSubmit,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSubmit(trimmedMessage);
  }

  function selectSuggestion(suggestion: string) {
    setMessage(suggestion);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="vehicle-situation"
          className="block text-sm font-bold text-[#101828]"
        >
          What happened?
        </label>

        <p className="mt-1 text-xs leading-5 text-[#667085]">
          You don't need to know the official service name. Just tell us what
          you are trying to do.
        </p>
      </div>

      {/* Suggested situations */}
      <div>
        <p className="mb-3 text-xs font-bold text-[#475467]">
          Not sure what to type? Try one of these:
        </p>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={disabled}
              onClick={() => selectSuggestion(suggestion)}
              className="rounded-full border border-[#D0D5DD] bg-white px-4 py-2 text-xs font-semibold text-[#344054] transition hover:border-[#155EEF] hover:bg-[#F5F8FF] hover:text-[#155EEF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <textarea
        id="vehicle-situation"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        disabled={disabled}
        rows={5}
        className="w-full resize-none rounded-2xl border border-[#D0D5DD] bg-white p-4 text-sm leading-6 text-[#101828] shadow-sm transition placeholder:text-[#98A2B3] focus:border-[#155EEF] focus:outline-none focus:ring-4 focus:ring-[#155EEF]/10 disabled:bg-[#F2F4F7]"
        placeholder="For example: I bought a second-hand bike and want to transfer it to my name."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-[#667085]">
          Your message is used only to understand your request in this demo.
        </p>

        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="primary-button sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
        >
          Understand my journey
          <span>→</span>
        </button>
      </div>
    </form>
  );
}