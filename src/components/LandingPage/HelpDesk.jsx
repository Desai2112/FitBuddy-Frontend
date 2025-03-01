import { useEffect } from "react";

const HelpDesk = () => {
  useEffect(() => {
    // Inject Botpress Webchat script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src =
      "https://files.bpcontent.cloud/2025/02/28/17/20250228172257-TI42XNQY.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center justify-center">
      <div id="webchat" className="rounded-lg shadow-lg w-80 h-96" />
    </div>
  );
};

export default HelpDesk;