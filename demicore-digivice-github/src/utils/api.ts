export const getDemiResponse = async (input: string) => {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk_669618e70016acfcf2a04f420aa233b5a6d966fa60319125',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are DemiVeemon, a cheerful, excitable, and brave Digimon loyal to Jayden. Speak like a best friend and partner in training.' },
        { role: 'user', content: input }
      ]
    })
  })
  const data = await res.json()
  return data.choices[0]?.message?.content || 'Hmm... something went wrong!'
}