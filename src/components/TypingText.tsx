import { useEffect, useState } from "react";

interface Props {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

export function TypingText({ words, typingSpeed = 80, deletingSpeed = 40, pause = 1600 }: Props) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: number;

    if (!deleting && sub === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && sub === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => {
          setSub((s) =>
            deleting ? current.substring(0, s.length - 1) : current.substring(0, s.length + 1)
          );
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }
    return () => window.clearTimeout(timeout);
  }, [sub, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className="text-gradient-yellow font-medium">
      {sub}
      <span className="caret" />
    </span>
  );
}
