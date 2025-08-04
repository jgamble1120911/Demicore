export const getDemiResponse = async (input: string) => {
  const res = await fetch("https://cloud.yellow.ai/api/engagements/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "x1753926902376"
    },
    body: JSON.stringify({
      bot: {
        id: "demicore-demi-bot"
      },
      message: {
        text: input
      },
      user: {
        id: "jayden",
        name: "Jayden"
      }
    })
  });

  const data = await res.json();
  return data.message?.text || "Hmm... I'm not sure how to respond!";
};